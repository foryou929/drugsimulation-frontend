import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import { usePricingPlan } from '../../../api/pricing-plan';
import { IPaymentPageProps, IPricingPlan } from '../../../constant/interfaces';
import { CrossIcon } from '../../icons';
import { PlanCard } from '../plan';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}`);

const PaymentPage: React.FC<IPaymentPageProps> = ({ onClose }) => {
    const { pricingPlans } = usePricingPlan();
    const [selectedPricingPlan, setSelectedPricingPlan] = useState<IPricingPlan>();

    return (
        <div className='fixed left-0 top-0 z-50 h-screen w-screen flex justify-center px-[8px] pt-[64px] pb-[16px] overflow-y-auto'>
            <div className='relative w-full max-w-[640px] h-fit px-[16px] lg:px-[56px] py-[48px] bg-[#222C] border border-[#FFF4] rounded-[8px] backdrop-blur'>
                <button className='absolute right-4 top-4' onClick={onClose}>
                    <CrossIcon />
                </button>
                <h6 className="text-white text-[24px] font-medium">ストレージをアップグレードする</h6>
                <p className="mt-[36px] text-white text-[12px]">プランを選択してください<span className='ml-[4px] text-red-500'>*</span></p>
                <div className="mt-[8px] w-full h-fit flex justify-center">
                    <div className="w-full lg:max-w-4xl grid grid-cols-2 lg:grid-cols-5 gap-2">
                        {pricingPlans.map(pricePlan => <PlanCard key={pricePlan.id} id={pricePlan.id} price={pricePlan.price} storage={pricePlan.storage} current={pricePlan.id == selectedPricingPlan?.id} onClick={() => {
                            if (pricePlan.price == 0) return;
                            setSelectedPricingPlan(pricePlan);
                        }} />)}
                    </div>
                </div>
                {
                    selectedPricingPlan && (
                        <div key={selectedPricingPlan.id} className='mt-[36px]'>
                            <Elements stripe={stripePromise} options={
                                {
                                    mode: "subscription",
                                    amount: selectedPricingPlan.price,
                                    currency: 'jpy',
                                    paymentMethodCreation: 'manual',
                                    locale: 'ja',
                                    appearance: {
                                        theme: 'night'
                                    }
                                }
                            }>
                                <CheckoutForm pricingPlanId={selectedPricingPlan.id} />
                            </Elements>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default PaymentPage