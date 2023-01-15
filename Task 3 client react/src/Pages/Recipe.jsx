import React, { useEffect, useState } from "react";
import IngredientsList from "../Components/IngredientsList";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

const apiPostRecipe = "https://localhost:7052/api/Recipe";
const apiIngredients = "https://localhost:7052/api/Ingredient";

export default function Recipe() {
  const [recipeName, setRecipeName] = useState("");
  const [recipeImage, setRecipeImage] = useState("");
  const [recpieCookingMethod, setRecpieCookingMethod] = useState("");
  const [recpieTime, setRecpieTime] = useState("");

  const [ingerdaintsList, setIngerdaintsList] = useState([]);
  let IngredientInRecipeIDS = [];

  const navigate = useNavigate();


  const addIngredient = (id) => {
    IngredientInRecipeIDS.push(id);
  };

  const removeIngredient = (id) => {
    IngredientInRecipeIDS = IngredientInRecipeIDS.filter((item) => item !== id);
  };

  useEffect(() => {

    fetch(apiIngredients, {
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
        (ingerdaints) => {
          setIngerdaintsList(ingerdaints);
        },
        (error) => {
          console.log("ERR in get ingerdaints=", error);
        }
      );
      }, []);

  const PostRecipe = (e) => {
    e.preventDefault();
if (IngredientInRecipeIDS.length==0) {
   toast.error("Please choose ingredients 😬", {
     position: "top-center",
     autoClose: 1000,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
     theme: "light",
   });
}
else {
    const recipe = {
      name: recipeName,
      image: recipeImage,
      cookingMethod: recpieCookingMethod,
      time: recpieTime,
    };

    fetch(apiPostRecipe, {
      method: "POST",
      body: JSON.stringify(recipe),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then(

        //We defined that the value that will be returned in SP is the ID (SCOPE_IDENTITY)
        (recipeId) => {
          PostIngredientsInRecipe(recipeId);

            toast.success("The recipe was successfully added 👌 ", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
              navigate("/");


        },
        (error) => {
          toast.error("The recipe was NOT successfully added 😬", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      );}
  };

  const PostIngredientsInRecipe = (recipeId) => {

    for (let i = 0; i < IngredientInRecipeIDS.length; i++) {
  
      const apiPostIngredientInRecipe = `https://localhost:7052/api/Recipe/${recipeId}/${IngredientInRecipeIDS[i]}`;

      fetch(apiPostIngredientInRecipe, {
        method: "POST",
        body: JSON.stringify(recipeId, IngredientInRecipeIDS[i]),
        headers: new Headers({
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json; charset=UTF-8",
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then(
          (result) => {
            console.log("suc in recipe ing= ", result);
          },
          (error) => {
            console.log("ERR in recipe ing", error);
          }
        );
    }
  };

  const clearInputs = (e) => {
    e.preventDefault();

    setRecipeName("");
    setRecipeImage("");
    setRecpieCookingMethod("");
    setRecpieTime("");

    for (let i = 0; i < IngredientInRecipeIDS.length; i++) {
      var ing = document.getElementById(IngredientInRecipeIDS[i]);
      ing.checked = false;
    }
  };

  return (
    <div>
      <h1> Add recipe 🔪</h1>
      <form
        onSubmit={function (event) {
          PostRecipe(event);
          clearInputs(event);
        }}>
        <div className="card">
          <div className="card-body">
            Name
            <input
              type="text"
              placeholder="Enter recipe name"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              required></input>
            <br />
            Image
            <input
              type="text"
              placeholder="Enter recipe image"
              value={recipeImage}
              onChange={(e) => setRecipeImage(e.target.value)}
              required></input>
            <br />
            Cooking Method
            <input
              type="text"
              placeholder="Enter cooking method"
              value={recpieCookingMethod}
              onChange={(e) => setRecpieCookingMethod(e.target.value)}
              required></input>
            <br />
            Time (minutes)
            <input
              type="number"
              placeHolder="Enter cooking  (min)"
              value={recpieTime}
              onChange={(e) => setRecpieTime(e.target.value)}
              required></input>

            <IngredientsList
              onAdd={addIngredient}
              OnRemove={removeIngredient}
              Allingredients={ingerdaintsList}
              button={true}></IngredientsList>
            <br />
            <button className="button" type="submit">
              Add recipe
            </button>
          </div>{" "}
        </div>
      </form>
      <br /> <br />
    </div>
  );
}
