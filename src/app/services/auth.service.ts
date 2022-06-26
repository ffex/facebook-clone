import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Observable, of } from 'rxjs';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AppwriteService } from './appwrite.service';
import { Models } from 'appwrite';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // tslint:disable-next-line:variable-name
  private _userData: Observable<firebase.User>;

  private currentUser?: Models.User<Models.Preferences>;
  private currentSession?: Models.Session = null;
  private currentUser$ = new BehaviorSubject<UserData>(null);

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore,
    private aws: AppwriteService) {
    this._userData = afAuth.authState;

    this._userData.subscribe(user => {
      if (user) {
        this.afs.collection<UserData>('users')
          .doc<UserData>(user.uid)
          .valueChanges()
          .subscribe(currentUser => {
            //this.currentUser = currentUser;
            //this.currentUser$.next(currentUser);
          });
      }
    });

  }

  CurrentUser(): Observable<Models.User<Models.Preferences>> {
    return of(this.currentUser);
  }

  SignUp(email: string,
    password: string,
    firstName: string,
    lastName: string,
    avatar = 'https://portal.staralliance.com/cms/aux-pictures/prototype-images/avatar-default.png/@@images/image.png'): void {

    this.aws.getAppWriteSdk().account.create('unique()', email, password, firstName + " " + lastName)
      .then(response => {
        console.log(response);
        this.currentUser = response;
      }, error => {
        console.log(error);
      });



    /*  this.afAuth.createUserWithEmailAndPassword(email, password)
       .then(res => {
         if (res) {
           this.afs.collection('users').doc(res.user.uid)
             .set({
               firstName,
               lastName,
               email,
               avatar
             }).then(value => {
             this.afs.collection<UserData>('users')
               .doc<UserData>(res.user.uid)
               .valueChanges()
               .subscribe(user => {
                 console.log(user);
                 if (user) {
                   this.currentUser$.next(user);
                 }
               });
 
           });
         }
       })
       .catch(err => console.log(`Something went wrong ${err.message}`)); */
  }

  get userSession(): Observable<Models.Session> {
    console.log("chiamato!");
    console.log(this.currentSession);
    return of(this.currentSession);
  }
  /*   AddPreferences(){
      const prefs= {"avatar":"test","firstname":"testfirstname"};
      this.aws.getAppWriteSdk().account.updatePrefs(prefs);
  
    } */

  SignIn(email: string, password: string): void {
    console.log(email, password);

    let promise = this.aws.getAppWriteSdk().account.createSession(email, password);

    promise.then(response => {
      console.log("SessioneCreata"); // Success
      console.log(response); // Success
      //this.AddPreferences();
      console.log(this.currentSession); // Success
      this.currentSession = response;

      console.log(this.currentSession); // Success
    }, function (error) {
      console.log(error); // Failure
    });

  }

  isSessionActive(): boolean {

    if (!this.aws.getAppWriteSdk().account) {
      return true;
    } else {
      return false;
    }
  }
  /*   this.afAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
        this._userData = this.afAuth.authState;
 
        this.afs.collection<UserData>('users')
          .doc<UserData>(res.user.uid)
          .valueChanges()
          .subscribe((user) => {
            console.log(user);
            // @ts-ignore
            this.currentUser = user;
            //this.currentUser$.next(this.currentUser);
          });
 
 
      }).catch(err => console.log(err.message)); */

  getUserPromise() {
    let promise = this.aws.getAppWriteSdk().account.get();

    return promise;
  }
  setPref(){
    let promise = this.aws.getAppWriteSdk().account.updatePrefs({"avatar":"assets/fb-logo.jpg"});
  }
  Logout(): void {
    //TODO da rifare
    this.setPref();
 /*    this.afAuth.signOut().then(res => {
      console.log(res);
      this.currentUser = null;
      //this.currentUser$.next(this.currentUser);
      this.router.navigateByUrl('/login').then();
    }); */
  }

  searchUserInDatabase(user_id: string): Observable<UserData> {
    return this.afs.collection<UserData>('users').doc<UserData>(user_id).valueChanges();
  }

}

export interface UserData {
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  id?: string;
}
