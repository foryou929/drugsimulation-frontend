import query from '../../../utils/query'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setPageTitle } from '../../../features/common/headerSlice'

import TitleCard from "../../../components/Cards/TitleCard"

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CheckoutForm from '../../../features/Payment/Stripe/CheckOutForm'
import PriceCard from '../../../features/Payment/PriceCard'

const stripePromise = loadStripe(`${process.env.REACT_APP_PUBLISHABLE_KEY}`);

const StripePaymentPage = () => {
    const dispatch = useDispatch()
    const [pricingPlans, setPricingPlans] = useState([]);
    const [currentId, setCurrentId] = useState(null);

    const { t } = useTranslation();

    const [client_secret, setClientSecret] = useState(null)

    useEffect(() => {
        dispatch(setPageTitle({ title: "payment" }))
        query.get('/pricing_plan', (pricingPlans) => {
            setPricingPlans(pricingPlans);
        });
        if (currentId) {
            query.post(
                '/payment/stripe',
                { amount: pricingPlans.filter(pricingPlan => pricingPlan.id == currentId)[0].price },
                (res) => {
                    setClientSecret(res.client_secret)
                }
            );
        }
    }, [currentId])

    const { user } = useSelector(state => state.user);

    const lang = localStorage.getItem('lang');
    const theme = localStorage.getItem('theme');

    if (user?.isAdmin) {
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
    }

    return (
        <div className='flex justify-center'>
            <div className='w-[640px]'>
                <TitleCard>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                        {
                            pricingPlans.map(pricingPlan => <PriceCard key={pricingPlan.id} id={pricingPlan.id} price={pricingPlan.price} description={pricingPlan.description} currentId={currentId} onClick={() => setCurrentId(pricingPlan.id)} />)
                        }
                    </div>
                    {
                        (client_secret && currentId != user?.current_pricing_plan) && (
                            <div key={client_secret} className='mt-4'>
                                <Elements stripe={stripePromise} options={
                                    {
                                        clientSecret: client_secret,
                                        locale: lang ? lang : 'ja',
                                        appearance: {
                                            theme: theme == 'dark' ? 'night' : 'stripe'
                                        }
                                    }
                                }>
                                    <CheckoutForm currentId={currentId} />
                                </Elements>
                            </div>
                        )
                    }
                </TitleCard>
            </div>
        </div>
    )
}

export default StripePaymentPage