import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BoardComponent } from './board/board.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { SignComponent } from './sign/sign.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
	{path: 'home', component: HomeComponent},
	{path: '', redirectTo: '/home', pathMatch: 'full'},
	{path: 'signin', component: SignComponent},
	{path: 'signup', component: SignupComponent},
	{path: 'board', component: BoardComponent, canActivate: [AuthGuard]},
	{path: 'edit', component: EditComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
