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

  toggledSearchBar: Boolean;
  characters: Array<any>;
  nextPage: string;
  
  name: string;
  status: string;
  gender: string;
  
  constructor(private http: HttpClient) { 
    this.toggledSearchBar = false;
    this.name = '';
    this.status = '';
    this.gender = '';
  }

  ngOnInit() {
    this.http.get<any>('https://rickandmortyapi.com/api/character').subscribe(
      res => {
        // console.log(res);
        this.characters = res.results;
        this.nextPage = res.info.next;
      }
    )
  }

  getEndpoint(name:string, status:string, gender:string) {
    return `https://rickandmortyapi.com/api/character?name=${name}&status=${status}&gender=${gender}`;
  }
  
  toggleSearchBar() {
    this.toggledSearchBar = !this.toggledSearchBar;
  }

  loadMoreCharacters(event:any) {
    if (this.nextPage == null) {
      event.target.disabled = true;
    } else {
      this.http.get<any>(this.nextPage).subscribe(
        res => {
          // console.log(res);
          this.nextPage = res.info.next;
          for (const character of res.results) {
            this.characters.push(character)
          }
          // console.log(this.nextPage)
          event.target.complete();
        }
      )
    }
  }

  getByStatusCharacter(statusCharacter){
    this.status = statusCharacter;
    this.http.get<any>(this.getEndpoint(this.name, this.status, this.gender)).subscribe(
      res => {
        // console.log(res);
        while(this.characters.length > 0) {
          this.characters.pop();
        }
        this.characters = res.results;
        this.nextPage = res.info.next;
      }
    )
  }

  getByGenderCharacter(genderCharacter){
    this.gender = genderCharacter;
    this.http.get<any>(this.getEndpoint(this.name, this.status, this.gender)).subscribe(
      res => {
        // console.log(res);
        while(this.characters.length > 0) {
          this.characters.pop();
        }
        this.characters = res.results;
        this.nextPage = res.info.next;        
      }
    )
  }

  searchByCharacterName(event:any){
    this.name = event.target.value.trim();
    this.http.get<any>(this.getEndpoint(this.name, this.status, this.gender)).subscribe(
      res => {
        // console.log(res);
        while(this.characters.length > 0) {
          this.characters.pop();
        }
        this.characters = res.results;
        this.nextPage = res.info.next;
      }
    )
  }
}
