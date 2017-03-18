import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { HomepageComponent }      from './homepage/homepage.component';
import { RegisterComponent }      from './register/register.component';

const appRoutes: Routes = [
  { path: 'register',       component: RegisterComponent},
  { path: 'home',               component: HomepageComponent},
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
