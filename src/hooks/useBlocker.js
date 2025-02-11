import { useContext, useEffect } from 'react'
import { UNSAFE_NavigationContext } from 'react-router-dom';

const useBlocker = (blocker, enable = true) => {
  const navigator = useContext(UNSAFE_NavigationContext).navigator;

  useEffect(() => {
    if(!enable) return;

    const unblock = navigator.block((tx) => {
        const autoUnblockingTx = {
            ...tx,
            retry(){
                unblock();
                tx.retry();
            }
        };

        blocker(autoUnblockingTx);
    });

    return unblock;
  }, [navigator,blocker, enable]);
}

export default useBlocker;