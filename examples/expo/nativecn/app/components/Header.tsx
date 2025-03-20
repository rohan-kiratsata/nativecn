import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../lib/ThemeContext';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showSearch?: boolean;
  onSearchChange?: (text: string) => void;
  searchValue?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  showSearch = false,
  onSearchChange,
  searchValue = '',
}) => {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <View
      className={`p-4 ${
        isDark ? 'bg-dark-background' : 'bg-background'
      } border-b ${isDark ? 'border-dark-border' : 'border-border'}`}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          {showBack && (
            <TouchableOpacity
              onPress={() => router.back()}
              className="mr-3"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Feather name="arrow-left" size={24} color={isDark ? '#fff' : '#000'} />
            </TouchableOpacity>
          )}
          <Text
            className={`text-xl font-bold ${isDark ? 'text-dark-foreground' : 'text-foreground'}`}
          >
            {title}
          </Text>
        </View>
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={toggleTheme}
            className="ml-2 p-2"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Feather name={isDark ? 'sun' : 'moon'} size={22} color={isDark ? '#fff' : '#000'} />
          </TouchableOpacity>
        </View>
      </View>

      {showSearch && (
        <View
          className={`mt-4 flex-row items-center rounded-md px-3 py-2 ${
            isDark ? 'bg-dark-card' : 'bg-card'
          } border ${isDark ? 'border-dark-border' : 'border-border'}`}
        >
          <Feather
            name="search"
            size={18}
            color={isDark ? '#888' : '#666'}
            style={{ marginRight: 8 }}
          />
          <TextInput
            placeholder="Search components..."
            value={searchValue}
            onChangeText={onSearchChange}
            className={`flex-1 ${isDark ? 'text-dark-foreground' : 'text-foreground'}`}
            placeholderTextColor={isDark ? '#888' : '#666'}
          />
          {searchValue !== '' && (
            <TouchableOpacity
              onPress={() => onSearchChange?.('')}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Feather name="x" size={18} color={isDark ? '#888' : '#666'} />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default Header;
