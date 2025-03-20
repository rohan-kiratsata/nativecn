import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useTheme } from '../../../lib/ThemeContext';
import { AspectRatio } from '../../../components/ui/aspectratio';

const AspectRatioShowcase: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const textColorClass = isDark ? 'text-dark-foreground' : 'text-foreground';
  const mutedTextColorClass = isDark ? 'text-dark-muted-foreground' : 'text-muted-foreground';
  const bgColorClass = isDark ? 'bg-dark-muted' : 'bg-muted';
  const bgSecondaryClass = isDark ? 'bg-dark-secondary' : 'bg-secondary';

  return (
    <ScrollView>
      {/* Standard 16/9 Aspect Ratio with Image */}
      <View className="mb-8">
        <Text className={`text-base mb-2 ${mutedTextColorClass}`}>Video (16:9)</Text>
        <AspectRatio ratio={16 / 9} className={`rounded-lg ${bgColorClass}`}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80',
            }}
            className="h-full w-full rounded-lg object-cover"
            resizeMode="cover"
          />
        </AspectRatio>
        <Text className={`mt-2 ${textColorClass}`}>
          16:9 is the standard aspect ratio for modern videos and displays.
        </Text>
      </View>

      {/* Square 1:1 Aspect Ratio with Color */}
      <View className="mb-8">
        <Text className={`text-base mb-2 ${mutedTextColorClass}`}>Square (1:1)</Text>
        <AspectRatio ratio={1} className={`rounded-lg ${bgSecondaryClass}`}>
          <View className="flex-1 items-center justify-center">
            <Text className={`text-xl font-semibold ${textColorClass}`}>1:1</Text>
            <Text className={`${mutedTextColorClass}`}>Square</Text>
          </View>
        </AspectRatio>
        <Text className={`mt-2 ${textColorClass}`}>
          Perfect for profile pictures, album covers, and social media posts.
        </Text>
      </View>

      {/* 4:3 Aspect Ratio with Placeholder */}
      <View className="mb-8">
        <Text className={`text-base mb-2 ${mutedTextColorClass}`}>Classic (4:3)</Text>
        <AspectRatio ratio={4 / 3} className={`rounded-lg ${bgColorClass}`}>
          <View className="flex-1 items-center justify-center border-2 border-dashed border-primary rounded-lg m-2">
            <Text className={`text-xl font-semibold ${textColorClass}`}>4:3</Text>
            <Text className={`${mutedTextColorClass}`}>Placeholder</Text>
          </View>
        </AspectRatio>
        <Text className={`mt-2 ${textColorClass}`}>
          Common for older photographs, TV screens, and printed media.
        </Text>
      </View>

      {/* Custom Aspect Ratio */}
      <View className="mb-8">
        <Text className={`text-base mb-2 ${mutedTextColorClass}`}>Custom (2.35:1)</Text>
        <AspectRatio ratio={2.35} className={`rounded-lg ${bgColorClass}`}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1465925508512-1e7052bb62e6?w=800&dpr=2&q=80',
            }}
            className="h-full w-full rounded-lg object-cover"
            resizeMode="cover"
          />
        </AspectRatio>
        <Text className={`mt-2 ${textColorClass}`}>
          Cinematic widescreen format commonly used in films.
        </Text>
      </View>
    </ScrollView>
  );
};

export default AspectRatioShowcase;
