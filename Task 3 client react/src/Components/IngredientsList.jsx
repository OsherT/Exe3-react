import React from "react";
import Carousel from "better-react-carousel";
import Ingredient from "./Ingredient";

export default function IngredientsList(props) {

  const GetId2Add = (id) => {
    props.onAdd(id);
  };
  
  const GetId2Remove = (id) => {
    props.OnRemove(id);
  };

  return (
    <div style={{ maxWidth: "600px" }}>

      <Carousel cols={3} rows={1} gap={0} showDots={true} loop={true}>

        {props.Allingredients?.map((ingredient) => (
          <Carousel.Item img width="100%" src={ingredient.image}>
            <Ingredient
              id={ingredient.id}
              key={ingredient.id}
              name={ingredient.name}
              image={ingredient.image}
              calories={ingredient.calories}
              button={props.button}
              SendID2Add={GetId2Add}
              sendID2Remove={GetId2Remove}
            />
            
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
