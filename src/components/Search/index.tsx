"use client";

import { useState } from "react";
import { Recipe, RecipeResponse } from "@/utils/types";
import "./search.scss";
import Image from "next/image";
const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const API_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;

  const fetchRecipes = async () => {
    if (!searchTerm.trim()) {
      setRecipes([]);
      return;
    }

    try {
      const response = await fetch(API_URL);
      const data: RecipeResponse = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchRecipes();
    }
  };

  return (
    <div className="search">
      <div className="search__controls">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={handleKeyPress}
          placeholder="Search recipes..."
          className="search__input"
        />
        <button onClick={fetchRecipes} className="search__button">
          Search
        </button>
      </div>
      {recipes.length > 0 && (
        <div className="recipesGrid">
          {recipes.map((recipe) => (
            <div key={recipe.idMeal} className="recipesGrid__Card">
              <h3 className="recipesGrid__Title">{recipe.strMeal}</h3>
              <Image
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="recipesGrid__Image"
                width={300}
                height={300}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
