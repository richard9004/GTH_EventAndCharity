import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  successMessage: string | null = null;
  constructor(private serv: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.successMessage = params['successMessage'] || null;
      this.scrollToTop();
    });
  }
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
  });

  message:string = "";
  spinning:boolean = false;

 

  login() {
    console.log(this.loginForm.value);
    this.serv.login(this.loginForm.value).subscribe((response)=>{
       if(response.userId!=null){
           const user = {
              id: response.userId,
              role: response.userRole
           }

           StorageService.saveUser(user);
           StorageService.saveToken(response.jwt);

           if(StorageService.isAdminLoggedIn()){
            this.router.navigateByUrl('/admin/dashboard');
           }else if(StorageService.isUserLoggedIn()){
            this.router.navigateByUrl('/organizers/dashboard');
           }else{
              this.message = "Bad Credentials";
           }
           this.spinning = false;
       }

      
    })
  }
}
