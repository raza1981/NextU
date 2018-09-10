import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SessionService } from "../session.service";
import { Product } from "../model/Product";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  products: Product[] = [];

  constructor(private router: Router, private sessionService: SessionService,
    private authService: AuthService) {}

  ngOnInit() {
    // if (this.sessionService.user == null) {
    //   this.router.navigate(["/login"]);
    // }
    let autenticado;
    autenticado = this.authService.isAuthenticated();
    if (!autenticado) {
      this.router.navigate(["/login"]);
    }
  }
}
