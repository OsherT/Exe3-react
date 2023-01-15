import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import IngredientsList from "../Components/IngredientsList";

const apiPostIngredient = "https://localhost:7052/api/Ingredient";

export default function Ingredient() {
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientImage, setIngredientImage] = useState("");
  const [ingredientCalories, setIngredientCalories] = useState("");

  const [ingerdaintsList, setIngerdaintsList] = useState([]);
  const apiIngredients = "https://localhost:7052/api/Ingredient";

  useEffect(() => {
    getIngredients();
  }, []);

  const getIngredients = () => {
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
  };

  const PostIngredient = (e) => {
    e.preventDefault();

    const ingredient = {
      name: ingredientName,
      image: ingredientImage,
      calories: ingredientCalories,
    };

    fetch(apiPostIngredient, {
      method: "POST",
      body: JSON.stringify(ingredient),

      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then(
        (res) => {
          toast.success("The ingredient was successfully added 👌 ", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          getIngredients();
        },
        (err) => {
          toast.error("The ingredient was NOT successfully added 😬", {
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
      );
  };

  const clearInputs = (e) => {
    e.preventDefault();

    setIngredientName("");
    setIngredientImage("");
    setIngredientCalories("");
  };

  return (
    <div>
      <h1> Add ingredient 🥄</h1>

      <form
        onSubmit={function (event) {
          PostIngredient(event);
          clearInputs(event);
        }}>
        <div className="card">
          <div className="card-body">
            Name
            <input
              type="text"
              placeholder="Enter ingredient name"
              required
              value={ingredientName}
              onChange={(e) => setIngredientName(e.target.value)}
            />
            <br />
            Image
            <input
              type="text"
              placeholder="Enter ingredient image"
              required
              value={ingredientImage}
              onChange={(e) => setIngredientImage(e.target.value)}
            />
            <br />
            Calories
            <input
              type="number"
              min={1}
              placeholder="Enter ingredient calories"
              required
              value={ingredientCalories}
              onChange={(e) => setIngredientCalories(e.target.value)}
            />
            <br />
            <button className="button" type="submit">
              Add ingredient
            </button>
          </div>
        </div>
      </form>
      <br />
      <h3>The ingredients we have</h3>
      <IngredientsList
        Allingredients={ingerdaintsList}
        button={false}></IngredientsList>
    </div>
  );
}
