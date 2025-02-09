
import { serve } from "https://deno.fresh.run/std@0.168.0/http/server.ts";

const SPOONACULAR_BASE_URL = "https://api.spoonacular.com";
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Content-Type': 'application/json'
};

serve(async (req) => {
  console.log('Recipe function called with method:', req.method);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight request');
    return new Response(null, { 
      headers: corsHeaders 
    });
  }

  try {
    const SPOONACULAR_API_KEY = Deno.env.get('SPOONACULAR_API_KEY');
    if (!SPOONACULAR_API_KEY) {
      console.error('Spoonacular API key not found');
      throw new Error('Spoonacular API key not found');
    }

    const { type, params } = await req.json();
    console.log('Request body:', JSON.stringify({ type, params }));

    if (!type || !params) {
      console.error('Invalid request format - missing type or params');
      throw new Error('Invalid request format');
    }

    let endpoint = '';
    let queryParams = '';

    switch (type) {
      case 'byPreferences': {
        endpoint = '/recipes/complexSearch';
        const { ingredients, minProtein, maxCalories, diet, excludeIngredients } = params;
        
        if (!ingredients || !Array.isArray(ingredients)) {
          console.error('Invalid ingredients format:', ingredients);
          throw new Error('Invalid ingredients format');
        }
        
        // Build query parameters for complexSearch
        const queryParts = [
          `apiKey=${SPOONACULAR_API_KEY}`,
          `includeIngredients=${ingredients.join(',')}`,
          `minProtein=${minProtein || 0}`,
          `maxCalories=${maxCalories || 2000}`,
          diet ? `diet=${diet}` : '',
          excludeIngredients?.length ? `excludeIngredients=${excludeIngredients.join(',')}` : '',
          'number=10',
          'addRecipeNutrition=true',
          'fillIngredients=true',
          'addRecipeInformation=true'
        ].filter(Boolean); // Remove empty strings
        
        queryParams = '?' + queryParts.join('&');
        console.log('Built query URL:', `${SPOONACULAR_BASE_URL}${endpoint}${queryParams}`);
        break;
      }
      
      case 'details': {
        const { recipeId } = params;
        if (!recipeId) {
          console.error('Missing recipeId for details request');
          throw new Error('Missing recipe ID');
        }
        endpoint = `/recipes/${recipeId}/information`;
        queryParams = `?apiKey=${SPOONACULAR_API_KEY}&addRecipeNutrition=true`;
        console.log('Built details URL:', `${SPOONACULAR_BASE_URL}${endpoint}${queryParams}`);
        break;
      }

      default:
        console.error('Invalid request type:', type);
        throw new Error('Invalid request type');
    }

    console.log(`Making request to Spoonacular API: ${SPOONACULAR_BASE_URL}${endpoint}`);

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
    console.log('Successfully received response from Spoonacular');
    
    return new Response(JSON.stringify(data), {
      headers: corsHeaders
    });

  } catch (error) {
    console.error('Error in recipes function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack 
      }), {
        status: 500,
        headers: corsHeaders
      }
    );
  }
});
