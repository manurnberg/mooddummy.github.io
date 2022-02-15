import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({})
  passwordResetForm = this.formBuilder.group({})
  email: string = ''
  password: string = ''

  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [ Validators.email,Validators.minLength(6), Validators.maxLength(20)]],
      password: ['', [ Validators.minLength(6), Validators.maxLength(20)]],
    })
    this.passwordResetForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.minLength(6), Validators.maxLength(20)]]
    })


  }

  get v() {
    return this.loginForm.controls
  }

  get ev() {
    return this.passwordResetForm.controls
  }

  signIn() {

    this.email = this.loginForm.value.email
    this.password = this.loginForm.value.password

    this.auth.signIn(this.email, this.password).then((data: any) => {
      console.log("loged in", data)
      this.toastr.success('Wellcome my Friend! To my humble Home', 'Success')
      this.loginForm.reset()
      this.router.navigate(['/'])
    }).catch((error) => {
      console.log("error", error)
      return
    })
  }

  sendPasswordResetEmail(){
    this.auth.resetPassword(this.passwordResetForm.value.email).then((data) => {
      console.log("reset password", data)
      this.passwordResetForm.reset()
      
    }).catch((error) => {
      console.log("error", error)
      return 
    })
  }


}
