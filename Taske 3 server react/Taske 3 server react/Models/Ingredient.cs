using Taske_3_server_react.Models.DAL;

namespace Taske_3_server_react.Models
{
    public class Ingredient
    {
        DBservices dbs = new DBservices();

        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public int Calories { get; set; }

        public List<Ingredient> Read()
        {
            return dbs.ReadIngredients();
        }

        public List<Ingredient> ReadIngredientsInRecipes(int id)
        {
            return dbs.ReadIngredientsInRecipes(id);
        }

        public bool Insert()
        {
            if (dbs.InsertIngredient(this) == 1)
            {
                return true;
            }
            return false;
        }

    }
}
