import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  error: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.authenticationService.login(this.email, this.password).subscribe(
      (data) => {
        console.log(data);
        this.error = false;
        this.router.navigate(['/home'], { queryParams: { name: data.name } });
      },
      (error) => {
        this.error = true;
        console.log(error);
      }
    );
  }
}
