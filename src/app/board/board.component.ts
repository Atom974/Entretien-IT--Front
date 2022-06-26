import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { ITicket, TicketService } from '../services/ticket.service';
import { UserService } from '../services/user.service';
import { TicketComponent } from '../ticket/ticket.component';


@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
	nouveauStatus = 0;
	pretstatus = 0;
	enCoursStatus = 0;
	testStatus = 0;
	termineStatus = 0;
	archiveStatus = 0;
	constructor(
		private router: Router,
		public ticketService: TicketService,
		public alertService: AlertService
	) { }

	ngOnInit(): void {
	}
	getfirstHit(array: Array<ITicket>, toFind: number) {

	}

	getTotalNewStatus(status: number) {
		let total = 0;
		this.ticketService.tickets.forEach(element => {
			if (element.status == status)
				total++;			
		});
		return total;
	}
}
