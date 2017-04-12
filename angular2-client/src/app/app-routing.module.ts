import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { AuthGuard }							from './_services/authguard.service';
import { UserService } 						from './_services/user.service';
import { HomepageComponent }      from './homepage/homepage.component';
import { RegisterComponent }      from './register/register.component';
import { SettingsComponent } 			from './settings/settings.component';
import { JournalsPageComponent }  from './journals-page/journals-page.component';

const appRoutes: Routes = [
	{ path: 'home', component: HomepageComponent },
	{ path: 'register', component: RegisterComponent },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'journals', component: JournalsPageComponent, canActivate: [AuthGuard] },
	{ path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
	providers: [
		AuthGuard,
		UserService
	]
})
export class AppRoutingModule {}
