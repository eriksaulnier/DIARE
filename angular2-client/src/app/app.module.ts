import { BrowserModule }                      from '@angular/platform-browser';
import { NgModule }                           from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule }                         from '@angular/http';

import { AppComponent }         from './app.component';
import { AppRoutingModule }     from './app-routing.module';
import { AppConfig }            from './app.config';

import { HomepageComponent }      from './homepage/homepage.component';
import { LoginComponent }         from './homepage/login/login.component';
import { RegisterComponent }      from './register/register.component';

import { JournalsPageComponent }  from './journals-page/journals-page.component';
import { AddJournalComponent }    from './journals-page/add-journal/add-journal.component';
import { UserJournalComponent }   from './journals-page/user-journal/user-journal.component';
import { DialogPopupComponent } from './journals-page/dialog-popup/dialog-popup.component';
import { FormPopupComponent } from './journals-page/form-popup/form-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    JournalsPageComponent,
    AddJournalComponent,
    UserJournalComponent,
    DialogPopupComponent,
    FormPopupComponent
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
