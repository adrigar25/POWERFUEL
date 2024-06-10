import api from './axios';

class PaymentService {

  async getCustomerOrders(userId=null) {
    const response = await api.get('/payment/get-customer-orders', { userId });
    return response.data;
  }

  async getLastPayment() {
    const response = await api.get('/payment/last-payment');
    return response.data;
  }

  async createCheckoutSession(cart) {
    const response = await api.post('/payment/create-checkout-session', { cart });
    const session = response.data;
    return session.clientSecret;
  } 
}

const paymentService = new PaymentService();

export default paymentService;