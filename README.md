# useCallbackPrompt

A React custom hook designed to intercept navigation events and display a confirmation prompt before allowing users to navigate away

### NPM

https://www.npmjs.com/packages/react-use-callback-prompt

## Installation

Install the package using npm or yarn:

```sh
npm install use-callback-prompt
```

or

```sh
yarn add use-callback-prompt
```

## Usage

### Basic Example

```tsx
import React, { useState } from 'react';
import { useCallbackPrompt } from 'use-callback-prompt';

const MyComponent = () => {
    const [isBlocking, setIsBlocking] = useState(false);
    const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(isBlocking);

    return (
        <div>
            <h1>Example Form</h1>
            <input
                type="text"
                onChange={() => setIsBlocking(true)}
                placeholder="Type something..."
            />
            {showPrompt && (
                <div>
                    <p>Are you sure you want to leave?</p>
                    <button onClick={confirmNavigation}>Yes</button>
                    <button onClick={cancelNavigation}>No</button>
                </div>
            )}
        </div>
    );
};

export default MyComponent;
```

## API

### `const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(enable: boolean);`

- `block: boolean` - Determines whether navigation should be blocked.
- `showPrompt: boolean` - Indicates whether the navigation confirmation prompt should be displayed.
- `confirmNavigation: function` - Call this function to proceed with navigation.
- `cancelNavigation: function` - Call this function to cancel navigation.

## License

MIT
