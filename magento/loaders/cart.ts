import { AppContext } from "../mod.ts";
import { API } from "../utils/client/client.ts";
import { createCart, getCartCookie, setCartCookie } from "../utils/cart.ts";

export type Cart = {
  orderForm?: API["GET /rest/:site/V1/guest-carts/:cartId"]["response"];
};

/**
 * @title Magento Integration
 * @description Cart loader
 */
const loader = async (
  _props: unknown,
  req: Request,
  ctx: AppContext,
): Promise<Cart> => {
  const { api, site } = ctx;

  const cartId = getCartCookie(req.headers);

  let orderForm;

  try {
    if (cartId) {
      orderForm = await api["GET /rest/:site/V1/guest-carts/:cartId"]({
        cartId,
        site,
      }).then((
        res,
      ) => res.json());
    } else {
      orderForm = await createCart(ctx);
    }
  } catch (error) {
    console.log("error", error);
    orderForm = await createCart(ctx);
  }

  setCartCookie(ctx.response.headers, orderForm.id.toString());

  return {
    orderForm,
  };
};
export default loader;
