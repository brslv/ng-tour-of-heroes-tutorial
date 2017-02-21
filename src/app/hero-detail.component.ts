import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from './hero.service';
import 'rxjs/add/operator/switchMap';
import { Hero } from './hero';

@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: './hero-detail.component.html'
})
export class HeroDetailComponent implements OnInit {
  public hero: Hero;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {
    // implementation
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .switchMap((params: Params) => this.heroService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero);
  }

  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}