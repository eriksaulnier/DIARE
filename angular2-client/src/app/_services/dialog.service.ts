import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class DialogService {
	private emitterSource = new Subject<any>();
	emitter = this.emitterSource.asObservable();

	// ---------------------------------------------------------------------------
	// Sends new dialog info which tells our dialog to populate and toggle
	createDialog(title: string = '', body: string = '', cancelBtn: string = '', acceptBtn: string = '', callback: Function = null) {
		console.log('Creating dialog: ' + title);

		// emit dialog info
		this.emitterSource.next({
			title: title,
			body: body,
			cancelBtn: cancelBtn,
			acceptBtn: acceptBtn,
			callback: callback
		});
	}
}
