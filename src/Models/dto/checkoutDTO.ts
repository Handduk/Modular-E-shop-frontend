import { CheckoutItems } from "../checkoutItems";
import { Customer } from "../Customer";

export type CheckoutDTO = {
  items: CheckoutItems[];
  shippingCost: number;
  totalPrice: number;
  orderNumber: string;
  paymentMethod: string;
  deliveryMethod: string;
  orderDate: string;
  customer: Customer;
}