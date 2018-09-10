import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { Observable } from "rxjs/Observable";
/*import { User } from "../model/User";*/
@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  constructor(
    private _firebaseAuth: AngularFireAuth,
    private router: Router /*,
    private usuario: User*/
  ) {
    this.user = _firebaseAuth.authState;
  }
  signInWithEmailAndPassword(usuario: string, password: string) {
    return this._firebaseAuth.auth
      .signInWithEmailAndPassword(usuario, password)
      .then(function(firebaseUser) {
        //console.log("Autenticacion exitosa!");
        return "Autenticacion exitosa!";
      })
      .catch(function(error) {
        //console.log(
        throw new Error(
          "Error de autenticacion: " + error.code + " " + error.message
        );
        //);
      });
  }
  isAuthenticated() {
    let usuario;
    usuario = this._firebaseAuth.auth;
    if (usuario.currentUser) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this._firebaseAuth.auth.signOut();
    this.router.navigate(["/login"]);
  }
}
