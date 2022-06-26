import { Injectable } from '@angular/core';
import { Query } from 'appwrite';
import { AppwriteService } from './appwrite.service';

@Injectable({
    providedIn: 'root'
  })
  export class ProfileService {
    collID="62b6091e808b26b70021";//TODO da mettere
    /**
     *
     */
    constructor(private aws: AppwriteService) {}
    getProfile(profileId:number):Promise<any> {

        const sdk = this.aws.getAppWriteSdk();
        return sdk.database.listDocuments(this.collID,[
            Query.equal('$id', profileId)]);
    }

  }