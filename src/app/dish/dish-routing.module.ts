import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListdishComponent } from './listdish/listdish.component';
import { NewdishComponent } from './newdish/newdish.component';

const routes: Routes = [
  { path: 'dishlist', component: ListdishComponent },
  { path: ':dishId', component: NewdishComponent},
  { path: '**', redirectTo: 'listdish'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DishRoutingModule { }
