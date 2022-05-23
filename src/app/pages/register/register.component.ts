import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user = {
    fullName: '',
    email: '',
    password: ''
  };

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  register() {
    this.userService.registerUser(this.user)
      .subscribe(data => {
        this.router.navigate(['/login']);
      },
        (error) => {
          alert(error);
        }
      );
  }

}
