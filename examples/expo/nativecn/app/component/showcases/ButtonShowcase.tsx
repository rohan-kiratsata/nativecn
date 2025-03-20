import React from 'react';
import { View, Text, Alert } from 'react-native';
import { useTheme } from '../../../lib/ThemeContext';
import Button from '../../../components/ui/button';
import { Feather } from '@expo/vector-icons';

// Create an SVG-like wrapper for Feather icons so they work with our Button component
interface IconProps {
  name: React.ComponentProps<typeof Feather>['name'];
  className?: string;
  size?: number;
  color?: string;
  [key: string]: any;
}

const Icon: React.FC<IconProps> = ({ name, className = '', size, color, ...props }) => {
  // This property tells our Button component to treat this as an SVG
  const svg = true;

  return (
    <Feather name={name} svg={svg} className={className} size={size} color={color} {...props} />
  );
};

const ButtonShowcase: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const mode = isDark ? 'dark' : 'light';

  const showAlert = (message: string) => {
    Alert.alert('Button Pressed', message);
  };

  return (
    <View>
      {/* Standard Button Variations */}
      <Text
        className={`text-xl mb-4 font-bold ${isDark ? 'text-dark-foreground' : 'text-foreground'}`}
      >
        Button Variants
      </Text>

      <Button mode={mode} variant="default" onPress={() => showAlert('Default button pressed!')}>
        Default Button
      </Button>

      <Button
        mode={mode}
        variant="destructive"
        size="lg"
        className="mt-4"
        onPress={() => showAlert('Destructive button pressed!')}
      >
        Destructive Button
      </Button>

      <Button
        mode={mode}
        variant="outline"
        size="sm"
        className="mt-4"
        onPress={() => showAlert('Outline button pressed!')}
      >
        Outline Button
      </Button>

      <Button
        mode={mode}
        variant="secondary"
        className="mt-4"
        onPress={() => showAlert('Secondary button pressed!')}
      >
        Secondary Button
      </Button>

      <Button
        mode={mode}
        variant="ghost"
        className="mt-4"
        onPress={() => showAlert('Ghost button pressed!')}
      >
        Ghost Button
      </Button>

      <Button
        mode={mode}
        variant="link"
        className="mt-4"
        onPress={() => showAlert('Link button pressed!')}
      >
        Link Button
      </Button>

      {/* Icon Buttons */}
      <Text
        className={`text-xl mt-8 mb-4 font-bold ${
          isDark ? 'text-dark-foreground' : 'text-foreground'
        }`}
      >
        Icon Buttons
      </Text>

      <View className="flex-row flex-wrap justify-center items-center gap-4 w-full">
        <Button
          mode={mode}
          variant="default"
          size="icon"
          onPress={() => showAlert('Search button pressed!')}
        >
          <Icon name="search" color={isDark ? 'black' : 'white'} />
        </Button>

        <Button
          mode={mode}
          variant="destructive"
          size="icon"
          onPress={() => showAlert('Delete button pressed!')}
        >
          <Icon name="trash-2" color={isDark ? 'white' : 'black'} />
        </Button>

        <Button
          mode={mode}
          variant="outline"
          size="icon"
          onPress={() => showAlert('Settings button pressed!')}
        >
          <Icon name="settings" color={isDark ? 'white' : 'black'} />
        </Button>

        <Button
          mode={mode}
          variant="secondary"
          size="icon"
          onPress={() => showAlert('Menu button pressed!')}
        >
          <Icon name="menu" color={isDark ? 'white' : 'black'} />
        </Button>

        <Button
          mode={mode}
          variant="ghost"
          size="icon"
          onPress={() => showAlert('Heart button pressed!')}
        >
          <Icon name="heart" color={isDark ? 'white' : 'black'} />
        </Button>
      </View>

      {/* Combined Icon & Text Buttons */}
      <Text
        className={`text-xl mt-8 mb-4 font-bold ${
          isDark ? 'text-dark-foreground' : 'text-foreground'
        }`}
      >
        Combined Icon & Text Buttons
      </Text>

      <Button
        mode={mode}
        variant="default"
        className="mt-2"
        onPress={() => showAlert('Save button pressed!')}
      >
        <Icon name="save" color={isDark ? 'black' : 'white'} />
        Save
      </Button>

      <Button
        mode={mode}
        variant="outline"
        className="mt-4"
        onPress={() => showAlert('Edit button pressed!')}
      >
        <Icon name="edit" color={isDark ? 'white' : 'black'} />
        Edit
      </Button>

      {/* Button Sizes */}
      <Text
        className={`text-xl mt-8 mb-4 font-bold ${
          isDark ? 'text-dark-foreground' : 'text-foreground'
        }`}
      >
        Button Sizes
      </Text>

      <Button
        mode={mode}
        variant="default"
        size="sm"
        className="mb-2"
        onPress={() => showAlert('Small button pressed!')}
      >
        Small Button
      </Button>

      <Button
        mode={mode}
        variant="default"
        className="mb-2"
        onPress={() => showAlert('Default size button pressed!')}
      >
        Default Button
      </Button>

      <Button
        mode={mode}
        variant="default"
        size="lg"
        onPress={() => showAlert('Large button pressed!')}
      >
        Large Button
      </Button>
    </View>
  );
};

export default ButtonShowcase;
