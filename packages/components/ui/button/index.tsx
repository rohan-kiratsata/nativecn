import React, { useState } from 'react';
import {
  Pressable,
  Text,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import { cn } from '../../../lib/utils';

import { buttonClassNames } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  className?: string;
  textClassName?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  mode?: 'light' | 'dark';
  children: React.ReactNode;
  asChild?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  size = 'default',
  disabled = false,
  className = '',
  textClassName = '',
  style,
  mode = 'light',
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const containerClasses = cn(
    buttonClassNames.base,
    buttonClassNames[`size_${size}`],
    buttonClassNames[`${mode}_variant_${variant}`],
    isPressed && buttonClassNames.pressed[variant],
    disabled && buttonClassNames.disabled,
    className
  );

  const textClasses = cn(
    'text-sm font-medium',
    size === 'sm' ? 'text-xs' : 'text-sm',
    variant === 'default'
      ? mode === 'dark'
        ? 'text-dark-primary-foreground'
        : 'text-primary-foreground'
      : variant === 'destructive'
        ? mode === 'dark'
          ? 'text-dark-destructive-foreground'
          : 'text-white'
        : variant === 'secondary'
          ? mode === 'dark'
            ? 'text-dark-secondary-foreground'
            : 'text-secondary-foreground'
          : variant === 'outline'
            ? mode === 'dark'
              ? 'text-dark-accent-foreground'
              : 'text-accent-foreground'
            : variant === 'link'
              ? mode === 'dark'
                ? 'text-primary-foreground underline-offset-4 underline'
                : 'text-dark-primary-foreground underline-offset-4 underline'
              : variant === 'ghost'
                ? mode === 'dark'
                  ? 'text-dark-accent-foreground'
                  : 'text-accent-foreground'
                : mode === 'dark'
                  ? 'text-dark-primary-foreground'
                  : 'text-primary-foreground',
    textClassName
  );

  const isIconButton = size === 'icon';

  // Get icon color based on variant and mode
  const getIconColor = () => {
    if (variant === 'default' || variant === 'destructive') {
      return '#FFFFFF';
    }
    if (variant === 'secondary') {
      return mode === 'dark' ? '#FFFFFF' : '#000000';
    }
    if (variant === 'link') {
      return '#2563EB';
    }
    return mode === 'dark' ? '#FFFFFF' : '#000000';
  };

  return (
    <Pressable
      {...props}
      disabled={disabled}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      android_ripple={variant !== 'link' ? { color: 'rgba(0, 0, 0, 0.1)' } : null}
      className={containerClasses}
      style={[style, isPressed && !buttonClassNames.pressed[variant] && { opacity: 0.95 }]}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && (child.type === 'svg' || child.props.svg)) {
          return React.cloneElement(child, {
            ...child.props,
            size: isIconButton ? 20 : 16,
            color: child.props.color || getIconColor(),
            className: cn(isIconButton ? 'w-5 h-5' : 'w-4 h-4 shrink-0', child.props.className),
          });
        } else if (typeof child === 'string' || typeof child === 'number') {
          return <Text className={textClasses}>{child}</Text>;
        }
        return child;
      })}
    </Pressable>
  );
};

export default Button;
