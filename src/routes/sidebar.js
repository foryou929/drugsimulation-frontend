import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon'
import CalendarDaysIcon from '@heroicons/react/24/outline/CalendarDaysIcon'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon';
import CubeIcon from '@heroicons/react/24/outline/CubeIcon';
import ComputerDesktopIcon from '@heroicons/react/24/outline/ComputerDesktopIcon';

const iconClasses = `h-6 w-6`

export const routes = [
  {
    path: '/app/AES',
    icon: <CubeIcon className={iconClasses} />,
    name: 'Anesthetic Effect',
  },
  {
    path: '/app/PKS',
    icon: <CubeIcon className={iconClasses} />,
    name: 'PK Simulation',
  },
  {
    path: '/app/simulation',
    icon: <DocumentIcon className={iconClasses} />,
    name: 'result'
  },
  {
    path: '/app/calendar',
    icon: <CalendarDaysIcon className={iconClasses} />,
    name: 'calendar',
  },
  {
    path: '/app/payment/stripe',
    icon: <CurrencyDollarIcon className={iconClasses} />,
    name: 'payment'
  },
  {
    path: '/app/settings-profile', //url
    icon: <Cog6ToothIcon className={iconClasses} />,
    name: 'settings',
  },
  {
    path: '/app/product-description',
    icon: <ComputerDesktopIcon className={iconClasses} />,
    name: 'product_description'
  }
]

export const adminRoutes = [
  {
    path: '/app/administrator',
    icon: <UsersIcon className={iconClasses} />,
    name: 'administrator'
  }
]