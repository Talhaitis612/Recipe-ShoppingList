import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://recipe-shoppinglist-8dcb1-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe({
        next: (res: any) => {
          console.log('Data Has been stored successfully!', res);
        },
        error: (err: any) => {
          console.log('An error occured', err);
        },
      });
  }
  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://recipe-shoppinglist-8dcb1-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap(recipes=>{
          this.recipeService.setRecipess(recipes);
        })
      );
  }
}
