import { useSelector } from 'react-redux'
import Service from '../../../common/lib/Service';

export const useIsEnableLeagueMatch = () => {
    const [selectedProduct, dateRange] = useSelector(state => [state.selectedProduct, state.dateRange]);
    const productCode = selectedProduct;
    return productCode === 'SB' && Service.isSingleDate(dateRange);
}

export default useIsEnableLeagueMatch;