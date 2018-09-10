import { Injectable } from "@angular/core";
import { Product } from "./model/Product";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { map } from "rxjs/operators";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import "rxjs/add/operator/map";
//import { AngularFire, FirebaseObjectObservable } from "angularfire2";
import * as firebase from "firebase/app";
@Injectable()
export class ProductService {
  items: Observable<any[]>;
  productos: Observable<any[]>;
  itemsRef: AngularFireList<any>;
  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase /*private _firebaseAuth: AngularFireAuth*/
  ) {
    this.items = db.list("productos").valueChanges();

    // db.list("/productos", {}).subscribe(
    //   datas => {
    //     this.items = datas;
    //     console.log("datas", datas);
    //   },
    //   err => {
    //     console.log("probleme : ", err);
    //   }
    // );
  }
  getProducts() {
    return this.items;
    // This is of type FirebaseListObservable
    // this.items = this.firebaseList.subscribe(items => {
    //     console.log(items);
    // }); // This is of type subscription.
  }

  performGetProducts(sessionToken: string): Observable<any> {
    var headers = {
      Authorization: "Kinvey " + sessionToken,
      "X-Kinvey-API-Version": "3"
    };

    let url = "https://baas.kinvey.com/appdata/kid_ryL78U7WM/products";

    let response = this.http.get(url, {
      headers: headers
    });

    return response;
  }

  performGetProductById(
    // sessionToken: string,
    productId: string
  ) /*: Observable<any>*/ {
    //this.itemsRef = this.db.list("productos");
    this.productos = this.db
      .list("/productos", ref =>
        ref.orderByChild("_id").equalTo(parseInt(productId))
      )
      .valueChanges();
    // Use snapshotChanges().map() to store the key
    // this.productos = this.itemsRef.snapshotChanges().map(changes => {
    //   return changes.map(c => ({ key: c }));
    // });
    // this.productos = this.db.
    //   .list("/productos", ref => {
    //     let q = ref.limitToLast(10);
    //     return q;
    //   })
    //   .snapshotChanges();
    return this.productos;

    //orderByChild("_id").equalTo(productId) //
    //ref => (productId ? ref.orderByChild("_id").equalTo(productId) : ref)
    //.snapshotChanges();

    // this.items = this.dbs.collection("productos").valueChanges();
    // return this.items;

    // var headers = {
    //   Authorization: "Kinvey " + sessionToken,
    //   "X-Kinvey-API-Version": "3"
    // };

    // let url =
    //   "https://baas.kinvey.com/appdata/kid_ryL78U7WM/products/" + productId;

    // let response = this.http.get(url, {
    //   headers: headers
    // });

    // return response;
  }

  performPutProduct(product: Product) {
    return new Promise((resolve, reject) => {
      try {
        let id = Number(product.id) - 1;
        const itemRef = this.db.object("productos/" + id);
        itemRef.set({
          _id: product.id,
          image: product.image,
          price: product.price,
          stock: product.stock,
          name: product.name
        });
        return resolve(true);
      } catch (error) {
        return reject(false);
      }
    });
  }
}
