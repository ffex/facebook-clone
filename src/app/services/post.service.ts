import { Injectable} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { User } from 'firebase';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AppwriteService } from './appwrite.service';
import { Query } from 'appwrite';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  currentUser: User;
  collID="62b6091e808b26b70021";

  constructor(private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private aws: AppwriteService) {
    this.afAuth.authState.subscribe(user => this.currentUser = user);
  }

  getAllPosts(): Promise<any> {
    const sdk = this.aws.getAppWriteSdk();
    return  sdk.database.listDocuments(this.collID);
    /* promise.then((response) => {
      
    }, function (error) {
      console.log(error); // Failure
    }); */
  
/*     return this.afs.collection<any>('posts', ref => ref.orderBy('time', 'desc'))
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(item => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data(),
            };
          });
        })
      ); */
  }
  getAllPostsProfile(idProfile:number): Promise<any> {
    const sdk = this.aws.getAppWriteSdk();
    return  sdk.database.listDocuments(this.collID,[
      Query.equal('profileId', idProfile)]);
  }

  postMessage(message: string, ownerName: string, otherItem): void {
    const sdk = this.aws.getAppWriteSdk();

      let promise = sdk.database.createDocument(this.collID, 'unique()', {"title":ownerName,"message":message,"avatar":otherItem.avatar,"time":new Date().toLocaleString()});

    promise.then(function (response) {
      console.log(response); // Success
    }, function (error) {
      console.log(error); // Failure
    });
    /*     this.afs.collection('posts').add({
          message,
          title: ownerName,
          user_id: this.currentUser.uid,
          time: firebase.firestore.FieldValue.serverTimestamp(),
          ...otherItem
        }).then(res => console.log(res)); */
  }


}
