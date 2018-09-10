import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { ProductService } from "../product.service";
import { Product } from "../model/Product";
import { SessionService } from "../session.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"]
})
export class ProductDetailComponent implements OnInit {
  product: Product;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private sessionService: SessionService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    let autenticado;
    autenticado = this.authService.isAuthenticated();
    if (!autenticado) {
      //if (this.sessionService.user == null) {

      this.router.navigate(["/login"]);
    } else {
      let id = this.route.snapshot.paramMap.get("id");

      this.getProductDetail(id);
    }
  }

  getProductDetail(id: string) {
    this.productService.performGetProductById(id).subscribe(
      datas => {
        let producto: Product = {
          id: datas[0]._id,
          name: datas[0].name,
          image: datas[0].image,
          price: datas[0].price,
          stock: datas[0].stock
          //console.log("datas: ", datas);
        };
        this.product = producto;
      },
      err => {
        console.log("probleme : ", err);
      }
    );
  }

  goBack() {
    this.location.back();
  }
}
