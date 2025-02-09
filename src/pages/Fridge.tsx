
import BottomNav from "@/components/BottomNav";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import SearchForm from "@/components/fridge/SearchForm";
import PreferencesForm from "@/components/fridge/PreferencesForm";
import RecipeList from "@/components/fridge/RecipeList";
import RecipeDetails from "@/components/fridge/RecipeDetails";
import { useRecipes } from "@/hooks/useRecipes";
import { useIngredients } from "@/hooks/useIngredients";
import { usePreferences } from "@/hooks/usePreferences";

const Fridge = () => {
  const { recipes, loading, selectedRecipe, searchRecipes, fetchRecipeDetails, setSelectedRecipe, sortBy, setSortBy } = useRecipes();
  const { ingredients, addIngredient, removeIngredient } = useIngredients();
  const { preferences, setPreferences } = usePreferences();

  const handleSearch = async () => {
    await searchRecipes(ingredients, preferences);
  };

  return (
    <div className="min-h-screen bg-beige pb-20">
      <header className="sticky top-0 bg-beige/80 backdrop-blur-sm p-4 z-40 flex items-center justify-between border-b border-olive/10">
        <h1 className="text-2xl font-bold text-olive italic">MindfulPlate</h1>
        <Link to="/profile" className="p-2 hover:bg-beige-light rounded-full transition-colors">
          <User className="w-6 h-6 text-olive" />
        </Link>
      </header>

      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {!selectedRecipe ? (
          <>
            <SearchForm
              ingredients={ingredients}
              onAddIngredient={addIngredient}
              onRemoveIngredient={removeIngredient}
            />

            <PreferencesForm
              preferences={preferences}
              onPreferencesChange={setPreferences}
              onSearch={handleSearch}
              loading={loading}
            />

            {recipes.length > 0 ? (
              <RecipeList
                recipes={recipes}
                onSelectRecipe={fetchRecipeDetails}
                sortBy={sortBy}
                onSort={setSortBy}
              />
            ) : (
              <div className="text-center text-olive-light p-4">
                {loading ? 'Searching for recipes...' : 'No recipes found. Try adding ingredients and search!'}
              </div>
            )}
          </>
        ) : (
          <RecipeDetails
            recipe={selectedRecipe}
            onBack={() => setSelectedRecipe(null)}
          />
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Fridge;
