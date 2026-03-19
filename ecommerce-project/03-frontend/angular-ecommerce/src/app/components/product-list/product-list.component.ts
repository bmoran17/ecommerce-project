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
  previousCategoryId: number = 1;
  searchMode: boolean = false; 

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize : number = 5;
  theTotalElements: number = 0; 

  previousKeyword: string = "";
  
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

  // Call handleListProducts() to retrieve data
  listProducts() {
    
    // check if route has a parameter for keyword
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    // perform search if there's a keyword parameter
    if (this.searchMode) {
      this.handleSearchProducts();
    // not in search mode so list products
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
  
    // get keyword user typed in
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // if we have different keyword than previous -> set thePageNumber to 1
    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;
    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    // search for products using keyword
    this.productService.searchProductsPaginate(
      this.thePageNumber - 1, this.thePageSize, theKeyword)
      .subscribe(this.processResult());
  }

  handleListProducts() {

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

    // Check if we have a different category than previous
    // Angular will reuse component if it is currently being viewed

    // if we have a different category id than previous
    // then set thePageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

    // get the products for the given category id -> call service & pass parameters
    this.productService.getProductListPagination(
      this.thePageNumber - 1, this.thePageSize, this.currentCategoryId)
      .subscribe(this.processResult());
  }

  updatePageSize(pageSize: string) {
    // set page size based on parameter value
    this.thePageSize = +pageSize;
    // reset page num to 1
    this.thePageNumber = 1;
    // refresh page with info
    this.listProducts();
  }

  // take JSON response & map to fields in class
  // left side == properties defined in class
  // right side == data from Spring Data REST JSON
  processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1; // + 1 b/c Spring Data REST pages are 0 based
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }

  addToCart(theProduct: Product) {
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);
  }

}
