export const useCartToken = () => {
    const token = useCookie("cart_token", {
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
    });

    if (!token.value) {
        token.value = crypto.randomUUID();
    }

    return token;
};