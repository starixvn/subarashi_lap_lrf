import { isDesktop } from 'react-device-detect';
import { useWindowSize } from 'usehooks-ts';

export const useMobileVersion = () => {
    const {width} = useWindowSize();
    if (isDesktop)
    {
        return false;
    }
    if (width >= 1024){
        return false
    }
    return true;
}

export default useMobileVersion;