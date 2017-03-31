import { Component, Input } from '@angular/core';
import { DialogService } from '../../_services/index';

@Component({
  selector: 'dialog-popup',
  templateUrl: './dialog-popup.component.html',
  styleUrls: ['./dialog-popup.component.css']
})
export class DialogPopupComponent {
	private callback: Function;
	content = {
		title: '',
		body: '',
		cancelBtn: '',
		acceptBtn: '',
		callback: null
	}

  constructor(
		private dialogService: DialogService
	) {
		this.dialogService.emitter.subscribe(
			content => {
				this.callback = content.callback;
				this.content = content;
				document.getElementById('modalToggle').click();
			}
		)
	}

	// ---------------------------------------------------------------------------
	// Function called when the accept button is clicked
	onClick() {
		if (this.callback)
			this.callback();
	}
}
