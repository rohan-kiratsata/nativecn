import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { OTPInput } from '../../../components/ui';
import { useTheme } from '../../../lib/ThemeContext';

export default function OTPInputShowCase() {
  const [otpBasic, setOtpBasic] = useState('');
  const [otpWithSeparator, setOtpWithSeparator] = useState('');
  const [otpSecure, setOtpSecure] = useState('');
  const [otpWithTimer, setOtpWithTimer] = useState('');
  const [otpWithResend, setOtpWithResend] = useState('');
  const [otpWithError, setOtpWithError] = useState('');
  const [otpCustomLength, setOtpCustomLength] = useState('');

  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const mode = isDark ? 'dark' : 'light';

  const handleResend = () => {
    // Simulate resend functionality
    console.log('Resending code...');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView className="flex-1 px-4 py-6">
        {/* Basic OTP Input */}
        <View className="mb-8">
          <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
            1) Basic OTP Input
          </Text>
          <Text className="text-sm text-muted-foreground mb-2 mt-2">
            Basic OTP input with clipboard support and auto-focus.
          </Text>
          <OTPInput
            className="mt-4"
            value={otpBasic}
            mode={mode}
            onChange={setOtpBasic}
            shouldHandleClipboard
            autoFocus
          />
        </View>

        {/* OTP with Separator */}
        <View className="mb-8">
          <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
            2) OTP with Separator
          </Text>
          <Text className="text-sm text-muted-foreground mb-2 mt-2">
            OTP input with visual separator and auto-submit.
          </Text>
          <OTPInput
            className="mt-4"
            value={otpWithSeparator}
            mode={mode}
            separator
            shouldAutoSubmit
            onComplete={code => console.log('Completed:', code)}
            onChange={setOtpWithSeparator}
          />
        </View>

        {/* Secure OTP Input */}
        <View className="mb-8">
          <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
            3) Secure OTP Input
          </Text>
          <Text className="text-sm text-muted-foreground mb-2 mt-2">
            Masked input with validation for numeric characters only.
          </Text>
          <OTPInput
            className="mt-4"
            value={otpSecure}
            mode={mode}
            mask
            keyboard="numeric"
            allowedChars="0123456789"
            onChange={setOtpSecure}
          />
        </View>

        {/* OTP with Timer */}
        <View className="mb-8">
          <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
            4) OTP with Expiry Timer
          </Text>
          <Text className="text-sm text-muted-foreground mb-2 mt-2">
            OTP input with expiration countdown.
          </Text>
          <OTPInput
            className="mt-4"
            value={otpWithTimer}
            mode={mode}
            expiresIn={120} // 2 minutes
            showExpiryTimer
            onExpire={() => console.log('Code expired')}
            onChange={setOtpWithTimer}
          />
        </View>

        {/* OTP with Resend */}
        <View className="mb-8">
          <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
            5) OTP with Resend
          </Text>
          <Text className="text-sm text-muted-foreground mb-2 mt-2">
            OTP input with resend functionality and cooldown.
          </Text>
          <OTPInput
            className="mt-4"
            value={otpWithResend}
            mode={mode}
            onResend={handleResend}
            resendCooldown={30}
            maxResendAttempts={3}
            onChange={setOtpWithResend}
          />
        </View>

        {/* OTP with Error */}
        <View className="mb-8">
          <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
            6) OTP with Error State
          </Text>
          <Text className="text-sm text-muted-foreground mb-2 mt-2">
            OTP input showing error state and message.
          </Text>
          <OTPInput
            className="mt-4"
            value={otpWithError}
            mode={mode}
            error="Invalid verification code"
            onChange={setOtpWithError}
          />
        </View>

        {/* Custom Length OTP */}
        <View className="mb-8">
          <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
            7) Custom Length OTP (4 Digits)
          </Text>
          <Text className="text-sm text-muted-foreground mb-2 mt-2">
            4-digit OTP with animations.
          </Text>
          <OTPInput
            className="mt-4"
            value={otpCustomLength}
            mode={mode}
            length={4}
            animate
            animationDuration={200}
            onChange={setOtpCustomLength}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
