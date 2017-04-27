import { Component, Input } from '@angular/core';
import { PopupService } from '../../_services/index';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
	private callback: Function;
	public isForm: boolean = false;
 	public content = {
		title: '',
		text: '',
		label: '',
		cancelBtn: '',
		confirmBtn: '',
		callback: null
	}

  constructor(
		private popupService: PopupService
	) {
		// Subscribe to the popupService emitter so that the popup can be triggered
		this.popupService.emitter.subscribe(
			content => {
				this.content = content;
				this.callback = content.callback;
				this.isForm = content.isForm;
				document.getElementById('modalToggle').click();
			});
	}

	// ---------------------------------------------------------------------------
	// Function called when the accept button is clicked
	onClick(inputField: HTMLInputElement) {
		if (this.callback) {
				let value = inputField.value.replace(/\s+$/, '');
				if (value == '' && this.isForm)
						return;

				// Trigger callback
				this.callback(value);

				// Reset title input field
				inputField.value = null;
		}
	}

	cancelClick(inputField: HTMLInputElement){
		// Reset title input field
		inputField.value = null;
	}
}
