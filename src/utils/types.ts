export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface RecipeResponse {
  meals: Recipe[];
}
