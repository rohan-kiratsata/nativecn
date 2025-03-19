/* eslint-disable prettier/prettier */
// NativeWind compatible style object
export const styles = {
  // Container styles
  container: 'flex-row items-center justify-center gap-2',

  // Input base styles
  input: 'text-center font-medium bg-white dark:bg-gray-900 text-black dark:text-white',

  // Input size variants
  'input-sm': 'w-8 h-10 text-sm rounded-md',
  'input-md': 'w-10 h-12 text-base rounded-md',
  'input-lg': 'w-12 h-14 text-lg rounded-lg',

  // Input style variants
  'input-outline': 'border border-gray-300 dark:border-gray-900',
  'input-underline': 'border-b-2 border-gray-300 dark:border-gray-700 rounded-none',

  // Input states
  inputActive: 'border-2 border-blue-500 dark:border-blue-400',
  inputFilled: 'bg-amber-50 dark:bg-indigo-800',
  inputDisabled: 'opacity-50 bg-gray-100 dark:bg-gray-800',
  inputError: 'border-red-500 dark:border-red-400',
};
