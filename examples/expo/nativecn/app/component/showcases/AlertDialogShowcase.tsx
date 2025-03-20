import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../../lib/ThemeContext';
import Button from '../../../components/ui/button';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '../../../components/ui/alertdialog';

const AlertDialogShowcase: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const mode = isDark ? 'dark' : 'light';
  const [basicOpen, setBasicOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);

  return (
    <View>
      {/* Basic Alert Dialog */}
      <View className="mb-6 w-full">
        <Text
          className={`text-base mb-2 ${
            isDark ? 'text-dark-muted-foreground' : 'text-muted-foreground'
          }`}
        >
          Basic
        </Text>
        <View className="mb-3">
          <AlertDialog mode={mode} open={basicOpen} onOpenChange={setBasicOpen}>
            <AlertDialogTrigger asChild>
              <Button mode={mode} className="w-full">
                Show Alert Dialog
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove
                  your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </View>
        <Text className={isDark ? 'text-dark-foreground' : 'text-foreground'}>
          Alert dialogs interrupt users with a mandatory confirmation or action.
        </Text>
      </View>

      {/* Custom Alert Dialog */}
      <View className="mb-6 w-full">
        <Text
          className={`text-base mb-2 ${
            isDark ? 'text-dark-muted-foreground' : 'text-muted-foreground'
          }`}
        >
          Destructive Action
        </Text>
        <View className="mb-3">
          <AlertDialog mode={mode} open={customOpen} onOpenChange={setCustomOpen}>
            <AlertDialogTrigger asChild>
              <Button mode={mode} variant="destructive" className="w-full">
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Account</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete your account and all of your data. This action cannot
                  be undone. Are you sure you want to delete your account?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>No, keep my account</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive">
                  Yes, delete my account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </View>
        <Text className={isDark ? 'text-dark-foreground' : 'text-foreground'}>
          Alert dialogs can be styled to represent destructive actions.
        </Text>
      </View>

      {/* Alert Dialog with Custom Content */}
      <View className="mb-6 w-full">
        <Text
          className={`text-base mb-2 ${
            isDark ? 'text-dark-muted-foreground' : 'text-muted-foreground'
          }`}
        >
          Custom Dialog
        </Text>
        <View className="mb-3">
          <AlertDialog mode={mode}>
            <AlertDialogTrigger asChild>
              <Button mode={mode} variant="outline" className="w-full">
                Open Custom Dialog
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className={isDark ? 'bg-dark-card' : 'bg-card'}>
              <AlertDialogHeader>
                <View
                  className={`h-12 w-12 rounded-full items-center justify-center mb-2 ${
                    isDark ? 'bg-dark-primary' : 'bg-primary'
                  }`}
                >
                  <Text className="text-white text-lg">🔔</Text>
                </View>
                <AlertDialogTitle>Notification Settings</AlertDialogTitle>
                <AlertDialogDescription>
                  Would you like to enable push notifications for this application? You can always
                  change this later in your device settings.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Not now</AlertDialogCancel>
                <AlertDialogAction className={isDark ? 'bg-dark-primary' : 'bg-primary'}>
                  Enable notifications
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </View>
        <Text className={isDark ? 'text-dark-foreground' : 'text-foreground'}>
          Alert dialogs can be customized with additional content.
        </Text>
      </View>
    </View>
  );
};

export default AlertDialogShowcase;
