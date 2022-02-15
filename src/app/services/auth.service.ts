import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Auth } from 'firebase/app/dist/auth'



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(public afAuth: AngularFireAuth,
    public router: Router) {
      
     }

     signIn(email: string, password: string) {
      
      return this.afAuth.signInWithEmailAndPassword(email, password)
        .then((result: { user: any }) => {
         
        }).catch((error: { message: any }) => {
          window.alert(error.message)
        })
    }

    signUp(email:string, password:string) {
      return this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((result: { user: any }) => {
         
          
        }).catch((error: { message: any }) => {
          window.alert(error.message)
        })
    }

    authLogin(provider: any) {
      return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        
            this.router.navigate(['/home'])
         
      }).catch((error) => {
        window.alert(error)
      })
    }

    resetPassword(email: string) {
      return this.afAuth.sendPasswordResetEmail(email)
        .then(() => {
          window.alert('Password reset email sent, check your inbox.')
        }).catch((error) => {
          window.alert(error)
        })
    }

    signOut() {
      this.afAuth.signOut();
      this.router.navigate(['/sign-in'])
    }

   

    
   

    
}
