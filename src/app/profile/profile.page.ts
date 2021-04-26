import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileId: String;
  isLoading: Boolean;
  errorMsg: string;
  character: any;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {
    this.isLoading = true;
  }

  ngOnInit() {
    this.profileId = this.activatedRoute.snapshot.paramMap.get('id')
    setTimeout(() => {
      this.http.get<any>('https://rickandmortyapi.com/api/character/' + this.profileId).subscribe(
        res => {
          // console.log(res);
          this.character = res;
          this.isLoading = false;
        },
        error => {
          this.errorMsg = error.error.error;
          this.isLoading = false;
        }
      )
     }, 1000);
  }
}
