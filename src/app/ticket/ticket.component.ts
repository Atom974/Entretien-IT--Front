import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { ITicket, TicketService } from '../services/ticket.service';

@Component({
  selector: '[app-ticket]',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
	@Input() ticket: any;

  constructor(
	  public ticketService: TicketService,
	  private alertService: AlertService,
	  private router: Router,
  ) {
	  
  }

  ngOnInit(): void {
  }
  

  totalPoint(){
	  let point = 0;
	  point = this.ticket.ux + this.ticket.design + this.ticket.front + this.ticket.back;
	  return point;
  }
  getNamedStatus(statuscode: 0 | 1 | 2| 3 | 4 | 5 ) {
	  let status :string;
	switch(statuscode) {
		case 0:
			status = "Nouveau";
			break;
		case 1:
			status = "Prêt";
			break;
		case 2:
			status = "En cours";
			break;
		case 3:
			status = "Prêt pour les tests";
			break;
		case 4:
			status = "Terminé";
			break;
		case 5:
			status = 'Archivé'
			break
	}
	return status;
  }
  updateStatus(status: 0| 1| 2| 3 |4 |5) {
	  this.ticketService.updateStatus(this.ticket._id,{status: status}).subscribe(response => {
		  this.ticket.status = response.status;
	  })
  }
  deleteTicket() {
	  this.ticketService.deleteTicket(this.ticket._id).subscribe(response => {
		this.ticketService.tickets = this.ticketService.tickets.filter((element) => {
			return element?._id !== this.ticket._id;
		})
	  })
  }
  goToEdit(){
	  this.router.navigate(['/edit'], {queryParams: this.ticket})
  }
}
