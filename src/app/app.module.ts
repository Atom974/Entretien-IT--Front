import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignComponent } from './sign/sign.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BoardComponent } from './board/board.component';
import { TicketComponent } from './ticket/ticket.component';
import { CookieService } from 'ngx-cookie-service';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    AppComponent,
    SignComponent,
    HomeComponent,
    SignupComponent,
    TicketComponent,
	BoardComponent,
 EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
	ReactiveFormsModule,
	FormsModule,
	HttpClientModule
  ],
  providers: [
	CookieService
  ],
  bootstrap: [
	AppComponent,

]
})
export class AppModule { }
