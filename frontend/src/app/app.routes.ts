import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';

export const routes: Routes = [
  {path:'login',
    component:LoginComponent},

  {path:'registration',component:RegistrationComponent},
  {path:'home',component:HomeComponent},
  {path:'contact',component:ContactusComponent},
  {path:'about',component:AboutusComponent}
];
