/* eslint-disable prettier/prettier */
import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, Pressable } from 'react-native';

import { styles } from './styles';

export interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  gap?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'underline';
  mask?: boolean;
  keyboard?: 'numeric' | 'default';
  error?: boolean;
  className?: string;
}

export const OTPInput = ({
  length = 6,
  value = '',
  onChange,
  disabled = false,
  autoFocus = false,
  gap = 8, // Default gap in pixels
  size = 'md',
  variant = 'outline',
  mask = false,
  keyboard = 'numeric',
  error = false,
  className = '',
}: OTPInputProps) => {
  const [localValue, setLocalValue] = useState<string>(value.slice(0, length));
  const [focused, setFocused] = useState<boolean>(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Update local value when prop value changes
  useEffect(() => {
    setLocalValue(value.slice(0, length));
  }, [value, length]);

  // Initialize input refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  // Handle text change
  const handleChange = (text: string, index: number) => {
    // Allow only one character per input
    if (text.length > 1) {
      text = text.charAt(text.length - 1);
    }

    // Update the value
    const newValue = localValue.split('');
    newValue[index] = text;
    const nextValue = newValue.join('');

    setLocalValue(nextValue);
    onChange(nextValue);

    // Auto focus next input if text is entered
    if (text.length === 1 && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace key
  const handleKeyPress = (e: any, index: number) => {
    const key = e.nativeEvent.key;

    if (key === 'Backspace') {
      if (localValue[index]) {
        // If current input has a value, clear it
        const newValue = localValue.split('');
        newValue[index] = '';
        const nextValue = newValue.join('');
        setLocalValue(nextValue);
        onChange(nextValue);
      } else if (index > 0) {
        // If current input is empty, focus and clear previous input
        inputRefs.current[index - 1]?.focus();
        // Small delay to ensure focus happens before clearing
        setTimeout(() => {
          const newValue = localValue.split('');
          newValue[index - 1] = '';
          const nextValue = newValue.join('');
          setLocalValue(nextValue);
          onChange(nextValue);
        }, 10);
      }
    }
  };

  // Handle input focus
  const handleFocus = (index: number) => {
    setFocused(true);
    setFocusedIndex(index);
  };

  // Handle input blur
  const handleBlur = () => {
    setFocused(false);
    setFocusedIndex(-1);
  };

  // Handle input tap to clear the current value immediately
  const handleTap = (index: number) => {
    if (localValue[index] && focusedIndex === index) {
      // If already focused and has value, clear it on tap
      const newValue = localValue.split('');
      newValue[index] = '';
      const nextValue = newValue.join('');
      setLocalValue(nextValue);
      onChange(nextValue);
    }
  };

  // Handle container press to focus on first empty or last filled input
  const handleContainerPress = () => {
    if (disabled) return;

    const firstEmptyIndex = localValue.split('').findIndex(char => !char);
    const focusIndex = firstEmptyIndex === -1 ? length - 1 : firstEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  // Get style classes based on props
  const getInputStyle = (index: number) => {
    const isActive = index === focusedIndex;

    let inputStyle = `${styles.input} ${styles[`input-${size}`]} ${styles[`input-${variant}`]}`;

    if (isActive) inputStyle += ` ${styles.inputActive}`;
    if (disabled) inputStyle += ` ${styles.inputDisabled}`;
    if (error) inputStyle += ` ${styles.inputError}`;

    return inputStyle;
  };

  return (
    <Pressable onPress={handleContainerPress} className={`${styles.container} ${className}`}>
      {Array.from({ length }).map((_, index) => (
        <View key={index} style={{ marginRight: index < length - 1 ? gap : 0 }}>
          <Pressable onPress={() => handleTap(index)}>
            <TextInput
              ref={ref => (inputRefs.current[index] = ref)}
              className={getInputStyle(index)}
              value={mask && localValue[index] ? '•' : localValue[index] || ''}
              onChangeText={text => handleChange(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              onFocus={() => handleFocus(index)}
              onBlur={handleBlur}
              maxLength={1}
              keyboardType={keyboard}
              secureTextEntry={false} // We handle masking manually with '•'
              editable={!disabled}
              selectTextOnFocus={false} // Disable automatic selection
              autoFocus={autoFocus && index === 0}
              contextMenuHidden // Hide the context menu for cleaner interaction
              accessible
              accessibilityLabel={`OTP digit ${index + 1} of ${length}`}
            />
          </Pressable>
        </View>
      ))}
    </Pressable>
  );
};
