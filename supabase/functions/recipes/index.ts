
import { serve } from "https://deno.fresh.run/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const SPOONACULAR_BASE_URL = "https://api.spoonacular.com";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SPOONACULAR_API_KEY = Deno.env.get('SPOONACULAR_API_KEY');
    if (!SPOONACULAR_API_KEY) {
      throw new Error('Spoonacular API key not found');
    }

    const { type, params } = await req.json();
    let endpoint = '';
    let queryParams = '';

    switch (type) {
      case 'byPreferences':
        endpoint = '/recipes/complexSearch';
        const { minProtein, maxTime, maxCost, maxCalories } = params;
        queryParams = `?minProtein=${minProtein}&maxReadyTime=${maxTime}&maxPrice=${maxCost}&maxCalories=${maxCalories}&number=10`;
        break;
      
      case 'details':
        const { recipeId } = params;
        endpoint = `/recipes/${recipeId}/information`;
        queryParams = '?';
        break;

      default:
        throw new Error('Invalid request type');
    }

    const response = await fetch(
      `${SPOONACULAR_BASE_URL}${endpoint}${queryParams}&apiKey=${SPOONACULAR_API_KEY}`,
      { headers: { 'Content-Type': 'application/json' } }
    );

    if (!response.ok) {
      throw new Error(`Spoonacular API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
