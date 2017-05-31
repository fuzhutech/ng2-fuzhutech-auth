import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomePageComponent} from './homepage.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomePageComponent},
      {path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

