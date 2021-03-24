import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DishRoutingModule } from './dish-routing.module';
import { NewDishComponent } from './new-dish/new-dish.component';
import { ListDishComponent } from './list-dish/list-dish.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [NewDishComponent, ListDishComponent],
  imports: [
    CommonModule,
    DishRoutingModule,
    ReactiveFormsModule
  ]
})
export class DishModule { }
