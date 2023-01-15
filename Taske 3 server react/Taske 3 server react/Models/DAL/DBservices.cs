using System.Data.SqlClient;
using System.Data;
using System;

namespace Taske_3_server_react.Models.DAL
{
    public class DBservices
    {
        public SqlDataAdapter da;
        public DataTable dt;



        //--------------------------------------------------------------------------------------------------
        // This method creates a connection to the database according to the connectionString name in the web.config 
        //--------------------------------------------------------------------------------------------------
        public SqlConnection connect(String conString)
        {
            // read the connection string from the configuration file
            IConfigurationRoot configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json").Build();
            string cStr = configuration.GetConnectionString("myProjDB");
            SqlConnection con = new SqlConnection(cStr);
            con.Open();
            return con;
        }

        //---------------------------------------------------------------------------------
        // Create the Read SqlCommand
        //---------------------------------------------------------------------------------
        private SqlCommand CreateReadCommandSP(string spName, SqlConnection con)
        {
            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

            return cmd;
        }





        //*******Ingredients section*******

        //---------------------------------------------------------------------------------
        // This method read all the ingredients from the table
        //--------------------------------------------------------------------------------- 
        public List<Ingredient> ReadIngredients()
        {
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateReadCommandSP("spReadIngredients", con);             // create the command


            List<Ingredient> list = new List<Ingredient>();

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (dataReader.Read())
                {
                    Ingredient ingredient = new Ingredient();

                    ingredient.Id = Convert.ToInt32(dataReader["Id"]);
                    ingredient.Name = dataReader["name"].ToString();
                    ingredient.Image = dataReader["image"].ToString();
                    ingredient.Calories = Convert.ToInt32(dataReader["calories"]);

                    list.Add(ingredient);
                }

                return list;
            }

            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }

        //---------------------------------------------------------------------------------
        // This method insert ingredient 
        //--------------------------------------------------------------------------------- 
        public int InsertIngredient(Ingredient ingredient)
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }


            cmd = CreateInsertIngredientCommandSP("spInsertIngredients", con, ingredient);             // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        //---------------------------------------------------------------------------------
        // Create the Insert ingredient SqlCommand
        //---------------------------------------------------------------------------------
        private SqlCommand CreateInsertIngredientCommandSP(String spName, SqlConnection con, Ingredient ingredient)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

            cmd.Parameters.AddWithValue("@name", ingredient.Name);
            cmd.Parameters.AddWithValue("@image", ingredient.Image);
            cmd.Parameters.AddWithValue("@calories", ingredient.Calories);

            return cmd;
        }






        //*******Recipe section*******

        //---------------------------------------------------------------------------------
        // This method read all the recipes from the table
        //--------------------------------------------------------------------------------- 
        public List<Recipe> ReadRecipes()
        {
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateReadCommandSP("spReadRecipes", con);             // create the command


            List<Recipe> list = new List<Recipe>();

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (dataReader.Read())
                {
                    Recipe recipe = new Recipe();

                    recipe.Id = Convert.ToInt32(dataReader["Id"]);
                    recipe.Name = dataReader["name"].ToString();
                    recipe.Image = dataReader["image"].ToString();
                    recipe.CookingMethod = (dataReader["cookingMethod"]).ToString();
                    recipe.Time = Convert.ToInt32(dataReader["time"]);

                    list.Add(recipe);
                }

                return list;
            }

            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }

        //---------------------------------------------------------------------------------
        // This method insert recipe 
           public int InsertRecipe(Recipe recipe)
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }


            cmd = CreateInsertRecipeCommandSP("spInsertRecipes", con, recipe);// create the command

            try
            {
                //int id = (int)cmd.ExecuteScalar();
                int id = Convert.ToInt32(cmd.ExecuteScalar());
                return id;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        //---------------------------------------------------------------------------------
        // Create the Insert Recipe SqlCommand
        //---------------------------------------------------------------------------------
        private SqlCommand CreateInsertRecipeCommandSP(String spName, SqlConnection con, Recipe recipe)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

            cmd.Parameters.AddWithValue("@name", recipe.Name);
            cmd.Parameters.AddWithValue("@image", recipe.Image);
            cmd.Parameters.AddWithValue("@cookingMethod", recipe.CookingMethod);
            cmd.Parameters.AddWithValue("@time", recipe.Time);

            return cmd;
        }






        //*******IngredientsInRecipes section*******

        //---------------------------------------------------------------------------------
        // This method read all the Ingredients in recipes from the table
        //--------------------------------------------------------------------------------- 
        public List<Ingredient> ReadIngredientsInRecipes(int id)
        {
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateReadIngredientsInRecipesCommandSP("spReadIngredientsInRecipes", con, id);             // create the command


            List<Ingredient> list = new List<Ingredient>();

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (dataReader.Read())
                {
                    Ingredient ingredient = new Ingredient();

                    ingredient.Id = Convert.ToInt32(dataReader["Id"]);
                    ingredient.Name = dataReader["name"].ToString();
                    ingredient.Image = dataReader["image"].ToString();
                    ingredient.Calories = Convert.ToInt32(dataReader["calories"]);

                    list.Add(ingredient);
                }

                return list;
            }

            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }

        //---------------------------------------------------------------------------------
        // Create the ReadIngredientsInRecipes SqlCommand
        //---------------------------------------------------------------------------------
        private SqlCommand CreateReadIngredientsInRecipesCommandSP(string spName, SqlConnection con, int id)
        {
            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

            cmd.Parameters.AddWithValue("@recipeId", id);


            return cmd;
        }




        //---------------------------------------------------------------------------------
        // This method insert ingredients to recipe recipe 
        //--------------------------------------------------------------------------------- 
        public int InsertIngredients2Recipe(int recipeId, int ingredientId)
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }


            cmd = CreateInsertIngredients2RecipeCommandSP("spInsertIngredientsInRecipes", con, recipeId, ingredientId);             // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        //---------------------------------------------------------------------------------
        // Create the insertIngredientsToRecipe  SqlCommand
        //---------------------------------------------------------------------------------
        private SqlCommand CreateInsertIngredients2RecipeCommandSP(String spName, SqlConnection con, int recipeId, int ingredientId)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be stored procedure

            cmd.Parameters.AddWithValue("@recipeId", recipeId);
            cmd.Parameters.AddWithValue("@ingredientId", ingredientId);

            return cmd;
        }








    }
}
