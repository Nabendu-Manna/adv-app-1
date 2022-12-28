import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  contactForm: any;
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService, private router: Router) {
    this.contactForm = this.formBuilder.group({
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]+$")]],
      password: ['', [Validators.required, Validators.maxLength(15)]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.contactForm.value, this.contactForm);
    this.authService.getLogin(this.contactForm.value);
    this.router.navigate(['/']);
  }

}
