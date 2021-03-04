import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  form: FormGroup
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  async onRegister(): Promise<void> {
    console.log("Hola");
    console.log(this.form.value);

    if (this.form.valid) {
      // Registro de usuarios de tipo teacher en firebase (base de datos)
      try {
        const user = await this.userService.addUser(this.form.value);
        console.log('User registrado: ', user);

        this.router.navigate(['/', 'users'])
      } catch (error) {
        console.log('Hubo un problema para registrar un user', error);
      }
    } else {
      console.log('Formulario inválido');
    }
  }
}
