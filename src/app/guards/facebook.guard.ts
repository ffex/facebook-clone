import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FacebookGuard implements CanActivate {
  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private authService: AuthService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("SON PASSATO QUI");
      
    return true;/*  this.authService.userSession
      .pipe(
        map(user => user !== null),
        tap(value => {
          console.log("vecchia guardia")
          console.log(value);
          if (!value) {
            this.router.navigateByUrl('/login').then();
            return value;
          } else {
            return value;
          }
        })
      );  */
  }

}
