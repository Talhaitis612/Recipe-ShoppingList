import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBrX3us-jwSd8CmJDc5ihVpzTI2zDBH39U';
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBrX3us-jwSd8CmJDc5ihVpzTI2zDBH39U',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    ).pipe(catchError((errorRes : any)=>{
      let errorMessage = 'An unknown error occured!'
      if(!errorRes.error || !errorRes.error.error){
        return throwError(errorMessage);
      }
      switch(errorRes.error.error.message)
      {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists already!';
      }
      return throwError(errorMessage);
    }))
  }
}
