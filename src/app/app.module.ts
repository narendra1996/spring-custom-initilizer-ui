import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DependencyTileComponent } from './dependency-tile/dependency-tile.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PrdCommonModule } from './common/prd-common.module';
import { ProjectExplorerComponent } from './project-explorer/project-explorer.component';

@NgModule({
  declarations: [
    AppComponent,
    DependencyTileComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    ProjectExplorerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    PrdCommonModule
  ],
  providers: [],
  bootstrap: [AppComponent, HeaderComponent, FooterComponent]
})
export class AppModule { }
