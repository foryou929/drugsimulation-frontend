/** Icons are imported separatly to reduce build time */
// import BellIcon from '@heroicons/react/24/outline/BellIcon'
// import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon'
// import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
// import TableCellsIcon from '@heroicons/react/24/outline/TableCellsIcon'
// import WalletIcon from '@heroicons/react/24/outline/WalletIcon'
// import CodeBracketSquareIcon from '@heroicons/react/24/outline/CodeBracketSquareIcon'
import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon'
// import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon'
import CalendarDaysIcon from '@heroicons/react/24/outline/CalendarDaysIcon'
// import ArrowRightOnRectangleIcon from '@heroicons/react/24/outline/ArrowRightOnRectangleIcon'
import UserIcon from '@heroicons/react/24/outline/UserIcon'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
// import BoltIcon from '@heroicons/react/24/outline/BoltIcon'
// import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
// import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon'
// import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
// import KeyIcon from '@heroicons/react/24/outline/KeyIcon'
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon'

const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`

const routes = [
  {
    path: '/app/calendar', // url
    icon: <CalendarDaysIcon className={iconClasses} />, // icon component
    name: 'calendar', // name that appear in Sidebar
  },
  {
    path: '', //no url needed as this has submenu
    icon: <DocumentDuplicateIcon className={`${iconClasses} inline`} />, // icon component
    name: 'PKS_AES', // name that appear in Sidebar
    submenu: [
      {
        path: '/app/simulation',
        icon: <DocumentIcon className={submenuIconClasses} />,
        name: 'result'
      },
      {
        path: '/app/PKS',
        icon: <UserIcon className={submenuIconClasses} />,
        name: 'pharmacokinetic',
      },
      {
        path: '/app/AES', //url
        icon: <UserIcon className={submenuIconClasses} />, // icon component
        name: 'anesthetic_effect', // name that appear in Sidebar
      },
    ]
  },
  {
    path: '',
    icon: <CurrencyDollarIcon className={`${iconClasses} inline`} />,
    name: 'payment',
    submenu: [
      {
        path: '/app/payment/stripe',
        icon: <CurrencyDollarIcon className={submenuIconClasses} />,
        name: 'stripe'
      }
    ]
  },
  {
    path: '', //no url needed as this has submenu
    icon: <Cog6ToothIcon className={`${iconClasses} inline`} />, // icon component
    name: 'settings', // name that appear in Sidebar
    submenu: [
      {
        path: '/app/settings-profile', //url
        icon: <UserIcon className={submenuIconClasses} />, // icon component
        name: 'profile_setting', // name that appear in Sidebar
      },
    ]
  },
]

export default routes


