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
  
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get<any>('https://rickandmortyapi.com/api/character?page=' + this.page).subscribe(
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
      this.http.get<any>('https://rickandmortyapi.com/api/character?page=' + this.page).subscribe(
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
}
