import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { IDish } from 'src/app/interfaces/dish/dish.interface';
import { DishService } from 'src/app/services/dish/dish.service';

@Component({
  selector: 'app-listdish',
  templateUrl: './listdish.component.html',
  styleUrls: ['./listdish.component.sass']
})

export class ListdishComponent implements OnInit {

  dish: IDish[];
  DishObs: Subscription;
  isActive: boolean;

  constructor(private dishService: DishService, private router: Router) { }

  ngOnInit(): void {
    this.dish = [];
    this.isActive = true;
    this.DishObs = this.dishService.getDishesFirebase().pipe(takeWhile(() => this.isActive)).subscribe((dish: IDish[]) => {
      this.dish = dish;
      console.log(dish);
    });
  }

  addDish() {
    this.router.navigate(['/dishes/new']);
  }

  onUpdate(res: IDish): void {
    console.log("Este deberia de ser el id de la nota", res._id)
    this.router.navigate(['/new', res._id]);
  }

  async onDelete(res: IDish): Promise<void> {
    console.log("ID DE ELIMINAR --> ", res._id);
    try {
      const newDelete = await this.dishService.deleteDishById(res._id);
      console.log('Noticia eliminada', newDelete);
    } catch (error) {
      console.log('No se pudo eliminar la noticia', error);
    }
  }
}