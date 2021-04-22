import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.page.html',
  styleUrls: ['./userslist.page.scss'],
})
export class UserslistPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  characters: Array<any>;
  pages: Number;

  page = 1;
  status = '';
  gender = '';

  endPoint = (page, status='', gender='') => `https://rickandmortyapi.com/api/character?page=${page}&status=${status}&gender=${gender}`;
  
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get<any>(this.endPoint(this.page)).subscribe(
      res => {
        // console.log(res);
        this.characters = res.results;
        this.pages = res.info.pages;
      }
    )
  }

  loadMoreCharacters(event) {
    this.page++;
    if (this.page == this.pages) {
      event.target.disabled = true;
    } else {
      this.http.get<any>(this.endPoint(this.page, this.status, this.gender)).subscribe(
        res => {
          // console.log(res);
          for (const character of res.results) {
            this.characters.push(character)
          }
          event.target.complete();
        }
      )
    }
  }

  getByStatusCharacter(statusCharacter){
    this.status = statusCharacter;
    this.http.get<any>(this.endPoint(this.page, this.status, this.gender)).subscribe(
      res => {
        // console.log(res);
        while(this.characters.length > 0) {
          this.characters.pop();
        }
        this.characters = res.results;
        this.pages = res.info.pages;
      }
    )
  }

  getByGenderCharacter(genderCharacter){
    this.gender = genderCharacter;
    this.http.get<any>(this.endPoint(this.page, this.status, this.gender)).subscribe(
      res => {
        // console.log(res);
        while(this.characters.length > 0) {
          this.characters.pop();
        }
        this.characters = res.results;
        this.pages = res.info.pages;
      }
    )
  }
}
