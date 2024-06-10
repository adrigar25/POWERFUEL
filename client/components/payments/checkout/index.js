import React, {useCallback} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import { ScrollShadow } from "@nextui-org/react";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { useAppContext } from '@context/AppContext';
import PaymentService from '@services/paymentService'; // Asegúrate de usar la ruta correcta

const stripePromise = loadStripe('pk_test_51P5QR3Iqj90TtX55bRu7F6whFW26fRauivAnkLbY1T2DznQWrJIsETlHhYwtKOwj4kIhCZ4joaJQ5DicdSDV1RkS00YqYPtqr4');

const PaymentForm = () => {
  const {cart} = useAppContext();
  const fetchClientSecret = useCallback(async () => {
    return await PaymentService.createCheckoutSession(cart);
  }, [cart]);

  const options = {fetchClientSecret};


  return (
    <section className="h-full w-full">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <ScrollShadow>
              <EmbeddedCheckout />
            </ScrollShadow>
      </EmbeddedCheckoutProvider>
    </section>
  );
}

export default PaymentForm;