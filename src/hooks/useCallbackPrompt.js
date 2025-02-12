import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import useBlocker from "./useBlocker";

/**
 * A custom React hook to show a prompt when there are unsaved changes and prevent navigation.
 * It displays a confirmation prompt when the user tries to navigate away from the current page.
 *
 * @name useCallbackPrompt
 * @param {boolean} block - Flag to enable or disable blocking navigation.
 * @returns {[boolean, function, function]} - Returns an array with three values:
 *  1. `showPrompt` (boolean): Whether the prompt should be displayed.
 *  2. `confirmNavigation` (function): Function to confirm navigation and proceed.
 *  3. `cancelNavigation` (function): Function to cancel navigation and hide the prompt.
 *
 * @see {@link https://www.npmjs.com/package/react-use-callback-prompt}
 */
export const useCallbackPrompt = (block) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPrompt, setShowPrompt] = useState(false);
  const [lastLocation, setLastLocation] = useState(false);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);

  // cancel the forward navigation
  const cancelNavigation = useCallback(() => {
    setShowPrompt((prevState) => false);
  }, []);

  // handle blocking when user click on another route prompt will be shown
  const handleBlockedNavigation = useCallback(
    (nextLocation) => {
      // check whether the next location and current location is equals or not
      if (
        !confirmedNavigation &&
        (nextLocation?.location?.pathname !== location?.pathname ||
          (nextLocation?.location?.pathname === location?.pathname &&
            nextLocation?.location?.search !== location?.search))
      ) {
        setShowPrompt((prevState) => true);
        setLastLocation((prevState) => nextLocation);
        return false;
      }
      return true;
    },
    [confirmedNavigation, location]
  );

  // go ahead with the navigation
  const confirmNavigation = useCallback(() => {
    setShowPrompt((prevState) => false);
    setConfirmedNavigation((prevState) => true);
  }, []);

  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      navigate({
        pathname: lastLocation.location.pathname,
        search: lastLocation.location.search,
      });

      // clean-up state on confirmed navigation
      setConfirmedNavigation((prevState) => false);
    }
  }, [confirmedNavigation, lastLocation]);

  useBlocker(handleBlockedNavigation, block);

  return [showPrompt, confirmNavigation, cancelNavigation];
};
