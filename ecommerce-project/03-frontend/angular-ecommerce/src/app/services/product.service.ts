import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  // Url for Spring Boot REST API
  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';

  // inject HttpClient
  constructor(private httpClient: HttpClient) { }

  // method returns observable of product array
  // map JSON data from Spring Data REST to Product array
  getProductList(theCategoryId:number): Observable<Product[]> {

    // build URl based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    // httpClient makes a get request to base url 
    // data return gets pipe and map to given data type
    // get response._embedded.products => product array 
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products) 
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    // calls REST API
    // returns an observable
    // maps the JSON data from Spring Data REST to ProductCategory array
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory) 
    );

  }
}


// supporting interface to help with mapping
// unwwraps JSON data from Spring Data REST API 
// helps make use of _embedded entry that comes back from Spring Data REST API
interface GetResponseProducts {
  _embedded: {
    // access array of products
    products: Product[];
  }
}

// unwraps JSON from Spring Data REST _embedded entry
interface GetResponseProductCategory {
  _embedded: {
    // access array of products
    productCategory: ProductCategory[];
  }
}

