import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';




@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

	userSingUpForm = this.formBuilder.group({
		username: '',
		password: ''
	})

	constructor(
		public alertService: AlertService,
		private formBuilder: FormBuilder,
		private userService: UserService
	) {

	}

	ngOnInit(): void {

	}

	onSubmit(): void {
		const test = this.userService.addUser(this.userSingUpForm.value).subscribe(response => {
			console.log(response);
			this.alertService.newAlert('success', 'User Succesfully created');
		})
		console.log(test);
		
	}
}
