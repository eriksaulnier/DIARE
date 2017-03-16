import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  onSubmit() {
    this.user.email = this.registrationForm.value.email1;
    this.user.password = this.registrationForm.value.password1;
    this.user.admin = false;
    this.registrationForm.reset();

    this.userService.create(this.user)
    .subscribe(
        data => {
            console.log("Registration successful!");
        },
        error => {
            console.log(error._body);
        });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.registrationForm = this.fb.group({
      'email1': ['', [emailValidator, Validators.required]],
      'email2': ['', [emailValidator, Validators.required]],
      'password1': ['', [Validators.minLength(8), Validators.required]],
      'password2': ['', [Validators.minLength(8), Validators.required]]
    });

    this.registrationForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.registrationForm) { return; }
    const form = this.registrationForm;

    for (const field in this.formErrors) {
      // clear any previous error messages
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

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
      'pattern':            'Confirm Email Address is not valid.',
      'required':           'Confirm Email Address is required.'
    },
    'password1': {
      'minlength':          'Password must be at least 8 characters long.',
      'required':           'Password is required.'
    },
    'password2': {
      'minlength':          'Password must be at least 8 characters long.',
      'required':           'Confirm Password is required.'
    }
  };
}
