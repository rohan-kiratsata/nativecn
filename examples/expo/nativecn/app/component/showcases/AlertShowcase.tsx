import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../../lib/ThemeContext';
import { Feather } from '@expo/vector-icons';
import { Alert, AlertTitle, AlertDescription } from '../../../components/ui/alert';

const AlertShowcase: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const mode = theme;

  return (
    <View>
      {/* Default Alert */}
      <View className="mb-6 w-full">
        <Text
          className={`text-base mb-2 ${
            isDark ? 'text-dark-muted-foreground' : 'text-muted-foreground'
          }`}
        >
          Default
        </Text>
        <Alert mode={mode}>
          <AlertTitle mode={mode}>Information</AlertTitle>
          <AlertDescription mode={mode}>
            This is a default alert providing information to the user.
          </AlertDescription>
        </Alert>
      </View>

      {/* Alert with Icon */}
      <View className="mb-6 w-full">
        <Text
          className={`text-base mb-2 ${
            isDark ? 'text-dark-muted-foreground' : 'text-muted-foreground'
          }`}
        >
          With Icon
        </Text>
        <Alert mode={mode} icon="info">
          <AlertTitle mode={mode}>Note</AlertTitle>
          <AlertDescription mode={mode}>
            This alert uses an icon to draw more attention and provide additional context.
          </AlertDescription>
        </Alert>
      </View>

      {/* Destructive Alert */}
      <View className="mb-6 w-full">
        <Text
          className={`text-base mb-2 ${
            isDark ? 'text-dark-muted-foreground' : 'text-muted-foreground'
          }`}
        >
          Destructive
        </Text>
        <Alert mode={mode} variant="destructive">
          <AlertTitle mode={mode}>Warning</AlertTitle>
          <AlertDescription mode={mode}>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </AlertDescription>
        </Alert>
      </View>

      {/* Destructive Alert with Icon */}
      <View className="mb-6 w-full">
        <Text
          className={`text-base mb-2 ${
            isDark ? 'text-dark-muted-foreground' : 'text-muted-foreground'
          }`}
        >
          Destructive with Icon
        </Text>
        <Alert mode={mode} variant="destructive" icon="alert-triangle">
          <AlertTitle mode={mode}>Error</AlertTitle>
          <AlertDescription mode={mode}>
            Your session has expired. Please log in again to continue using the application.
          </AlertDescription>
        </Alert>
      </View>

      {/* Custom Styled Alert */}
      <View className="mb-6 w-full">
        <Text
          className={`text-base mb-2 ${
            isDark ? 'text-dark-muted-foreground' : 'text-muted-foreground'
          }`}
        >
          Custom Styling
        </Text>
        <Alert
          mode={mode}
          className={
            !isDark ? 'bg-dark-primary/20 border-dark-primary' : 'bg-primary/20 border-primary'
          }
          icon="check-circle"
        >
          <AlertTitle mode={mode}>Success</AlertTitle>
          <AlertDescription mode={mode}>
            Your changes have been successfully saved. The new settings will take effect
            immediately.
          </AlertDescription>
        </Alert>
      </View>

      {/* Alert with Complex Content */}
      <View className="mb-6 w-full">
        <Text
          className={`text-base mb-2 ${
            isDark ? 'text-dark-muted-foreground' : 'text-muted-foreground'
          }`}
        >
          Complex Content
        </Text>
        <Alert mode={mode} icon="bell">
          <AlertTitle mode={mode}>Notification</AlertTitle>
          <AlertDescription mode={mode}>
            <Text>You have a new message from the system.</Text>

            <View className={`mt-2 mb-2 p-2 rounded-md ${isDark ? 'bg-dark-accent' : 'bg-accent'}`}>
              <Text className={isDark ? 'text-dark-foreground' : 'text-foreground'}>
                System maintenance will be performed tomorrow at 2:00 AM UTC.
              </Text>
            </View>

            <View className="flex-row items-center gap-2 mt-1">
              <Feather name="clock" size={14} color={isDark ? '#FFFFFF88' : '#00000088'} />
              <Text
                className={
                  isDark ? 'text-dark-muted-foreground text-xs' : 'text-muted-foreground text-xs'
                }
              >
                Received 5 minutes ago
              </Text>
            </View>
          </AlertDescription>
        </Alert>
      </View>
    </View>
  );
};

export default AlertShowcase;
