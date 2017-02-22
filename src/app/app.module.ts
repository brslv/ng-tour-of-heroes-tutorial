import { HeroDetailComponent } from './hero-detail.component';
import { DashboardComponent } from './dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HeroesComponent } from './heroes.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HeroService } from './hero.service';
import { HttpModule } from '@angular/http';
import { HeroSearchComponent } from './hero-search.component';
import { HeroSearchService } from './hero-search.service';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    // Other modules' exported classes, needed by components in this module
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],

  declarations: [
    // Houses components, directives and pipes (view classes)
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent
  ],

  bootstrap: [AppComponent], // The main application view (root component). Only the root module should set the bootstrap prop.

  providers: [HeroService, HeroSearchService] // Creators of services
})
export class AppModule { }
