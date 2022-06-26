import { Injectable } from "@angular/core"
import { Appwrite, Query } from "appwrite";

@Injectable({
    providedIn: 'root',
})
export class AppwriteService{
    private appWriteSdk: Appwrite;

    constructor() {
        this.appWriteSdk = new Appwrite();
        this.appWriteSdk.setEndpoint('http://164.92.148.110/v1') // Your API Endpoint
            .setProject('62b5501eaeb197ee9cdf') // Your project ID
            ;
    }
    getAppWriteSdk(): Appwrite {
        return this.appWriteSdk;
    }
}