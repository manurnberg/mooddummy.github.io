import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup = this.formBuilder.group({})
  password_not_match: boolean = false
  email: string = ''
  password: string = ''

  constructor(public formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.minLength(6), Validators.maxLength(20)]],
      password: ['', [Validators.minLength(6), Validators.maxLength(20)]],
      confirm_password: ['', [Validators.minLength(6), Validators.maxLength(20)]]
    })
  }

  get v() {
    return this.signUpForm.controls
  }

  signUp(){

    if(this.signUpForm.value.password != this.signUpForm.value.confirm_password){
      this.password_not_match = true;
    }
    this.email = this.signUpForm.value.email
    this.password = this.signUpForm.value.password

    this.auth.signUp(this.email, this.password).then(response => {
      console.log(response)
      this.toastr.success('Wellcome my Friend! Sign up successful', 'Success')
      this.signUpForm.reset()
      this.router.navigate(['/sign-in'])
      
    }).catch(error => { console.log(error) }
    )
  }

}
