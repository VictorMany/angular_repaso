import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.sass']
})
export class NewComponent implements OnInit {
  form: FormGroup;
  isNew: boolean;
  params: Params;
  constructor(
    private userService: UserService, // Servicio de usuarios
    private router: Router, // Clase para hacer la navegación
    private activatedRoute: ActivatedRoute, // Obtener los parámetros de la url
  ) { }

  ngOnInit(): void {

    this.isNew = true;
    
    this.form = new FormGroup({
      // Definición de cada uno de los controles
      // (valor inicial, validaciones síncronas, validaciones asíncronas)
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

     // Obtener los parámetros de la url
     this.activatedRoute.params.subscribe(
      async (params: Params) => {
        this.params = params;
        this.isNew = params.userId === 'new' ? true : false;
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
      /* this.params = await this.activatedRoute.params.pipe(take(1)).toPromise();
      this.isNew = this.params.teacherId === 'new' ? true : false; */

      if (!this.isNew) {
        const teacher = await this.userService.getUserById(this.params.userId).toPromise();
        if (teacher.data()) {
          this.form = new FormGroup({
            email: new FormControl(teacher.data().email, [Validators.required, Validators.email]),
            password: new FormControl(teacher.data().password, [Validators.required]),
          });
        }
      } else {
        this.form.reset();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async onAdd(): Promise<void> {
    console.log(this.form);
    if (this.form.valid) {
      const firebaseResponse = await this.userService.addUser(this.form.value);
      const user = await firebaseResponse.get();
      let path = null;
      path = null;
      this.router.navigate(['/', 'users', 'list']);
    } else {
      console.log('El formulario es inválido');
    }
  }

  /**
   * Método que actualiza un usuario en firebase
   */
  async onUpdate(): Promise<void> {
    try {
      let path = null;
      await this.userService.updateUser(this.params.userId, this.form.value);
      this.router.navigate(['/', 'users', 'list']);
    } catch (error) {
      console.log(error);
    }
  }

}
