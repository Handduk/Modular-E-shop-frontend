import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

declare global {
  interface Window {
    Dibs: any;
  }
}

export const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const paymentId = searchParams.get("paymentId");

  useEffect(() => {
    if (!paymentId) {
      console.warn("paymentId missing, going back to cart");
      navigate("/cart");
      return;
    }
    console.log("loading checkout script");
    const script = document.createElement("script");
    script.src = "https://test.checkout.dibspayment.eu/v1/checkout.js?v=1";
    script.onload = () => {
      const checkout = new window.Dibs.Checkout({
        checkoutKey: "ecc49f0bb4e44ffcb088137c1c0bcba5",
        paymentId,
        containerId: "checkout-container-div",
        language: "sv-SE",
      });

      checkout.on("payment-completed", () => {
        navigate("/completed");
      });
    };
    document.body.appendChild(script);
  }, [paymentId, navigate]);

  return (
    <div className="contentBody h-[calc(100vh-5rem)] flex items-center justify-center">
      <div
        id="checkout-container-div"
        style={{ width: "100%", height: "100%" }}
      ></div>
    </div>
  );
};
