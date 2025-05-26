import { Recipe } from "@/utils/types";
import RecipeDetail from "@/components/RecipeDetail";

async function getMeal(id: string): Promise<Recipe | null> {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      { next: { revalidate: 3600 } }
    );
    const data = await response.json();
    return data.meals?.[0] || null;
  } catch (error) {
    console.error("Error fetching meal:", error);
    return null;
  }
}

export default async function MealPage({ params }: { params: { id: string } }) {
  const meal = await getMeal(params.id);

  if (!meal) {
    return (
      <div className="error-container">
        <h1>Meal not found</h1>
        <p>
          The meal you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
      </div>
    );
  }

  return <RecipeDetail recipe={meal} />;
}
