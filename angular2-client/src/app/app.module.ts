import { BrowserModule }                      from '@angular/platform-browser';
import { NgModule }                           from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule }                         from '@angular/http';

import { AppComponent }         from './app.component';
import { AppRoutingModule }     from './app-routing.module';
import { AppConfig }            from './app.config';

import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './homepage/login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserJournalComponent } from './user-journal-list/user-journal/user-journal.component';
import { UserJournalListComponent } from './user-journal-list/user-journal-list.component';
import { AddJournalComponent } from './user-journal-list/add-journal/add-journal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    UserJournalComponent,
    UserJournalListComponent,
    AddJournalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AppConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
