import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { HeroSearchService } from './hero-search.service';
import { Hero } from './hero'

@Component({
  selector: 'hero-search',
  template: `
  <div id="search-component">
    <h4>Hero Search</h4>
    <input #searchBox id="search-box" (keyup)="search(searchBox.value)" />
    <div>
      <div *ngFor="let hero of heroes | async"
          (click)="gotoDetail(hero)" class="search-result" >
        {{hero.name}}
      </div>
    </div>
  </div>
  `,
  styles: [`
    .search-result{
      border-bottom: 1px solid gray;
      border-left: 1px solid gray;
      border-right: 1px solid gray;
      width:195px;
      height: 20px;
      padding: 5px;
      background-color: white;
      cursor: pointer;
    }
    #search-box{
      width: 200px;
      height: 20px;
    }
  `]
})
export class HeroSearchComponent implements OnInit {
  public heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor (
    private heroSearchService: HeroSearchService,
    private router: Router) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term ? // switch to new observable each time the term changes
        // return the http search observable
        this.heroSearchService.search(term) :
        // or an observable with empty heroes if there was no search term
        Observable.of<Hero[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<Hero[]>([]);
      });
  }

  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}