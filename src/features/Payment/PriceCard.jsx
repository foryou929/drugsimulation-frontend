import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux';

const PriceCard = ({ id, price, description, currentId, onClick }) => {
    const { user } = useSelector(state => state.user);
    const { t } = useTranslation();

    return (
        <div className="relative p-2 border border-[#CCC] rounded cursor-pointer" onClick={onClick}>
            <div className="absolute left-[8px] top-[8px] flex">
                {
                    id == user?.current_pricing_plan && (
                        <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                            <line x1="3" y1="9" x2="8" y2="14" stroke="#1DC637" strokeWidth="2" />
                            <line x1="8" y1="14" x2="15" y2="6" stroke="#1DC637" strokeWidth="2" />
                        </svg>
                    )
                }
                {
                    id == currentId && (
                        <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                            <line x1="3" y1="9" x2="8" y2="14" stroke="#1D37C6" strokeWidth="2" />
                            <line x1="8" y1="14" x2="15" y2="6" stroke="#1D37C6" strokeWidth="2" />
                        </svg>
                    )
                }
            </div>
            <p className="text-center text-xl font-bold">&yen;{price}</p>
            <ul className="ml-6 mt-4 list-disc">
                {
                    description.map((line, index) => (
                        <li key={index} className="break-all">
                            {t(line)}
                        </li>
                    ))
                }
            </ul>
        </div >
    )
}

export default PriceCard;