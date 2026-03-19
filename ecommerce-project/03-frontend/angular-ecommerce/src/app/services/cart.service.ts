import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  // property for shopping cart == array of cartItem objects
  cartItems: CartItem[] = []

  // Subject is a subclass of Observable
  // can use Subject to publish events in code => event will be sent to all subscribers
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {

    // check if we already have item in shopping cart
    let alredyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    if (this.cartItems.length > 0) {

      // find the item in the cart based on item id
      // returns first element that passes else returns undefined
      // executes test for each element in array until test passes
      existingCartItem = this.cartItems.find( tempCartItem => tempCartItem.id === theCartItem.id)!;

      // check if we found it
      alredyExistsInCart = (existingCartItem != undefined);
    }

    if (alredyExistsInCart) {
      //increment the quantity
      existingCartItem.quantity++;
    } else {
      // add item to array
      this.cartItems.push(theCartItem);
    }

    // compute cart total price & total quantity
    this.computeCartTotals();

  }

  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publishes events to all subscribers
    // one event for totalPrice
    // one event for totalQuantity
    // ..next(...) publishes/send event
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {

    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('----');
  }
}
