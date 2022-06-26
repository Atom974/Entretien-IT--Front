import { Injectable } from '@angular/core';

interface Alert {
	type: string;
	message: string;
}
/* const ALERTS: Alert[] = [{
	type: 'success',
	message: 'This is an success alertThis is an success alertThis is an success alertThis is an success alertThis is an success alertThis is an success alertThis is an success alert',
}, {
	type: 'danger',
	message: 'This is an success alertThis is an success alertThis is an success alertThis is an success alertThis is an success alertThis is an success alertThis is an success alert',
}
]; */
@Injectable({
	providedIn: 'root'
})
export class AlertService {
	public alerts: Alert[] = []

	constructor() {
	}
	close(alert: Alert) {
		this.alerts.splice(this.alerts.indexOf(alert), 1);
	}
	newAlert(typeAlert: 'success'| 'danger', message: any):void {
		this.alerts.push({type: typeAlert, message: message})
	}

	reset() {
	}
}
