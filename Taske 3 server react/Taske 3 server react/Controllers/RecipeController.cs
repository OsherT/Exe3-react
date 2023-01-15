using Microsoft.AspNetCore.Mvc;
using Taske_3_server_react.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Taske_3_server_react.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        Recipe rec = new Recipe();

        // GET: api/<ValuesController>
        [HttpGet]
        public IActionResult Get()
        {

            Recipe Rec = new Recipe();
            List<Recipe> RecList = Rec.Read();

            if (RecList.Count > 0)
            {
                return Ok(RecList);
            }
            else
            {
                return NotFound("No recipes in DB");
            }
        }

        //POST api/<ValuesController>
        [HttpPost]
        public int Post([FromBody] Recipe recipe)
        {
            return recipe.Insert();
        }

        //POST api/<ValuesController>
        [HttpPost("{recipeId}/{ingredientId}")]
        public int PostRecipeIngredients( int recipeId,  int ingredientId)
        {
            //int res = rec.InsertIngredientToRecipe(recipeId, ingredientId);
            //if (res >= 1)
            //{
            //    return Ok();
            //}
            //else
            //{
            //    return NotFound();
            //}
            return rec.InsertIngredientToRecipe(recipeId, ingredientId);
        }


















        
    }
}
