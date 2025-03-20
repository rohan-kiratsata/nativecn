import React from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { useTheme } from '../../../lib/ThemeContext';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '../../../components/ui/card';
import Button from '../../../components/ui/button';
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

const Icon: React.FC<IconProps> = ({ name, className = '', size = 16, color, ...props }) => {
  // This property tells our components to treat this as an SVG
  const svg = true;

  return (
    <Feather name={name} svg={svg} className={className} size={size} color={color} {...props} />
  );
};

const CardShowcase: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const mode = isDark ? 'dark' : 'light';

  const handlePress = (action: string) => {
    Alert.alert('Action', `${action} was pressed`);
  };

  return (
    <View>
      {/* Basic Card */}
      <Text
        className={`text-xl mb-4 font-bold ${isDark ? 'text-dark-foreground' : 'text-foreground'}`}
      >
        Basic Card
      </Text>

      <Card mode={mode} className="mb-8">
        <CardHeader>
          <CardTitle mode={mode}>Card Title</CardTitle>
          <CardDescription mode={mode}>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <Text className={isDark ? 'text-dark-card-foreground' : 'text-card-foreground'}>
            Card content goes here. This is a basic card component that can be used to display a
            variety of content and information.
          </Text>
        </CardContent>
        <CardFooter>
          <Text
            className={`text-xs ${isDark ? 'text-dark-muted-foreground' : 'text-muted-foreground'}`}
          >
            Card Footer
          </Text>
        </CardFooter>
      </Card>

      {/* Card with Actions */}
      <Text
        className={`text-xl mb-4 font-bold ${isDark ? 'text-dark-foreground' : 'text-foreground'}`}
      >
        Card with Actions
      </Text>

      <Card mode={mode} className="mb-8">
        <CardHeader>
          <CardTitle mode={mode}>Notification Settings</CardTitle>
          <CardDescription mode={mode}>
            Configure how you want to receive notifications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <View className="gap-4">
            <View className="flex-row items-center justify-between">
              <Text className={isDark ? 'text-dark-card-foreground' : 'text-card-foreground'}>
                Push Notifications
              </Text>
              <Badge variant="outline" mode={mode}>
                Enabled
              </Badge>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className={isDark ? 'text-dark-card-foreground' : 'text-card-foreground'}>
                Email Notifications
              </Text>
              <Badge variant="outline" mode={mode}>
                Disabled
              </Badge>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className={isDark ? 'text-dark-card-foreground' : 'text-card-foreground'}>
                SMS Notifications
              </Text>
              <Badge variant="outline" mode={mode}>
                Disabled
              </Badge>
            </View>
          </View>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="outline" onPress={() => handlePress('Cancel')} mode={mode}>
            Cancel
          </Button>
          <Button onPress={() => handlePress('Save')} mode={mode}>
            Save Changes
          </Button>
        </CardFooter>
      </Card>

      {/* Card with Image */}
      <Text
        className={`text-xl mb-4 font-bold ${isDark ? 'text-dark-foreground' : 'text-foreground'}`}
      >
        Card with Image
      </Text>

      <Card mode={mode} className="mb-8 overflow-hidden p-0">
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000',
          }}
          className="w-full h-48"
          resizeMode="cover"
        />
        <View className="py-4">
          <CardHeader>
            <CardTitle mode={mode}>City Skyline</CardTitle>
            <CardDescription mode={mode}>Exploring urban landscapes</CardDescription>
          </CardHeader>
          <CardContent>
            <Text className={isDark ? 'text-dark-card-foreground' : 'text-card-foreground'}>
              Explore the beautiful urban landscapes and architecture. This image captures the
              essence of modern city life.
            </Text>
          </CardContent>
          <CardFooter className="justify-between">
            <View className="flex-row items-center">
              <Icon name="eye" size={14} color={isDark ? '#9CA3AF' : '#6B7280'} />
              <Text
                className={`ml-1 text-xs ${
                  isDark ? 'text-dark-muted-foreground' : 'text-muted-foreground'
                }`}
              >
                4.2K views
              </Text>
            </View>
            <Button
              variant="ghost"
              size="sm"
              onPress={() => handlePress('View')}
              className="gap-1"
              mode={mode}
            >
              <Icon name="bookmark" size={14} color={isDark ? '#E5E7EB' : '#111827'} />
              Save
            </Button>
          </CardFooter>
        </View>
      </Card>

      {/* Styled Card */}
      <Text
        className={`text-xl mb-4 font-bold ${isDark ? 'text-dark-foreground' : 'text-foreground'}`}
      >
        Styled Card
      </Text>

      <Card mode={mode} className="mb-8 bg-gradient-to-r from-blue-500 to-purple-500 border-0">
        <CardHeader>
          <CardTitle mode={mode}>Premium Plan</CardTitle>
          <CardDescription mode={mode}>Unlock all premium features</CardDescription>
        </CardHeader>
        <CardContent>
          <View className="gap-2">
            <View className="flex-row items-center">
              <Icon name="check" size={16} color={isDark ? '#FFFFFF' : '#000000'} />
              <Text className={`ml-2 ${isDark ? 'text-dark-foreground' : 'text-foreground'}`}>
                Unlimited access
              </Text>
            </View>
            <View className="flex-row items-center">
              <Icon name="check" size={16} color={isDark ? '#FFFFFF' : '#000000'} />
              <Text className={`ml-2 ${isDark ? 'text-dark-foreground' : 'text-foreground'}`}>
                Priority support
              </Text>
            </View>
            <View className="flex-row items-center">
              <Icon name="check" size={16} color={isDark ? '#FFFFFF' : '#000000'} />
              <Text className={`ml-2 ${isDark ? 'text-dark-foreground' : 'text-foreground'}`}>
                Ad-free experience
              </Text>
            </View>
            <View className="flex-row items-center">
              <Icon name="check" size={16} color={isDark ? '#FFFFFF' : '#000000'} />
              <Text className={`ml-2 ${isDark ? 'text-dark-foreground' : 'text-foreground'}`}>
                Custom themes
              </Text>
            </View>
          </View>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-white"
            textClassName="font-bold text-blue-600"
            onPress={() => handlePress('Subscribe')}
            mode={mode}
          >
            Subscribe Now
          </Button>
        </CardFooter>
      </Card>

      {/* Interactive Card */}
      <Text
        className={`text-xl mb-4 font-bold ${isDark ? 'text-dark-foreground' : 'text-foreground'}`}
      >
        Interactive Card
      </Text>

      <Card
        mode={mode}
        className="mb-8 border-blue-300 dark:border-blue-700"
        onStartShouldSetResponder={() => true}
        onResponderGrant={() => handlePress('Card Pressed')}
      >
        <CardHeader className="items-center">
          <View
            className={`w-12 h-12 rounded-full ${
              isDark ? 'bg-dark-accent' : 'bg-accent'
            } items-center justify-center mb-2`}
          >
            <Icon name="bell" size={24} color={isDark ? '#E5E7EB' : '#111827'} />
          </View>
          <CardTitle mode={mode}>Tap Me</CardTitle>
          <CardDescription mode={mode} className="text-center">
            This entire card is interactive
          </CardDescription>
        </CardHeader>
        <CardContent className="items-center">
          <Text
            className={`text-center ${
              isDark ? 'text-dark-card-foreground' : 'text-card-foreground'
            }`}
          >
            Tap anywhere on this card to trigger an action. This is useful for making the entire
            card clickable.
          </Text>
        </CardContent>
        <CardFooter className="justify-center">
          <Icon name="chevron-right" size={20} color={isDark ? '#9CA3AF' : '#6B7280'} />
        </CardFooter>
      </Card>
    </View>
  );
};

export default CardShowcase;
