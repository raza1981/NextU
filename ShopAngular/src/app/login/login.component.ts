import { Component, OnInit } from "@angular/core";
import { User } from "../model/User";
import { LoginService } from "../login.service";
import { SessionService } from "../session.service";
import { ShoppingCartService } from "../shopping-cart.service";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  title = "Login";

  user = {
    username: "",
    password: ""
  };

  validUsername = true;
  validPassword = true;

  validLogin = true;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private loginService: LoginService,
    private sessionService: SessionService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.shoppingCartService.resetShoppingCart();
  }

  submitForm(form) {
    let validForm = true;

    if (this.user.username == "") {
      this.validUsername = false;
      validForm = false;
    } else {
      this.validUsername = true;
    }

    if (this.user.password == "") {
      this.validPassword = false;
      validForm = false;
    } else {
      this.validPassword = true;
    }

    if (validForm) {
      this.performLogin(this.user.username, this.user.password);
    }
  }

  performLogin(username: string, password: string) {
    let usuario = this.authService
      .signInWithEmailAndPassword(username, password)
      .then(function(firebaseUser) {
        console.log("Autenticacion correctamente!");
      })
      .catch(function(error) {
        console.log("Error de autenticacion: " + error.message);
      });
    //this.authService.logout();
    let autenticado;
    autenticado = this.authService.isAuthenticated();
    if (autenticado) {
      this.validLogin = true;
      console.log("autenticado");
      this.router.navigate(["./dashboard"]);
    } else {
      this.validLogin = false;
      console.log("no autenticado");
    }
    // if (response) {
    //   this.router.navigate(["./dashboard"]);
    // } else {
    //   this.validLogin = false;
    // }

    // this.loginService.performLogin(username, password).subscribe(
    //   data => {
    //     let user: User = {
    //       username: data.username,
    //       token: data._kmd.authtoken
    //     };
    //     this.sessionService.user = user;
    //     this.router.navigate(["./dashboard"]);
    //   },
    //   error => {
    //     this.validLogin = false;
    //   }
    // );
  }
}
