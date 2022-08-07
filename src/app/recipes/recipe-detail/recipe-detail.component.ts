import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {Ingredient} from "../../shared/ingredient.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
   recipe! : Recipe;
   recipeSubscription! : Subscription;
   id! : number;
  constructor(private recipeService : RecipeService,
              private route: ActivatedRoute,
              private router : Router
              ) { }

  ngOnInit(): void {
    this.recipeSubscription = this.route.params.subscribe({
      next : (params : Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    })

    console.log(this.id);
  }
  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo : this.route})
    // this.router.navigate(['../', this.id, 'edit'] ,{relativeTo: this.route})
  }
  onDeleteRecipe(index: number){
    this.recipeService.deleteRecipe(index);
    this.router.navigate(['../'], {relativeTo: this.route, replaceUrl: true});
  }


  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }
}
