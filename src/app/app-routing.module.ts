import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  { path: 'users', loadChildren: () => import('./user/user.module').then((m) => m.UserModule) },
  { path: 'dishes', loadChildren: () => import('./dish/dish.module').then((m) => m.DishModule) },
  { path: '**', redirectTo: 'auth' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
