import {Component, OnDestroy, OnInit, ViewChild,} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm! : NgForm;
  subscription! : Subscription;
  editMode = false;
  editedItemIndex! : number;
  editedItem! : Ingredient;
  constructor(private shoppingListService : ShoppingListService) {
  }



  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe({
      next : (index:number)=>{
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name : this.editedItem.name,
          amount : this.editedItem.amount
        })
      }
    })
  }

  onSubmit(form : NgForm) {
    const value = form.value
    const newIngredient: Ingredient = {name : value.name, amount: value.amount};
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex,newIngredient);
      this.slForm.reset();
    }
    else {
      this.shoppingListService.addIngredient(newIngredient);
      this.slForm.reset();

    }
    this.editMode = false;
  }
  onDeleteItem() {
   this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.editMode = false;
    this.slForm.reset();
  }
  onReset(){
    this.editMode = false;
    this.slForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
