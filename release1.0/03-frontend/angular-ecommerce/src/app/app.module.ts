import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent
  ],
  imports: [
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
