import Image from "next/image";
import Link from "next/link";
import { Recipe, Ingredient } from "@/utils/types";
import "./recipeDetail.scss";

interface RecipeDetailProps {
  recipe: Recipe;
}

const RecipeDetail = ({ recipe }: RecipeDetailProps) => {
  const ingredients: Ingredient[] = Object.keys(recipe)
    .filter((key) => key.startsWith("strIngredient") && recipe[key])
    .map((key) => {
      const index = key.replace("strIngredient", "");
      return {
        ingredient: recipe[key],
        measurement: recipe[`strMeasure${index}`]
      };
    });

  return (
    <div className="recipeDetail">
      <Link href="/" className="recipeDetail__back">
        ← Back to Home
      </Link>
      <h1 className="recipeDetail__title">{recipe.strMeal}</h1>
      <div className="recipeDetail__content">
        <div>
          <Image
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            width={500}
            height={500}
            className="recipeDetail__image"
          />
        </div>
        <div className="recipeDetail__info">
          <div className="recipeDetail__place">
            <p>
              <strong>Category:</strong> {recipe.strCategory}
            </p>
            <p>
              <strong>Area:</strong> {recipe.strArea}
            </p>
          </div>
          <div className="recipeDetail__ingredients">
            <h2>Ingredients</h2>

            {ingredients.map((item, index) => (
              <div key={index}>
                {item.ingredient} - {item.measurement}
              </div>
            ))}
          </div>
          <div className="recipeDetail__instructions">
            <h2>Instructions</h2>
            <p>{recipe.strInstructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
