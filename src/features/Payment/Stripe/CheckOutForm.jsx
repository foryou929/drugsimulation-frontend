import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { NotificationManager } from 'react-notifications';
import { useDispatch } from 'react-redux';
import query from '../../../utils/query';
import { login } from '../../common/userSlice';

const CheckoutForm = ({ currentId }) => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (e) => {
    e.preventDefault();

    NotificationManager.warning(i18next.t('payment_is_processing'), i18next.t('warning'));

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required"
    });

    if (error) {
      // Show error to your customer (for example, payment details incomplete)
      NotificationManager.error(error.message, i18next.t('error'));
    } else {
      if (paymentIntent.status == "succeeded") {
        query.put(`/profile`, { current_pricing_plan: currentId }, () => {
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
      <PaymentElement />
      <div className='flex justify-center mt-8'>
        <button className='btn btn-primary' disabled={!stripe}>{t('payment')}</button>
      </div>
    </form>
  );
};

export default CheckoutForm;