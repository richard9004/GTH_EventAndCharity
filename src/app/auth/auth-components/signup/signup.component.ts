import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { AuthService } from '../../services/auth/auth.service';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {


  constructor(private serv:AuthService) {
   

  }
   // Custom Validator Function
 confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
  if (!control.value) {
    return { require: true };
  } else if (control.value !== this.signUpForm.controls["password"].value) {
    return { confirm: true, error: true };
  }
  return {};
};

  signUpForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
    confirmPassword: new FormControl('', [
      Validators.required,
      this.confirmationValidator.bind(this),
    ]),
  });
 
 
 

 

  signup() {
    console.log(this.signUpForm.value);
    this.serv.registeruser(this.signUpForm.value).subscribe((response)=>{
      console.log(response);
    });
  }
}
