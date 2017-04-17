import { Component, Input } from '@angular/core';
import { FormService } from '../../_services/index';

@Component({
  selector: 'editform-popup',
  templateUrl: './form-popup.component.html',
  styleUrls: ['./form-popup.component.css']
})
export class FormPopupComponent {
	private callback: Function;
	content = {
		title: '',
		body: '',
		cancelBtn: '',
		acceptBtn: '',
		callback: null
	}

  constructor(
		private formService: FormService
	) {
		this.formService.emitter.subscribe(
			content => {
				this.callback = content.callback;
				this.content = content;
				document.getElementById('formModalToggle').click();
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
