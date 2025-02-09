
import { serve } from "https://deno.fresh.run/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const SPOONACULAR_BASE_URL = "https://api.spoonacular.com";

serve(async (req) => {
  // Handle CORS preflight requests
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
      case 'byPreferences': {
        endpoint = '/recipes/complexSearch';
        const { ingredients, minProtein, maxTime, maxCost, maxCalories } = params;
        
        // Build query parameters
        const queryParts = [
          `apiKey=${SPOONACULAR_API_KEY}`,
          `includeIngredients=${ingredients.join(',')}`,
          `minProtein=${minProtein}`,
          `maxReadyTime=${maxTime}`,
          `maxPrice=${maxCost}`,
          `maxCalories=${maxCalories}`,
          'number=10',
          'addRecipeInformation=true',
          'fillIngredients=true'
        ];
        
        queryParams = '?' + queryParts.join('&');
        break;
      }
      
      case 'details': {
        const { recipeId } = params;
        endpoint = `/recipes/${recipeId}/information`;
        queryParams = `?apiKey=${SPOONACULAR_API_KEY}`;
        break;
      }

      default:
        throw new Error('Invalid request type');
    }

    console.log(`Fetching from: ${SPOONACULAR_BASE_URL}${endpoint}${queryParams}`);

    const response = await fetch(
      `${SPOONACULAR_BASE_URL}${endpoint}${queryParams}`,
      { 
        headers: { 
          'Content-Type': 'application/json'
        } 
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Spoonacular API error:', errorText);
      throw new Error(`Spoonacular API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in recipes function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
