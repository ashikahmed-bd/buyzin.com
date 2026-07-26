export const useCartToken = () => {
  const token = useCookie("cart_token", {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    secure: false,
    httpOnly: true,
    sameSite: "lax",
  });

  const cartToken = useState("cart_token", () => token.value);

  if (!cartToken.value) {
    cartToken.value = crypto.randomUUID();
  }

  if (!token.value) {
    token.value = cartToken.value;
  }

  return token;
};
