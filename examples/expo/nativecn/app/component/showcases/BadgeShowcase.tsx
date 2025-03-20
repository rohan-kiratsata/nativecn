import React from 'react';
import { View, Text, Alert } from 'react-native';
import { useTheme } from '../../../lib/ThemeContext';
import Badge from '../../../components/ui/badge';
import { Feather } from '@expo/vector-icons';

// Create an SVG-like wrapper for Feather icons
interface IconProps {
  name: React.ComponentProps<typeof Feather>['name'];
  className?: string;
  size?: number;
  color?: string;
  [key: string]: any;
}

const Icon: React.FC<IconProps> = ({
  name,
  className = '',
  size = 12, // Smaller default size for badges
  color,
  ...props
}) => {
  // This property tells our component to treat this as an SVG
  const svg = true;

  return (
    <Feather name={name} svg={svg} className={className} size={size} color={color} {...props} />
  );
};

const BadgeShowcase: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const mode = isDark ? 'dark' : 'light';
  const showAlert = (message: string) => {
    Alert.alert('Badge Pressed', message);
  };

  return (
    <View>
      {/* Standard Badge Variations */}
      <Text
        className={`text-xl mb-4 font-bold ${isDark ? 'text-dark-foreground' : 'text-foreground'}`}
      >
        Badge Variants
      </Text>

      <View className="flex-row flex-wrap gap-2 mb-6">
        <Badge mode={mode} variant="default">
          Default
        </Badge>

        <Badge mode={mode} variant="secondary">
          Secondary
        </Badge>

        <Badge mode={mode} variant="destructive">
          Destructive
        </Badge>

        <Badge mode={mode} variant="outline">
          Outline
        </Badge>
      </View>

      {/* Interactive Badges */}
      <Text
        className={`text-xl mb-4 font-bold ${isDark ? 'text-dark-foreground' : 'text-foreground'}`}
      >
        Interactive Badges
      </Text>

      <View className="flex-row flex-wrap gap-2 mb-6">
        <Badge
          mode={mode}
          variant="default"
          interactive
          onPress={() => showAlert('Default badge pressed!')}
        >
          Interactive
        </Badge>

        <Badge
          mode={mode}
          variant="secondary"
          interactive
          onPress={() => showAlert('Secondary badge pressed!')}
        >
          Interactive
        </Badge>

        <Badge
          mode={mode}
          variant="destructive"
          interactive
          onPress={() => showAlert('Destructive badge pressed!')}
        >
          Interactive
        </Badge>

        <Badge
          mode={mode}
          variant="outline"
          interactive
          onPress={() => showAlert('Outline badge pressed!')}
        >
          Interactive
        </Badge>
      </View>

      {/* Badges with Icons */}
      <Text
        className={`text-xl mb-4 font-bold ${isDark ? 'text-dark-foreground' : 'text-foreground'}`}
      >
        Badges with Icons
      </Text>

      <View className="flex-row flex-wrap gap-2 mb-6">
        <Badge mode={mode} variant="default" className="flex-row gap-1 items-center">
          <Icon name="check" color={isDark ? 'black' : 'white'} />
          <Text
            className={`text-xs font-semibold ${
              isDark ? 'text-dark-primary-foreground' : 'text-primary-foreground'
            }`}
          >
            Completed
          </Text>
        </Badge>

        <Badge mode={mode} variant="secondary" className="flex-row gap-1 items-center">
          <Icon name="clock" color={isDark ? 'white' : 'black'} />
          <Text
            className={`text-xs font-semibold ${
              isDark ? 'text-dark-secondary-foreground' : 'text-secondary-foreground'
            }`}
          >
            Pending
          </Text>
        </Badge>

        <Badge mode={mode} variant="destructive" className="flex-row gap-1 items-center">
          <Icon name="alert-triangle" color="white" />
          <Text className={`text-xs font-semibold text-white`}>Error</Text>
        </Badge>

        <Badge mode={mode} variant="outline" className="flex-row gap-1 items-center">
          <Icon name="info" color={isDark ? 'white' : 'black'} />
          <Text
            className={`text-xs font-semibold ${
              isDark ? 'text-dark-foreground' : 'text-foreground'
            }`}
          >
            Info
          </Text>
        </Badge>
      </View>

      {/* Custom Styled Badges */}
      <Text
        className={`text-xl mb-4 font-bold ${isDark ? 'text-dark-foreground' : 'text-foreground'}`}
      >
        Custom Styled Badges
      </Text>

      <View className="flex-row flex-wrap gap-2 mb-6">
        <Badge mode={mode} variant="default" className="bg-blue-600 border-blue-600">
          Custom Blue
        </Badge>

        <Badge mode={mode} variant="default" className="bg-green-600 border-green-600">
          Custom Green
        </Badge>

        <Badge mode={mode} variant="default" className="bg-purple-600 border-purple-600">
          Custom Purple
        </Badge>

        <Badge mode={mode} variant="default" className="bg-yellow-600 border-yellow-600 text-black">
          Custom Yellow
        </Badge>

        <Badge
          mode={mode}
          variant="outline"
          className="border-blue-600"
          textClassName="text-blue-600"
        >
          Custom Outline
        </Badge>
      </View>

      {/* Badge Sizes */}
      <Text
        className={`text-xl mb-4 font-bold ${isDark ? 'text-dark-foreground' : 'text-foreground'}`}
      >
        Badge Sizes
      </Text>

      <View className="flex-row flex-wrap items-center gap-2 mb-6">
        <Badge mode={mode} variant="default" className="px-1.5 py-0" textClassName="text-[10px]">
          Smaller
        </Badge>

        <Badge mode={mode} variant="default">
          Default
        </Badge>

        <Badge mode={mode} variant="default" className="px-3 py-1" textClassName="text-sm">
          Larger
        </Badge>
      </View>
    </View>
  );
};

export default BadgeShowcase;
