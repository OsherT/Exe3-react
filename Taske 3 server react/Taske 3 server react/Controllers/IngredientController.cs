using Microsoft.AspNetCore.Mvc;
using Taske_3_server_react.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Taske_3_server_react.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngredientController : ControllerBase
    {
        // GET: api/<IngredientController>
        [HttpGet]
        public IActionResult Get()
        {

            Ingredient ing = new Ingredient();
            List<Ingredient> IngList = ing.Read();

            if (IngList.Count > 0)
            {
                return Ok(IngList);
            }
            else
            {
                return NotFound("No ingredient in DB");
            }
        }

        // GET api/<IngredientController>/5
        //IngreientInRecipe
        [HttpGet("{id}")]
        public IActionResult GetIn(int id)
        {

            Ingredient ing = new Ingredient();
            List<Ingredient> IngList = ing.ReadIngredientsInRecipes(id);

            if (IngList.Count > 0)
            {
                return Ok(IngList);
            }
            else
            {
                return NotFound("No ingredient in DB");
            }
        }

        // POST api/<IngredientController>
        [HttpPost]
        public bool Post( [FromBody] Ingredient ingredient)
        {
            return ingredient.Insert();
        }

















        // PUT api/<IngredientController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<IngredientController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
