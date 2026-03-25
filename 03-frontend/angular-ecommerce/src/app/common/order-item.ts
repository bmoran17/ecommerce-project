import { CartItem } from "./cart-item";

export class OrderItem {
  imageUrl: string;
  unitPrice: number;
  quantity: number;
  productId: number;

  // constructs OrderItem based off CartItem
  constructor(cartItem: CartItem) {
    this.imageUrl = cartItem.imageUrl;
    this.quantity = cartItem.quantity;
    this.unitPrice = cartItem.unitPrice;
    this.productId = cartItem.id;
  }
}
