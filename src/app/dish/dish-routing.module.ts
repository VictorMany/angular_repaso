import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDishComponent } from './list-dish/list-dish.component';
import { NewDishComponent } from './new-dish/new-dish.component';

const routes: Routes = [
  { path: 'list', component: ListDishComponent },
  { path: 'new', component: NewDishComponent },
  { path: '**', redirectTo: 'list' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DishRoutingModule { }
