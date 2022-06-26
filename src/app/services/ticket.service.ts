import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlertService } from './alert.service';
import { IUser, UserService } from './user.service';

export interface ITicket {
	_id: string
	title: string;
	description: string;
	tags: Array<string>;
	assignedTo: Array<IUser>;
	author: IUser
	endingDate: Date;
	ux: number;
	design: number;
	front: number;
	back: number;
	teamRequirement: 0 | 1;
	clientRequirement: 0 | 1;
	lockDependency: 0 | 1;
	status: 0 | 1 | 2 | 3 | 4 | 5; 
}
export interface IUpdateTicket { 
	title?: string;
	description?: string;
	tags?: Array<string>;
	assignedTo?: Array<IUser>;
	endingDate?: Date;
	ux?: number;
	design?: number;
	front?: number;
	back?: number;
	teamRequirement?: 0 | 1;
	clientRequirement?: 0 | 1;
	lockDependency?: 0 | 1;
	status?: 0 | 1 | 2 | 3 | 4 | 5; 
}
@Injectable({
	providedIn: 'root'
})
export class TicketService {
	tickets: Array<ITicket>;
	constructor(
		private userService: UserService,
		private alertService: AlertService,
		private http: HttpClient,
	) {
		this.tickets = []
		this.getTicket().subscribe(response => {
			this.tickets = response;
		})
	 }
	 deleteTicket(ticketid: string){
		return this.http.delete<IUpdateTicket>(environment.url+ '/ticket/'+ticketid, {headers: {authorization: this.userService.authHeader}}).pipe(
		   catchError(err => this.userService.handleError(err, this.alertService))
		)
	}

	 updateStatus(ticketid: string, toUpdate: IUpdateTicket){
		 return this.http.put<IUpdateTicket>(environment.url+ '/ticket/'+ticketid, toUpdate,{headers: {authorization: this.userService.authHeader}}).pipe(
			catchError(err => this.userService.handleError(err, this.alertService))
		 )
	 }
	 createTicket(ticket: Partial<ITicket>) {
		 return this.http.post<void>(environment.url+ '/ticket', ticket, {headers: {authorization: this.userService.authHeader}}).pipe(
			catchError(err => this.userService.handleError(err, this.alertService))
		 )
	 }

	 getTicket() {
		 return this.http.get<Array<ITicket>>(environment.url + '/ticket', {headers: {authorization: this.userService.authHeader}}).pipe(
			 catchError(err => this.userService.handleError(err, this.alertService))
		 )
	 }
	 
}
