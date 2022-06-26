import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';
import { Route, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
	selector: 'app-sign',
	templateUrl: './sign.component.html',
	styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {

	userSingUpForm = this.formBuilder.group({
		username: '',
		password: ''
	})
	constructor(
		public alertService: AlertService,
		private formBuilder: FormBuilder,
		private userService: UserService,
		private router: Router,
		private cookieService: CookieService
	) { }

	ngOnInit(): void {
		console.log('init');
	}
	onSubmit(): void {
		const test = this.userService.login(this.userSingUpForm.value).subscribe(
			response => {
				this.userService.authHeader = response.token;
				this.userService.user = response.newUser;
				this.cookieService.set('user', JSON.stringify(this.userService.user))
				this.cookieService.set('token', this.userService.authHeader);
				this.router.navigate(['/board']);
			})
	}

}
