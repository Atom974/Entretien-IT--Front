import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from './services/alert.service';
import { UserService } from './services/user.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private userService: UserService,
		private alertService: AlertService) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		let ret: boolean;
		return new Promise<boolean>(resolve => {
			this.userService.isAuth().subscribe(response => {
				//this.alertService.newAlert('success', `Bienvenue ${this.userService.user.username}`);
				resolve(true);
			})
		})
	
	}

}
