import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User }    from '../../_models/user';
import { UserService } from '../../_services/index';

//Regex email validator
const emailValidator = Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})

export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // reset login status
    this.userService.logout();

    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      'email': ['', [emailValidator, Validators.required]],
      'password': ['', [Validators.required]]
    });

    this.loginForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;

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

  onSubmit() {
    this.userService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        data => {
          console.log("Login successful");
        },
        error => {
          this.loginForm.reset();
          console.log("Login failed:  " + error._body);
        });
  }

  formErrors = {
    'email': '',
    'password': ''
  };

  validationMessages = {
    'email': {
      'pattern':            'Email Address is not valid.',
      'required':           'Email Address is required.'

    },
    'password': {
      'required':           'Password is required.'
    }
  };
}
