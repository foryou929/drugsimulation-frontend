// All components mapping with path for internal routes

import { lazy } from 'react'

const Page404 = lazy(() => import('../pages/protected/404'))
const Blank = lazy(() => import('../pages/protected/Blank'))
const Calendar = lazy(() => import('../pages/protected/Calendar'))
const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'))
const Result = lazy(() => import('../pages/protected/Result'))
const PKS = lazy(() => import('../pages/protected/PKS'))
const AES = lazy(() => import('../pages/protected/AES'))

const StripePaymentPage = lazy(() => import('../pages/protected/payment/Stripe'))

const routes = [
  {
    path: '/simulation',
    component: Result
  },
  {
    path: '/PKS',
    component: PKS,
  },
  {
    path: '/AES',
    component: AES,
  },
  {
    path: '/payment/stripe',
    component: StripePaymentPage,
  },
  {
    path: '/calendar',
    component: Calendar,
  },
  {
    path: '/settings-profile',
    component: ProfileSettings,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]

export default routes
