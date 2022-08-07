import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error : string | any = null;
  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    if(this.isLoginMode){
      // ...
    }
    else {
      this.authService.signUp(email, password).subscribe({
        next: (res: any) => {
          this.isLoading = false;
          console.log(res);
        },
        error : (errorMessage: any)=> {
          this.error = errorMessage;
          this.isLoading = false;
          console.log(errorMessage);
        }
      });
    }
    form.reset();
  }
}
