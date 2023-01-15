import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import IngredientsList from "./IngredientsList";
import Modal from "./Modal";

export default function Recipe(recipe) {
  const [isOpen, setIsOpen] = useState(false);
  const [ingredientsList, setIngredientsList] = useState([]);

  const showIngredients = () => {
    const apiIngredientsInRecipes = `https://localhost:7052/api/Ingredient/${recipe.id}`;

    fetch(apiIngredientsInRecipes, {
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
        (ingredients) => {
          setIngredientsList(ingredients);
        },
        (error) => {
          console.log("err post=", error);
        }
      );

    //open the model after you get all the ingredients
    setIsOpen(true);
  };

  return (
    <div style={{ float: "left" }}>
      <Card style={{ margin: "50px", width: "18rem" }}>
        <Card.Img
          variant="top"
          style={{ width: "17.5rem" }}
          src={recipe.image}
        />
        <Card.Body>
          <Card.Title>{recipe.name}</Card.Title>
          <Card.Text style={{ height: "4rem" }}>
            <div style={{ height: "5rem" }}>
              
              <b>Cooking method : </b>
              {recipe.cookingMethod}
            </div>

            <div style={{ height: "4rem" }}>
              <b>Time : </b> {recipe.time}
            </div>
          </Card.Text>

          <br></br> <br></br>

          <Button
            className="button"
            variant="primary"
            onClick={showIngredients}>
            Show Ingredients
          </Button>
        </Card.Body>
      </Card>

      <Modal open={isOpen}>
        <div>
          <IngredientsList Allingredients={ingredientsList} button={false} />
          <br></br>
        </div>

        <div>
          <button className="button" onClick={() => setIsOpen(false)}>
            ❌
          </button>
        </div>
      </Modal>
    </div>
  );
}
