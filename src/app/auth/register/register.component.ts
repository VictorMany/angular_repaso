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
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  async onRegister(): Promise<void> {
    if (this.form.valid) {
      try {
        const user = await this.userService.addUser(this.form.value);
        console.log('Usuario registrado: ', user);
        this.router.navigate(['/', 'user'])
      } catch (error) {
        console.log('Hubo un problema para registrar un usuario', error);
      }
    }
    else {
      console.log('Formulario inválido');
    }
  }
}
