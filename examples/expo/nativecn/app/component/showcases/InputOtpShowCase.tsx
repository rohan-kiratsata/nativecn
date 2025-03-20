import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { OTPInput } from '../../../components/ui';
import { useTheme } from '../../../lib/ThemeContext';

export default function OTPInputShowCase() {
  const [otpBasic, setOtpBasic] = useState('');
  const [otpWithSeparator, setOtpWithSeparator] = useState('');
  const [otpSecure, setOtpSecure] = useState('');
  const [otpDisabled, setOtpDisabled] = useState('');
  const [otpCustomLength, setOtpCustomLength] = useState('');

  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const mode = isDark ? 'dark' : 'light';

  return (
    <ScrollView className="flex-1 px-4 py-6">
      {/* Basic OTP Input */}
      <View className="mb-6">
        <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
          1) Basic OTP Input
        </Text>
        <Text className="text-sm text-muted-foreground mb-2 mt-2">
          Enter your OTP without any extra formatting.
        </Text>
        <OTPInput className="mt-6" value={otpBasic} mode={mode} onChange={setOtpBasic} />
      </View>

      {/* OTP with Separator */}
      <View className="mb-6">
        <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
          2) OTP Input with Separator
        </Text>
        <Text className="text-sm text-muted-foreground mb-2 mt-2">
          Adds spacing between OTP boxes for clarity.
        </Text>
        <OTPInput
          className="mt-6"
          value={otpWithSeparator}
          mode={mode}
          separator
          onChange={setOtpWithSeparator}
        />
      </View>

      {/* Secure OTP Input */}
      <View className="mb-6">
        <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
          3) Secure OTP Input
        </Text>
        <Text className="text-sm text-muted-foreground mb-2 mt-2">
          Hides the entered digits for privacy.
        </Text>
        <OTPInput className="mt-6" value={otpSecure} mode={mode} mask onChange={setOtpSecure} />
      </View>

      {/* Disabled OTP Input */}
      <View className="mb-6">
        <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
          4) Disabled OTP Input
        </Text>
        <Text className="text-sm text-muted-foreground mb-2 mt-2">
          A read-only OTP input field.
        </Text>
        <OTPInput
          className="mt-6"
          value={otpDisabled}
          mode={mode}
          disabled
          onChange={setOtpDisabled}
        />
      </View>

      {/* Custom Length OTP Input */}
      <View className="mb-6">
        <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
          5) Custom Length OTP Input (4 Digits)
        </Text>
        <Text className="text-sm text-muted-foreground mb-2 mt-2">
          Accepts a 4-digit OTP instead of the default length.
        </Text>
        <OTPInput
          className="mt-6"
          value={otpCustomLength}
          mode={mode}
          length={4}
          onChange={setOtpCustomLength}
        />
      </View>
    </ScrollView>
  );
}
