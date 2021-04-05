import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DishRoutingModule } from './dish-routing.module';
import { ListdishComponent } from './listdish/listdish.component';
import { NewdishComponent } from './newdish/newdish.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListdishComponent, NewdishComponent],
  imports: [
    CommonModule,
    DishRoutingModule,
    ReactiveFormsModule
  ]
})
export class DishModule { }
