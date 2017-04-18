import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
  //------------------------------------------------------------------------------------------------------------------------------
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  //------------------------------------------------------------------------------------------------------------------------------
  //Run when the page initializes

  ngOnInit(): void {
    // reset login status
    this.userService.logout();

    this.buildForm();
  }
  //------------------------------------------------------------------------------------------------------------------------------
  // Create the login form

  buildForm(): void {
    this.loginForm = this.fb.group({
      'email':    ['', [emailValidator, Validators.required]],
      'password': ['', [Validators.required]]
    });

    // Handle changes to form data
    this.loginForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }
  //------------------------------------------------------------------------------------------------------------------------------
  // Submit the login data. Either take user to journals page on success, or handle error

  onSubmit() {
    let email: string = this.loginForm.value.email;
    email = email.toLowerCase();

    this.userService.login(email, this.loginForm.value.password)
      .subscribe(
        data => {
          // On successful login, clear form and take user to journals page
          this.loginForm.reset();
          this.router.navigate(['/journals']);
        },
        error => {
          // On error, print to console
          console.log("Login failed:  " + error._body);
        });
  }
  //------------------------------------------------------------------------------------------------------------------------------
  //Validate form when any of the form data changes

  onValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;

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
    }
  }
  //------------------------------------------------------------------------------------------------------------------------------
  // Data used to output validation messages to the form when form data is invalid

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
