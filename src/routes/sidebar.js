import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon'
import CalendarDaysIcon from '@heroicons/react/24/outline/CalendarDaysIcon'
import UserIcon from '@heroicons/react/24/outline/UserIcon'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'

const iconClasses = `h-6 w-6`

export const routes = [
  {
    path: '/app/AES', //url
    icon: <UserIcon className={iconClasses} />, // icon component
    name: 'Anesthetic Effect', // name that appear in Sidebar
  },
  {
    path: '/app/PKS',
    icon: <UserIcon className={iconClasses} />,
    name: 'PK Simulation',
  },
  {
    path: '/app/simulation',
    icon: <DocumentIcon className={iconClasses} />,
    name: 'result'
  },
  {
    path: '/app/calendar', // url
    icon: <CalendarDaysIcon className={iconClasses} />, // icon component
    name: 'calendar', // name that appear in Sidebar
  },
  {
    path: '/app/payment/stripe',
    icon: <CurrencyDollarIcon className={iconClasses} />,
    name: 'payment'
  },
  {
    path: '/app/settings-profile', //url
    icon: <UserIcon className={iconClasses} />, // icon component
    name: 'settings', // name that appear in Sidebar
  }
]

export const adminRoutes = [
  {
    path: '/app/administrator', // url
    icon: <Cog6ToothIcon className={iconClasses} />,
    name: 'administrator'
  }
]