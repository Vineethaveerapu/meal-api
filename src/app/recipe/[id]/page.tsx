import RecipeDetail from "@/components/RecipeDetail";
import getMeal from "@/utils/getMeal";
import { PageProps } from "@/utils/types";

export default async function RecipePage({ params }: PageProps) {
  const resolvedParams = await params;
  const meal = await getMeal(resolvedParams?.id || "");

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
