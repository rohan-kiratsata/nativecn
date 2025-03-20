import React from 'react';
import { View, Text, Alert } from 'react-native';
import { useTheme } from '../../../lib/ThemeContext';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '../../../components/ui/breadcrumb';
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

const BreadcrumbShowcase: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const mode = isDark ? 'dark' : 'light';
  const handlePress = (section: string) => {
    Alert.alert('Navigation', `Navigating to ${section}`);
  };

  return (
    <View>
      {/* Basic Breadcrumb */}
      <Text
        className={`text-xl mb-4 font-bold ${isDark ? 'text-dark-foreground' : 'text-foreground'}`}
      >
        Default Breadcrumb
      </Text>

      <Breadcrumb className="mb-6">
        <BreadcrumbList mode={mode}>
          <BreadcrumbItem>
            <BreadcrumbLink onPress={() => handlePress('Home')} mode={mode}>
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator mode={mode} />
          <BreadcrumbItem>
            <BreadcrumbLink onPress={() => handlePress('Components')} mode={mode}>
              Components
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator mode={mode} />
          <BreadcrumbItem>
            <BreadcrumbPage mode={mode}>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Breadcrumb with Icons */}
      <Text
        className={`text-xl mb-4 font-bold ${isDark ? 'text-dark-foreground' : 'text-foreground'}`}
      >
        Breadcrumb with Icons
      </Text>

      <Breadcrumb className="mb-6">
        <BreadcrumbList mode={mode}>
          <BreadcrumbItem>
            <BreadcrumbLink onPress={() => handlePress('Home')} mode={mode}>
              <View className="flex-row items-center gap-1">
                <Icon name="home" size={14} color={isDark ? '#9CA3AF' : '#6B7280'} />
                <Text
                  className={`text-sm ${
                    isDark ? 'text-dark-muted-foreground' : 'text-muted-foreground'
                  }`}
                >
                  Home
                </Text>
              </View>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator mode={mode} />
          <BreadcrumbItem>
            <BreadcrumbLink onPress={() => handlePress('Settings')} mode={mode}>
              <View className="flex-row items-center gap-1">
                <Icon name="settings" size={14} color={isDark ? '#9CA3AF' : '#6B7280'} />
                <Text
                  className={`text-sm ${
                    isDark ? 'text-dark-muted-foreground' : 'text-muted-foreground'
                  }`}
                >
                  Settings
                </Text>
              </View>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator mode={mode} />
          <BreadcrumbItem>
            <BreadcrumbPage mode={mode}>
              <View className="flex-row items-center gap-1">
                <Icon name="user" size={14} color={isDark ? '#E5E7EB' : '#111827'} />
                <Text className={isDark ? 'text-dark-foreground' : 'text-foreground'}>Profile</Text>
              </View>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Breadcrumb with Ellipsis */}
      <Text
        className={`text-xl mb-4 font-bold ${isDark ? 'text-dark-foreground' : 'text-foreground'}`}
      >
        Breadcrumb with Ellipsis
      </Text>

      <Breadcrumb className="mb-6">
        <BreadcrumbList mode={mode}>
          <BreadcrumbItem>
            <BreadcrumbLink onPress={() => handlePress('Home')} mode={mode}>
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator mode={mode} />
          <BreadcrumbItem>
            <BreadcrumbEllipsis mode={mode} />
          </BreadcrumbItem>
          <BreadcrumbSeparator mode={mode} />
          <BreadcrumbItem>
            <BreadcrumbLink onPress={() => handlePress('Products')} mode={mode}>
              Products
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator mode={mode} />
          <BreadcrumbItem>
            <BreadcrumbLink onPress={() => handlePress('Categories')} mode={mode}>
              Categories
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator mode={mode} />
          <BreadcrumbItem>
            <BreadcrumbPage mode={mode}>Electronics</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Breadcrumb with Custom Separator */}
      <Text
        className={`text-xl mb-4 font-bold ${isDark ? 'text-dark-foreground' : 'text-foreground'}`}
      >
        Breadcrumb with Custom Separator
      </Text>

      <Breadcrumb className="mb-6">
        <BreadcrumbList mode={mode}>
          <BreadcrumbItem>
            <BreadcrumbLink onPress={() => handlePress('Dashboard')} mode={mode}>
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator mode={mode}>
            <Text className={isDark ? 'text-dark-muted-foreground' : 'text-muted-foreground'}>
              /
            </Text>
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink onPress={() => handlePress('Analytics')} mode={mode}>
              Analytics
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator mode={mode}>
            <Text className={isDark ? 'text-dark-muted-foreground' : 'text-muted-foreground'}>
              /
            </Text>
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage mode={mode}>Revenue</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Styled Breadcrumb */}
      <Text
        className={`text-xl mb-4 font-bold ${isDark ? 'text-dark-foreground' : 'text-foreground'}`}
      >
        Styled Breadcrumb
      </Text>

      <Breadcrumb className="mb-6">
        <BreadcrumbList
          mode={mode}
          className={`p-2 ${isDark ? 'bg-dark-accent' : 'bg-accent'} rounded-md`}
        >
          <BreadcrumbItem>
            <BreadcrumbLink
              onPress={() => handlePress('Home')}
              textClassName="font-medium"
              mode={mode}
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator mode={mode}>
            <Icon name="arrow-right" size={12} color={isDark ? '#9CA3AF' : '#6B7280'} />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink
              onPress={() => handlePress('Blog')}
              textClassName="font-medium"
              mode={mode}
            >
              Blog
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator mode={mode}>
            <Icon name="arrow-right" size={12} color={isDark ? '#9CA3AF' : '#6B7280'} />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage mode={mode} className="font-bold">
              Current Article
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </View>
  );
};

export default BreadcrumbShowcase;
