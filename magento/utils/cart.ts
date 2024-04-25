import { getCookies, setCookie } from "std/http/cookie.ts";
import { SEGMENT_COOKIE_NAME } from "./segment.ts";
import { AppContext } from "../mod.ts";

const CART_COOKIE = "magento_cart_id";

const ONE_WEEK_MS = 7 * 24 * 3600 * 1_000;

export const getCartCookie = (headers: Headers): string | undefined => {
  const cookies = getCookies(headers);
  return cookies[CART_COOKIE];
};

export const getAgentCookie = (headers: Headers): string | undefined => {
  const cookies = getCookies(headers);

  return cookies[SEGMENT_COOKIE_NAME];
};

export const setCartCookie = (headers: Headers, cartId: string) =>
  setCookie(headers, {
    name: CART_COOKIE,
    value: cartId,
    path: "/",
    expires: new Date(Date.now() + ONE_WEEK_MS),
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
  });

export async function createCart({ api, site }: AppContext) {
  const tokenCart = await api["POST /rest/:site/V1/guest-carts"]({
    site,
  }).then((
    res,
  ) => res.json());
  return await api["GET /rest/:site/V1/guest-carts/:cartId"]({
    cartId: tokenCart,
    site,
  }).then((
    res,
  ) => res.json());
}
