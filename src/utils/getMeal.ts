import { Recipe } from "./types";

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

export default getMeal;
