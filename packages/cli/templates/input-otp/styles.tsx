// NativeWind compatible style object
export const styles = {
  // Container styles
  container: 'flex-row items-center justify-center',

  // Separator style
  separator: 'mx-2 text-gray-400 dark:text-gray-600',

  // Input base styles
  input: 'text-center font-medium bg-white dark:bg-gray-900 text-black dark:text-white',

  // Input size variants
  'input-sm': 'w-8 h-10 text-sm',
  'input-md': 'w-10 h-12 text-base',
  'input-lg': 'w-12 h-14 text-lg',

  // Input style variants
  'input-outline': 'border border-gray-300 dark:border-gray-700',

  // Input position styles
  inputFirstInGroup: 'rounded-l-md border-l border-t border-b border-r-0 rounded-r-none',
  inputLastInGroup: 'rounded-r-md border-r border-t border-b rounded-l-none',
  inputMiddle: 'rounded-none border-t border-b border-r-0',

  // Input states
  inputActive: 'dark:outline-blue-400  z-10',
  inputFilled: 'bg-amber-50 dark:bg-indigo-800',
  inputDisabled: 'opacity-50 bg-gray-100 dark:bg-gray-800',
  inputError: 'border-red-500 dark:border-red-400',
};
