import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService, DialogService } from './../_services/index';

// Regex email validator
const emailValidator = Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
	providers: [DialogService]
})
export class SettingsComponent implements OnInit {
	private userid: string;
	public changeEmailForm: FormGroup;
	public changePswdForm: FormGroup;

  constructor(
		private fb: FormBuilder,
		private dialogService: DialogService
	) {
		// Fetch the current userid and update variable
		let user = JSON.parse(localStorage.getItem('currentUser'));
		this.userid = user._id;
	}

  ngOnInit() {
		this.buildForms();
  }

	buildForms(): void {
		this.changeEmailForm = this.fb.group({
      'newEmail':     ['', [emailValidator, Validators.required]],
      'newEmail2':     ['', [emailValidator, Validators.required]]
    });
		this.changeEmailForm.valueChanges
      .subscribe(data => this.emailFormValueChanged(data));

		// this.emailFormValueChanged();

		this.changePswdForm = this.fb.group({
      'curPswd':     ['', [Validators.minLength(8), Validators.required]],
			'newPswd':     ['', [Validators.minLength(8), Validators.required]],
      'newPswd2':     ['', [Validators.minLength(8), Validators.required]]
    });
		this.changePswdForm.valueChanges
      .subscribe(data => this.pswdFormValueChanged(data));

		// this.pswdFormValueChanged();
	}

	emailFormValueChanged(data?: any) {
		if (!this.changeEmailForm) { return; }
    const form = this.changeEmailForm;

    for (const field in this.formErrors) {
      // clear any previous validation messages
      this.formErrors[field] = '';
      const control = form.get(field);

      // if form data isn't valid, output appropriate validation messages
			const messages = this.validationMessages[field];
      if (control && control.dirty && !control.valid) {
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }

			// make sure the two email fields match
			if (field === 'newEmail2' && form.get('newEmail2').value != '') {
				if (form.get('newEmail').value !== form.get('newEmail2').value) {
					this.formErrors['newEmail2'] += messages['mismatch'] + ' ';
				}
			}
    }
	}

	pswdFormValueChanged(data?: any) {
		if (!this.changePswdForm) { return; }
    const form = this.changePswdForm;

    for (const field in this.formErrors) {
      // clear any previous validation messages
      this.formErrors[field] = '';
      const control = form.get(field);

      // if form data isn't valid, output appropriate validation messages
			const messages = this.validationMessages[field];
      if (control && control.dirty && !control.valid) {
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }

			// make sure the two password fields match
			if (field === 'newPswd2' && form.get('newPswd2').value != '') {
				if (form.get('newPswd').value !== form.get('newPswd2').value) {
					this.formErrors['newPswd2'] += messages['mismatch'] + ' ';
				}
			}
    }
	}

	emailFormSubmitted() {
		const newEmail = this.changeEmailForm.value.newEmail;

		// Don't submit if form isn't valid
		if (!this.changeEmailForm.valid) {
			return false;
		}

		// Change the user's email
		console.log('TODO: Change email');

		// Reset the form only if we succeed
		this.changeEmailForm.reset();
	}

	pswdFormSubmitted() {
		const curPswd = this.changePswdForm.value.curPswd;
		const newPswd = this.changePswdForm.value.newPswd;

		// Don't submit if form isn't valid
		if (!this.changePswdForm.valid) {
			return false;
		}

		// Change the user's password
		console.log('TODO: Change password');

		// Reset the form only if we succeed
		this.changePswdForm.reset();
	}

	deleteAccount() {
		// Tell the userService to delete this user.
		console.log('TODO: Delete user ' + this.userid);
	}

	confirmDeleteAccount() {
		this.dialogService.createDialog(
			"Confirm Delete",
			"Are you sure you want to <b>permanently</b> delete your account?",
			"Cancel",
			"Yes, delete my account",
			this.deleteAccount.bind(this)
		);
	}

	formErrors = {
    'newEmail': '',
    'newEmail2': '',
		'curPswd': '',
		'newPswd': '',
		'newPswd2': ''
  };

  validationMessages = {
    'newEmail': {
      'pattern':            'Email Address is not valid.',
      'required':           'Email Address is required.'
    },
    'newEmail2': {
      'pattern':            'Confirm Email Address is not valid.',
      'required':           'Confirm Email Address is required.',
			'mismatch':						'Emails do not match.'
    },
		'curPswd': {
      'required':           'Your Current Password is required.'
    },
		'newPswd': {
			'minlength':          'New Password must be at least 8 characters long.',
      'required':           'A New Password is required.'
    },
		'newPswd2': {
			'minlength':          'New Password must be at least 8 characters long.',
      'required':           'New Password Confirmation is required.',
			'mismatch':						'Passwords do not match.'
    },
  };
}
