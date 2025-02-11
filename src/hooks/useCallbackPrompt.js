import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import useBlocker from './useBlocker';

export const useCallbackPrompt = (block) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showPrompt, setShowPrompt] = useState(false);
    const [lastLocation, setLastLocation] = useState(false);
    const [confirmedNavigation, setConfirmedNavigation] = useState(false);

    // cancel the forward navigation
    const cancelNavigation = useCallback(() => {
        setShowPrompt(prevState => false);
    }, []);

    // handle blocking when user click on another route prompt will be shown
    const handleBlockedNavigation = useCallback((nextLocation) => {
        // check whether the next location and current location is equals or not
        if (!confirmedNavigation && (nextLocation?.location?.pathname !== location?.pathname || (nextLocation?.location?.pathname === location?.pathname && nextLocation?.location?.search !== location?.search))){
            setShowPrompt(prevState => true);
            setLastLocation(prevState => nextLocation);
            return false;
        }
        return true;
    }, [confirmedNavigation, location]);

    // go ahead with the navigation
    const confirmNavigation = useCallback(()=> {
        setShowPrompt(prevState => false);
        setConfirmedNavigation(prevState => true);
    },[]);

    useEffect(() => {
        if(confirmedNavigation && lastLocation){
            navigate({
                pathname: lastLocation.location.pathname,
                search: lastLocation.location.search
            });

            // clean-up state on confirmed navigation
            setConfirmedNavigation(prevState => false);
        }
    }, [confirmedNavigation, lastLocation]);

    useBlocker(handleBlockedNavigation, block);

    return [showPrompt, confirmNavigation, cancelNavigation];
}