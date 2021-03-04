import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ListComponent, NewComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
