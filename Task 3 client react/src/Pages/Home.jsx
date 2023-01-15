import React, { useEffect, useState } from "react";
import RecipeList from "../Components/RecipesList";

const apiRecipes = "https://localhost:7052/api/Recipe";

export default function Home() {
  const [recipeList, setRecipeList] = useState([]);

  useEffect(() => {

    fetch(apiRecipes, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (recipes) => {
          setRecipeList(recipes);
        },
        (error) => {
          console.log("ERR in get recipe=", error);
        }
      );
  }, []);

let emptyTitel="";
 if (recipeList.length === 0) {
   emptyTitel = `Sorry, our resturant is close now 😊`;
 }

  return (
    <div>
      <h1>🍴 Osher & Tal resturant 🍴</h1>
      <p>{emptyTitel}</p>
      
      <RecipeList Allrecipes={recipeList}></RecipeList>
    </div>
  );
}
