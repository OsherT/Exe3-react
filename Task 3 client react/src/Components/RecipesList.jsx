import React from 'react' 
import Recipe from './Recipe';

export default function RecipesList(props) {
  
let recipeList = props.Allrecipes.map((recipe) => {
  return (
    <Recipe
      id={recipe.id}
      key={recipe.id}
      image={recipe.image}
      name={recipe.name}
      cookingMethod={recipe.cookingMethod}
      time={recipe.time + ` minutes`  }
    />
  );
});

  return (
      <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-evenly"}}>{recipeList}</div>
        );
}
