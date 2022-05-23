import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  canActivate() {

    if (!this.authenticationService.isLoggedIn()) {
      this.router.navigate(['/login']); // go to login if not authenticated
      return false;
    }
    return true;
  }
}
