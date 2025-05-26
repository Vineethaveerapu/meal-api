"use client";

import { useState, useEffect, useRef } from "react";
import { Recipe, RecipeResponse, Category } from "@/utils/types";
import "./search.scss";
import Image from "next/image";
import Link from "next/link";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showCategories, setShowCategories] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowCategories(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

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

  const handleCategorySelect = async (category: string) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const data = await response.json();
      setRecipes(data.meals || []);
      setSearchTerm(category);
      setShowCategories(false);
    } catch (error) {
      console.error("Error fetching category recipes:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchRecipes();
      setShowCategories(false);
    }
  };

  return (
    <div className="search">
      <div className="search__controls">
        <div className="search__input-container" ref={searchContainerRef}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowCategories(true);
            }}
            onKeyUp={handleKeyPress}
            onFocus={() => setShowCategories(true)}
            placeholder="Search recipes or select a category..."
            className="search__input"
          />
          {showCategories && categories.length > 0 && (
            <div className="search__categories">
              {categories.map((category) => (
                <div
                  key={category.idCategory}
                  className="search__categories-item"
                  onClick={() => handleCategorySelect(category.strCategory)}
                >
                  <Image
                    src={category.strCategoryThumb}
                    alt={category.strCategory}
                    width={30}
                    height={30}
                  />
                  <div>{category.strCategory}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <button onClick={fetchRecipes} className="search__button">
          Search
        </button>
      </div>
      {recipes.length > 0 && (
        <div className="recipesGrid">
          {recipes.map((recipe) => (
            <Link href={`/${recipe.idMeal}`} key={recipe.idMeal}>
              <div className="recipesGrid__Card">
                <h3 className="recipesGrid__Title">{recipe.strMeal}</h3>
                <Image
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="recipesGrid__Image"
                  width={300}
                  height={300}
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
