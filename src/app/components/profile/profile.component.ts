import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile?:any;
  posts: any[] = [];
  /* image: any =     'https://lindro.it/wp-content/uploads/2022/03/3967D1D8-DC1A-4F16-B2B5-DEBA428E5595.jpeg'; */

  constructor(private postService: PostService, 
              private profileService: ProfileService) { }

  ngOnInit(): void {
    //mi deve arrivare il parametro
    //recupero le informazioni sul profilo
    this.profileService.getProfile(1).then((response)=>{
      console.log("profile");
      console.log(response);
      this.profile=response.documents[0];
    });

    //recupero tutti i suoi post
    this.postService.getAllPostsProfile(1).then((response)=>{
      console.log("posts");
      console.log(response);
      this.posts=response.documents;
    });
  }

}
