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
  // Definición del grupo de controles
  form: FormGroup;
  // Valida si es un nuevo maestro
  isNew: boolean;
  // Params
  params: Params;
  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Inicializar variables
    this.isNew = true;

    // Instancia del grupo de controles
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
        this.isNew = params.userid === 'new' ? true : false;
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
        const user = await this.userService.getUserById(this.params.userid).toPromise();
        if (user.data()) {
          this.form = new FormGroup({
            email: new FormControl(user.data().email, [Validators.required, Validators.email]),
            password: new FormControl(user.data().password, [Validators.required]),
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
    if (this.form.valid) {
      const firebaseResponse = await this.userService.addUser(this.form.value);
      const user = await firebaseResponse.get();

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
      await this.userService.updateUser(this.params.userid, this.form.value);
      console.log("Formulario", this.form.value)
      this.router.navigate(['/', 'users', 'list']);
    } catch (error) {
      console.log(error);
    }
  }
}
