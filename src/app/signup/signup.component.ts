import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import {SignupRequestPayload} from '../signup/singup-request.payload'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm:any;
  signupRequestPayload: { username: string; email: string; password: string; department: string; };
  Departments:any=["Fire","Medical","Army","Police","Scientist"];

  constructor(private authService: AuthService, private router: Router,
    private toastr: ToastrService) {
    this.signupRequestPayload = {
      username: '',
      email: '',
      password: '',
      department:''
    };
  }


  ngOnInit(){
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      department: new FormControl('',Validators.required),
    });
  }

    signup(){
      this.signupRequestPayload.email = this.signupForm.get('email')!.value;
      this.signupRequestPayload.username = this.signupForm.get('username')!.value;
      this.signupRequestPayload.password = this.signupForm.get('password')!.value;
      this.signupRequestPayload.department = this.signupForm.get('department')!.value;

      this.authService.signup(this.signupRequestPayload)
        .subscribe(data => {
          this.router.navigate(['/login'],
            { queryParams: { registered: 'true' } });
        }, error => {
          console.log(error);
          this.toastr.error('Registration Failed! Please try again');
        });
    }

    changeCity(e:any) {
      this.Departments.setValue(e.target.value, {
        onlySelf: true
      })
    }
  }


