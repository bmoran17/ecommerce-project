import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: `./product-list-grid.component.html`,
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  // array of products
  products: Product[] = [];
  currentCategoryId: number = 1;
  
  // inject dependecy ProductService & ActivatedRoute
  // ActivatedRoute == current active route that loaded the component - useful for accessing route parameters
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  // lifecycle hook runs after the component initializes -> calls listProducts()
  ngOnInit(): void {
    // does a subscribe on paramMap for given route
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  // Retriving Data
  listProducts() {

    /**
    check if "id" parameter is available
    route == activated route
    snapshot == state of route at this given moment in time, 
    paramMap == map of all the route
     */
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get "id" param string & conert to number using "+" symbol
      // use ! , non-null assertion operator to tell compiler that object is not null
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      // not category id available ... defauilt to category id 1
      this.currentCategoryId = 1;
    }

    // get the products for the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
