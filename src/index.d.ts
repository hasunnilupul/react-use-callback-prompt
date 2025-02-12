declare module "react-use-callback-prompt" {
  /**
   * A custom React hook to show a prompt when there are unsaved changes and prevent navigation.
   * It displays a confirmation prompt when the user tries to navigate away from the current page.
   *
   * @param block - Flag to enable or disable blocking navigation.
   * @returns A tuple containing:
   *  1. `showPrompt` (boolean): Whether the prompt should be displayed.
   *  2. `confirmNavigation` (function): Function to confirm navigation and proceed.
   *  3. `cancelNavigation` (function): Function to cancel navigation and hide the prompt.
   *
   * @see {@link https://www.npmjs.com/package/react-use-callback-prompt}
   */
  export function useCallbackPrompt(
    block: boolean
  ): [boolean, () => void, () => void];
}
