import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { HomepageComponent }      from './homepage/homepage.component';
import { RegisterComponent }      from './register/register.component';
import { UserJournalListComponent } from './user-journal-list/user-journal-list.component';

const appRoutes: Routes = [
  { path: 'register',       component: RegisterComponent},
  { path: 'home',               component: HomepageComponent},
  { path: 'journal', 		component: UserJournalListComponent},
  { path: '',                   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
