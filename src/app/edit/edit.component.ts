import { Component, OnInit } from '@angular/core';
import { Observable, OperatorFunction, switchMap } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl } from '@angular/forms';
import { ITicket, IUpdateTicket, TicketService } from '../services/ticket.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Route, Router } from '@angular/router';


@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
	forUpdate = false;
	public model: any;
	public model2: NgbDateStruct = { year: 2022, month: 7, day: 14 }
	ticketForm = this.formBuilder.group({
		title: new FormControl(),
		description: new FormControl(),
		ux: new FormControl(),
		design: new FormControl(),
		front: new FormControl(),
		back: new FormControl(),
		endingDate: new FormControl(),
		teamRequirement: new FormControl(),
		clientRequirement: new FormControl(),
		lockDependency: new FormControl(),
		assignedTo: new FormControl(),
		tags: new FormControl(),
	})
	constructor(
		public alertService: AlertService,
		private formBuilder: FormBuilder,
		public ticketService: TicketService,
		public userservice: UserService,
		public router: Router,
		private route: ActivatedRoute
	) {

	}
	search = (text$: Observable<string>) => {
		return text$.pipe(
			debounceTime(200),
			distinctUntilChanged(),
			switchMap((search) => this.userservice.userLookUp(search))
		);
	}

/* 	{
		title: params.['title'],
		description: params.['description'],
		ux: params.['ux'],
		design: params.['design'],
		front: params.['front']),
		back: params.['back'],
		endingDate: params.['endingDate'],
		teamRequirement:params.['teamRequirement'],
		clientRequirement: params.['clientRequirement'],
		lockDependency: params.['lockDependency'],
		assignedTo: params?.['assignedTo'],
		tags: params?.['title'],
	} */
	ngOnInit(): void {
		this.route.queryParams
			.subscribe(params => {
				console.log(params);
				this.ticketForm.setValue(
					{
						title: params?.['title'],
						description: params?.['description'],
						ux: params?.['ux'],
						design: params?.['design'],
						front: params?.['front'],
						back: params?.['back'],
						endingDate: params?.['endingDate'],
						teamRequirement: params?.['teamRequirement'],
						clientRequirement:params?.['clientRequirement'],
						lockDependency: params?.['lockDependency'],
						assignedTo: params?.['assignedTo'],
						tags:  params?.['tags'],
					}
				)
				console.log(this.ticketForm.value);
			})
	}

	onSubmit() {
		if (this.forUpdate) {

		} else {
			let test = Object.assign({}, this.ticketForm.value)
			test.tags = this.getTagsArray(test.tags);
			if (test.endingDate)
				test.endingDate = new Date(test.endingDate.year, test.endingDate.month, test.endingDate.day)
			test.clientRequirement = test.clientRequirement == true ? 1 : 0
			test.teamRequirement = test.teamRequirement == true ? 1 : 0
			test.lockDependency = test.lockDependency == true ? 1 : 0
			test.ux = Number(test.ux)
			test.design = Number(test.design)
			test.front = Number(test.front)
			test.back = Number(test.back)
			test.assignedTo = [this.model];
			let createDto: Partial<ITicket> = test;
			this.ticketService.createTicket(createDto).subscribe(response => {
				this.router.navigate(['/board']);
			})
		}
	}
	addAssignement() {

	}
	getTagsArray(tags: string | null | undefined) {
		if (tags)
			return tags.split(/[, ]+/).filter(Boolean);
		else return [];
	}

}
