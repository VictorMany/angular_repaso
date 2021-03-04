import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { IUser } from 'src/app/interfaces/user/user.interface';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  users: IUser[];
  usersObs: Subscription;
  isActive: boolean;


  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.users = [];
    this.isActive = true;
    this.usersObs = this.userService.getUsersFirebase().pipe(takeWhile(() => this.isActive)).subscribe((users: IUser[]) => {
      this.users = users;
      console.log(users);
    });
  }

  async onDelete(user: IUser): Promise<void> {
    try{
      await this.userService.deleteUserById(user._id);
    } catch(error) {
      console.log(error)
    }
  }

  async onUpdate(user: IUser): Promise<void> {
    this.router.navigate(['/', 'users', user._id]);
  }

}
