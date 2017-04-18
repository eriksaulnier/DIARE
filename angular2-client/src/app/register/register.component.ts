import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User }    from '../_models/user';
import { UserService } from '../_services/index';

//Regex email validator
const emailValidator = Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

@Component({
  selector: 'registration-form',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})

export class RegisterComponent implements OnInit {
  user = new User;
  public registrationForm: FormGroup;
  //------------------------------------------------------------------------------------------------------------------------------
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  //------------------------------------------------------------------------------------------------------------------------------
  // Run when the page initializes

  ngOnInit(): void {
    this.buildForm();
  }
  //------------------------------------------------------------------------------------------------------------------------------
  // Create the registration form

  buildForm(): void {
    this.registrationForm = this.fb.group({
      'email1':     ['', [emailValidator, Validators.required]],
      'email2':     ['', [Validators.required]],
      'password1':  ['', [Validators.minLength(8), Validators.required]],
      'password2':  ['', [Validators.required]]
    });

    // Handle changes to form data
    this.registrationForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }
  //------------------------------------------------------------------------------------------------------------------------------
  // Submit the registration data. Either take user to login page on success, or handle error

  onSubmit() {
    this.user.email = this.registrationForm.value.email1;
    this.user.email = this.user.email.toLowerCase();

    this.user.password = this.registrationForm.value.password1;
    this.user.admin = false;

    this.userService.create(this.user)
    .subscribe(
      data => {
        // On successful registration, clear form and take user to login page
        this.registrationForm.reset();
        this.router.navigate(['/home']);
      },
      error => {
        // On error, print to console
        console.log(error._body);
      });
  }
  //------------------------------------------------------------------------------------------------------------------------------
  // Validate form when any of the form data changes

  onValueChanged(data?: any) {
    if (!this.registrationForm) { return; }
    const form = this.registrationForm;

    for (const field in this.formErrors) {
      // clear any previous validation messages
      this.formErrors[field] = '';
      const control = form.get(field);

      // if form data isn't valid, output appropriate validation messages
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }

      // make sure the two email fields match
      if (field === 'email2' && form.get('email2').value != null && form.get('email2').value != '') {
        if (form.get('email1').value.toLowerCase() !== form.get('email2').value.toLowerCase()) {
          this.formErrors['email2'] += this.validationMessages.email2['mismatch'] + ' ';
        }
      }

      // make sure the two password fields match
      if (field === 'password2' && form.get('password2').value != '') {
        if (form.get('password1').value !== form.get('password2').value) {
          this.formErrors['password2'] += this.validationMessages.password2['mismatch'] + '';
        }
      }
    }
  }
  //------------------------------------------------------------------------------------------------------------------------------
  // Data used to output validation messages to the form when form data is invalid

  formErrors = {
    'email1': '',
    'email2': '',
    'password1': '',
    'password2': ''
  };

  validationMessages = {
    'email1': {
      'pattern':            'Email Address is not valid.',
      'required':           'Email Address is required.'

    },
    'email2': {
      'pattern':            'Email Address is not valid.',
      'required':           'Confirm Email Address is required.',
      'mismatch':           'Emails do not match.'
    },
    'password1': {
      'minlength':          'Password must be at least 8 characters long.',
      'required':           'Password is required.'
    },
    'password2': {
      'minlength':          'Password must be at least 8 characters long.',
      'required':           'Confirm Password is required.',
      'mismatch':           'Passwords do not match.'
    }
  };
}
