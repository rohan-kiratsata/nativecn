import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../lib/ThemeContext';

interface ComponentCardProps {
  name: string;
  description: string;
  icon: React.ComponentProps<typeof Feather>['name'];
  slug: string;
}

const ComponentCard: React.FC<ComponentCardProps> = ({ name, description, icon, slug }) => {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <TouchableOpacity
      onPress={() => router.push(`/component/${slug}`)}
      className={`rounded-lg overflow-hidden border mt-2 ${
        isDark ? 'border-dark-border bg-dark-card' : 'border-border bg-card'
      }`}
      activeOpacity={0.7}
    >
      <View className="flex-col items-start p-4 gap-y-4">
        <View
          className={`w-10 h-10 rounded-md mr-4 items-center justify-center ${
            isDark ? 'bg-dark-accent' : 'bg-accent'
          }`}
        >
          <Feather name={icon} size={20} color={isDark ? '#fff' : '#000'} />
        </View>
        <View className="flex-1">
          <Text
            className={`font-bold text-base ${isDark ? 'text-dark-foreground' : 'text-foreground'}`}
          >
            {name}
          </Text>
          <Text
            className={`text-sm mt-1 ${
              isDark ? 'text-dark-muted-foreground' : 'text-muted-foreground'
            }`}
            numberOfLines={2}
          >
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ComponentCard;
