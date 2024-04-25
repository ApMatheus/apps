import { Cart } from "./types.ts";

export interface API {
  /** @docs https://adobe-commerce.redoc.ly/2.4.7-admin/tag/guest-carts#operation/PostV1Guestcarts */
  "POST /rest/:site/V1/guest-carts": {
    response: string;
  };
  /** @docs https://adobe-commerce.redoc.ly/2.4.7-admin/tag/guest-cartscartId#operation/GetV1GuestcartsCartId */
  "GET /rest/:site/V1/guest-carts/:cartId": {
    response: Cart;
  };
}
