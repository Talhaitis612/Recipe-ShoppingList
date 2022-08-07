import {Recipe} from "./recipe.model";
import {EventEmitter, Injectable, Output} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";
@Injectable()
export class RecipeService{
  recipeChanged = new Subject<Recipe[]>();
    private recipes : Recipe [] = [];

  // private recipes : Recipe [] =[
  //   new Recipe('Tasty Schnitzel',
  //     'This is simply a test ',
  //     'https://img.freepik.com/free-photo/tasty-schnitzel-with-boiled-potato-top-view-flat-lay-food_124865-24.jpg?w=2000',
  //     [
  //       new Ingredient(
  //         'Meat',
  //         1
  //       ),
  //       new Ingredient(
  //         'French Fries',
  //         20
  //       )
  //     ]
  //   ),
  //   new Recipe('THE BEST CHAPLI KABAB',
  //     'A Chapli Kabab recipe that’s simple.',
  //     'https://www.teaforturmeric.com/wp-content/uploads/2022/04/Chapli-Kabab-Recipe-720x405.jpg',
  //     [
  //       new Ingredient(
  //         'Dried Pomegranate seeds',
  //         10
  //       ),
  //       new Ingredient(
  //         'Ground Beef',
  //         20
  //       )
  //     ]
  //   ),
  // ];

  constructor(private shoppingListService : ShoppingListService) {
  }

  setRecipess(recipes: Recipe[]){
   this.recipes = recipes;
   this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients : Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);

  }

  getRecipe(id: number){
    return this.recipes.slice()[id];
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number){
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }


}
