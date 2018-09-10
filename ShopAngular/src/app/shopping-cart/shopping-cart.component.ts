import { Component, OnInit } from "@angular/core";
import { ShoppingCartService } from "../shopping-cart.service";
import { SessionService } from "../session.service";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.css"]
})
export class ShoppingCartComponent implements OnInit {
  title = "Carrito de compras";

  constructor(
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    private sessionService: SessionService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    let autenticado;
    autenticado = this.authService.isAuthenticated();
    if (!autenticado) {
      this.router.navigate(["/login"]);
    }
    // if (this.sessionService.user == null) {

    //   this.router.navigate(['/login']);

    // }
  }

  pay() {
    this.shoppingCartService.payShoppingCart();
  }
}
