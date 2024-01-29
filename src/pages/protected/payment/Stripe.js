import query from '../../../utils/query'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setPageTitle } from '../../../features/common/headerSlice'

import TitleCard from "../../../components/Cards/TitleCard"

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CheckoutForm from '../../../features/Payment/Stripe/CheckOutForm'

const stripePromise = loadStripe(`${process.env.REACT_APP_PUBLISHABLE_KEY}`);

const StripePaymentPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "payment" }))
    }, []);

    const { user } = useSelector(state => state.user);

    const { t } = useTranslation();

    const [client_secret, setClientSecret] = useState(null)

    useEffect(() => {
        query.post(
            '/payment/stripe',
            { amount: process.env.REACT_APP_PAY_AMOUNT },
            (res) => {
                setClientSecret(res.client_secret)
            }
        );
    }, [])

    const lang = localStorage.getItem('lang');
    const theme = localStorage.getItem('theme');

    if (user?.paid) {
        return (
            <div className='flex justify-center'>
                <div className='w-[640px]'>
                    <TitleCard title='Stripe'>
                        {
                            t('already_paid')
                        }
                    </TitleCard>
                </div>
            </div>
        )
    } else {

        return (
            <div className='flex justify-center'>
                <div className='w-[640px]'>
                    <TitleCard title='Stripe'>
                        {
                            client_secret && (
                                <Elements stripe={stripePromise} options={
                                    {
                                        clientSecret: client_secret,
                                        locale: lang,
                                        appearance: {
                                            theme: theme == 'dark' ? 'night' : 'stripe'
                                        }
                                    }
                                }>
                                    <CheckoutForm />
                                </Elements>
                            )
                        }
                    </TitleCard>
                </div>
            </div>
        )
    }
}

export default StripePaymentPage