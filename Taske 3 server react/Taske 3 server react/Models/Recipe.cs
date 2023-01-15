using System.Net;
using Taske_3_server_react.Models.DAL;

namespace Taske_3_server_react.Models
{
    public class Recipe
    {
        DBservices dbs = new DBservices();

        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string CookingMethod { get; set; }
        public int Time { get; set; }

        public List<Recipe> Read()
        {
            return dbs.ReadRecipes();
        }

        public int Insert()
        {
            int id = dbs.InsertRecipe(this);
            if (id != null)
            {
                return id;
            }
            return -1;
        }

        public int InsertIngredientToRecipe(int recipeId, int ingredientId)
        {
            return dbs.InsertIngredients2Recipe(recipeId, ingredientId);

        }
      
    }
}
