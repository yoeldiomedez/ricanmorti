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
  isLoading: Boolean;
  nextPage: string;
  errorMsg: string;
  
  characters: Array<any>;
  status: string;
  gender: string;
  name: string;
  
  constructor(private http: HttpClient) { 
    this.toggledSearchBar = false;
    this.isLoading = true;
    this.errorMsg = '';
    this.name = '';
    this.status = '';
    this.gender = '';
  }

  ngOnInit() {
    setTimeout(() => { 
      this.getCharacterList();
      this.isLoading = false;
    }, 1000);
  }

  toggleSearchBar() {
    this.toggledSearchBar = !this.toggledSearchBar;
  }

  getCharacterList() {
    this.http.get<any>('https://rickandmortyapi.com/api/character').subscribe(
      res => {
        // console.log(res);
        this.characters = res.results;
        this.nextPage = res.info.next;
      },
      error => {
        this.characters = [];
        this.errorMsg = error.error.error;
      }
    )
  }

  getEndpoint(name:string, status:string, gender:string) {
    return `https://rickandmortyapi.com/api/character?name=${name}&status=${status}&gender=${gender}`;
  }

  refreshContent(event:any) {
    this.toggledSearchBar = false;
    this.errorMsg = '';
    this.name = '';
    this.status = '';
    this.gender = '';
    this.getCharacterList();
    event.target.complete(); 
  }

  loadNextPage(event:any) {
    if (this.nextPage == null) {
      event.target.disabled = true;
    } else {
      this.http.get<any>(this.nextPage).subscribe(
        res => {
          this.errorMsg = '';
          // console.log(res);
          this.nextPage = res.info.next;
          for (const character of res.results) {
            this.characters.push(character)
          }
          // console.log(this.nextPage)
          event.target.complete();
        },
        error => {
          this.characters = [];
          this.errorMsg = error.error.error;
        }
      )
    }
  }

  searchByName(event:any){
    this.name = event.target.value.trim().toLowerCase();
    this.http.get<any>(this.getEndpoint(this.name, this.status, this.gender)).subscribe(
      res => {
        // console.log(res);
        while(this.characters.length > 0) {
          this.characters.pop();
        }
        this.errorMsg = '';
        this.characters = res.results;
        this.nextPage = res.info.next;
      },
      error => {
        this.characters = [];
        this.errorMsg = error.error.error;
      }
    )
  }

  getByStatus(status:string){
    this.status = status;
    this.http.get<any>(this.getEndpoint(this.name, this.status, this.gender)).subscribe(
      res => {
        // console.log(res);
        while(this.characters.length > 0) {
          this.characters.pop();
        }
        this.errorMsg = '';
        this.characters = res.results;
        this.nextPage = res.info.next;
      },
      error => {
        this.characters = [];
        this.errorMsg = error.error.error;
      }
    )
  }

  getByGender(gender:string){
    this.gender = gender;
    this.http.get<any>(this.getEndpoint(this.name, this.status, this.gender)).subscribe(
      res => {
        // console.log(res);
        while(this.characters.length > 0) {
          this.characters.pop();
        }
        this.errorMsg = '';
        this.characters = res.results;
        this.nextPage = res.info.next;        
      },
      error => {
        this.characters = [];
        this.errorMsg = error.error.error;
      }
    )
  }
}
