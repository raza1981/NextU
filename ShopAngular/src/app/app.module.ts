import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { AppRoutingModule } from ".//app-routing.module";

import { LoginService } from "./login.service";
import { SessionService } from "./session.service";
import { ProductService } from "./product.service";
import { ShoppingCartService } from "./shopping-cart.service";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProductCatalogComponent } from "./product-catalog/product-catalog.component";
import { ProductItemComponent } from "./product-item/product-item.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { HeaderComponent } from "./header/header.component";
import { ShoppingCartItemComponent } from "./shopping-cart-item/shopping-cart-item.component";

import { environment } from "../environments/environment";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AuthService } from "./services/auth.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProductCatalogComponent,
    ProductItemComponent,
    ProductDetailComponent,
    ShoppingCartComponent,
    HeaderComponent,
    ShoppingCartItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(
      environment.firebase,
      "angular-auth-firebase"
    ),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    LoginService,
    SessionService,
    ProductService,
    ShoppingCartService,
    AuthService,
    AngularFireDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
