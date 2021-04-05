import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DishService } from 'src/app/services/dish/dish.service';

@Component({
  selector: 'app-newdish',
  templateUrl: './newdish.component.html',
  styleUrls: ['./newdish.component.sass']
})
export class NewdishComponent implements OnInit {
  form: FormGroup;
  isNew: boolean;
  params: Params;

  img = 'https://firebasestorage.googleapis.com/v0/b/salle-app-592bb.appspot.com/o/pngfind.com-marshmello-png-2193391.png?alt=media&token=23b5177a-b6af-40f6-b6cb-9a613c2c518c';
  file: File;

  constructor(
    private dishService: DishService, // Servicio de usuarios
    private router: Router, // Clase para hacer la navegación
    private activatedRoute: ActivatedRoute, // Obtener los parámetros de la url
  ) { }


  ngOnInit(): void {
    this.isNew = true;
    this.file = null;
    
    this.form = new FormGroup({
      // Definición de cada uno de los controles
      // (valor inicial, validaciones síncronas, validaciones asíncronas)
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      
    });

     // Obtener los parámetros de la url
     this.activatedRoute.params.subscribe(
      async (params: Params) => {
        this.params = params;
        this.file = null;
        this.isNew = params._id === 'new' ? true : false;
        await this.iniValuesHttp();
        console.log('Parametros: ', params);
      }, // Next
      (error: any) => {
        console.log('Error parámetros: ', error);
      }, // Error
      () => { } // Complete
    );
  }

  async iniValuesHttp(): Promise<void> {
    try {
      console.log(this.isNew)
      if (!this.isNew) {
        const dish = await this.dishService.getDishById(this.params._id).toPromise();
        if (dish.data()) {
          this.form = new FormGroup({
            nombre: new FormControl(dish.data().nombre, [Validators.required]),
            descripcion: new FormControl(dish.data().descripcion, [Validators.required]),
            precio: new FormControl(dish.data().precio, [Validators.required]),
          });
          this.img = dish.data().profilePicture ? dish.data().profilePicture : this.img;
        }
      } else {
        this.form.reset();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async onAdd(): Promise<void> {
      console.log(this.form.value);
      if (this.form.valid) {
        const firebaseResponse = await this.dishService.addDish(this.form.value);
        const dish = await firebaseResponse.get();
        let path = null;
        if (this.file) {
          path = await this.dishService.uploadFile(`profile/${this.file.name}`, this.file);
          await this.dishService.updateDish(dish.id, {...dish.data(), profilePicture: path ? path : this.img});
        }
        this.file = null;
        path = null;
        this.router.navigate(['/', 'dishes', 'dishlist']);
      } else {
        console.log('El formulario es inválido');
      }
    }
  
    async onUpdate(): Promise<void> {
      try {
        let path = null;
        if (this.file) {
          path = await this.dishService.uploadFile(`profile/${this.file.name}`, this.file);
        }
        await this.dishService.updateDish(this.params.id, {...this.form.value, profilePicture: path ? path : this.img});
        this.router.navigate(['/', 'dishes', 'dishlist']);
      } catch (error) {
        console.log(error);
      } finally {
        this.file = null;
      }
    }
  
    /**
     * Método que obtiene un archivo
     * @param event Evento para obtener el archivo seleccionado por el usuario
     */
    async onChange(event: any): Promise<any> {
      const files: any[] = event.target.files;
      if (files.length > 0) {
        this.file = files[0];
        this.img = await this.getBase64(files[0]);
        // const url = await this.userService.uploadFile(`profile/${files[0].name}`, files[0]);
        // this.img = url;
      } else {
        console.log('No selecciono un archivo');
      }
    }
  
    /**
     * Método que convierte un archivo a base64
     * @param file Archivo
     */
    getBase64(file: File): Promise<any> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }

}
