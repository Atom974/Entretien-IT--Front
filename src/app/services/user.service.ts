import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, of, map } from 'rxjs';
import { catchError, } from "rxjs/operators";
import { AlertService } from './alert.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

	export interface IUserDto {
		username: string | undefined | null,
		password: string | undefined | null,
	}
	export interface IConnectedUser {
		newUser: IUser,
		token: string
	}
	export interface IUser {
		_id: string,
		username: string,
		assignedTicket: Array<string>,
		writtenTicket: Array<string>
	}

@Injectable({
  providedIn: 'root'
})
export class UserService {
	public authHeader: string = '';
	public user: IUser = {
		_id: '',
		username: '',
		assignedTicket: [],
		writtenTicket: [],
	}
	tokentest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2MmI3MGUxNTIwYTk1YzFkZDNmZmZmZTUiLCJ1c2VybmFtZSI6ImZyZWRvIiwiZGF0ZSI6IjIwMjItMDYtMjVUMTM6NDY6MDkuMDAzWiIsImlhdCI6MTY1NjE2NDc2OSwiZXhwIjoxNjU2MjUxMTY5fQ.vf1s2c3bjNVIL9B6peOOO4SEOIpBJlWffrUt1h1Q3Oo";
	usertest: IUser = {
		_id: "62b72492f8f8ddc06b638c61",
        username: "fredoo",
        assignedTicket: [],
        writtenTicket: [],
	}
  constructor(
	  private http: HttpClient,
	  private alertService: AlertService,
	  private cookieService: CookieService
  ) { }

	isAuth() {
		if (!this.authHeader){
			this.authHeader = this.cookieService.get('token');
			this.user = JSON.parse(this.cookieService.get('user'));
		}

		return this.http.get(environment.url + "/users/auth", {headers: {authorization: this.authHeader}}).pipe(
			catchError(err => this.handleError(err, this.alertService))
		)
	}
	userLookUp(search: string){
		return this.http.get<readonly any[]>(environment.url+ '/users/'+search, { headers :{ authorization : this.authHeader}})
		.pipe(
			map( kv=> kv.map( k=> k.username) ),
            catchError(err => this.handleError(err, this.alertService))
		)
	}
	
	getUser() {
		return this.http.get(environment.url + "/users", { headers :{ authorization : this.tokentest}})
	}

	login(userDto: Partial<IUserDto>) {
		return this.http.post<IConnectedUser>(environment.url+ '/users/connect', userDto, {}).pipe(
			catchError(err => this.handleError(err, this.alertService))
		)
	}

	addUser(userDto: Partial<IUserDto>) {
		return this.http.post<IUserDto>(environment.url + '/users', userDto, {}).pipe(
			catchError(err => this.handleError(err, this.alertService) )
		)
	}

	public handleError(error: HttpErrorResponse, alertService:AlertService ) {
		if (error.status === 0) {
		  // A client-side or network error occurred. Handle it accordingly.
		  console.error('An error occurred:', error.error);
		} else {
			if (error?.error[0]?.constraints) {
				for (let i = 0; i < error.error.length; i++){
					for (const [key, value] of Object.entries(error.error[i].constraints)) {
						alertService.newAlert('danger', `${key}: ${value}`);
					  }
				}
			} else if (error?.error?.error) {
				alertService.newAlert('danger', error.error.error);
			} else {
				alertService.newAlert('danger', 'echec de la demande');
			}
		  console.error(
			`Backend returned code ${error.status}, body was: `, error.error);
		}
		// Return an observable with a user-facing error message.
		return throwError(() => new Error('Something bad happened; please try again later.'));
	  }

}
