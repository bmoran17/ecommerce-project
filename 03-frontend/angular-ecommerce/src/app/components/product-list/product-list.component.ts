import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  // array of products
  products: Product[] = [];
  
  // inject our dependecy ProductService
  constructor(private productService: ProductService) { }

  // lifecycle hook runs after the component initializes
  // calls listProducts()
  ngOnInit(): void {
    this.listProducts();
  }

  // retrieving data
  // productService calls getProductList() & subscribe to data
  // method invoked once subscribe, executes asynchronously
  // data returned => assign to own property
  listProducts() {
    this.productService.getProductList().subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
