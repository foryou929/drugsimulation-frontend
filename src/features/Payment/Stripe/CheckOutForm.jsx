import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

import query from '../../../utils/query';
import { login } from '../../common/userSlice'

const CheckoutForm = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (e) => {
    e.preventDefault();

    NotificationManager.warning(i18next.t('payment_is_processing'), i18next.t('warning'));

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      redirect: "if_required"
    });

    if (error) {
      // Show error to your customer (for example, payment details incomplete)
      NotificationManager.error(error.message, i18next.t('error'));
    } else {
      if (paymentIntent.status == "succeeded") {
        query.put(`/profile`, { paid: true }, () => {
          query.get('/login', (data) => {
            dispatch(login(data.user))
            NotificationManager.success(i18next.t('payment_success'), i18next.t('success'));
          })
        })
      }
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <p className='text-xl my-2 text-center'>${Number(process.env.REACT_APP_PAY_AMOUNT) / 100}</p>
      <PaymentElement />
      <div className='flex justify-center mt-8'>
        <button className='btn btn-primary' disabled={!stripe}>{t('payment')}</button>
      </div>
    </form>
  );
};

export default CheckoutForm;