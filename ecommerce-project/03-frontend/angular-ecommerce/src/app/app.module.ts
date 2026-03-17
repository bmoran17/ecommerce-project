import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

// define routes
// order of routes is important: first match wins
const routes: Routes = [
  // route for product details
  {path: 'products/:id', component: ProductDetailsComponent},

  // route for searching handle by ProductListComponent
  {path: 'search/:keyword', component: ProductListComponent},

  // path to match => category/:id
  // when path matches => creates new instance of product list component
  {path: 'category/:id', component: ProductListComponent},

  // route for category & products
  // both go to ProductListComponent
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},

  // route for empty path
  // redirects to /products
  {path: '', redirectTo: '/products', pathMatch: 'full'},

  // generic wildcard
  // matches anything that didn't match aove results
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent
  ],
  imports: [
    // configured router based on our routes
    RouterModule.forRoot(routes),
    BrowserModule,
    // import module for HttpClient
    HttpClientModule
  ],
  // add reference to ProductService
  // allows injection of given service into other parts of application
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
