import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { useTheme } from '../../../lib/ThemeContext';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '../../../components/ui/carousel';
import { Card, CardContent } from '../../../components/ui/card';
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

const CarouselShowcase: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const mode = isDark ? 'dark' : 'light';
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth - 32; // Accounting for padding

  return (
    <View>
      {/* Basic Carousel */}
      <Text
        className={`text-xl mb-4 font-bold ${isDark ? 'text-dark-foreground' : 'text-foreground'}`}
      >
        Basic Carousel
      </Text>

      <View className="mb-12">
        <Carousel mode={mode} className="w-full" loop itemCount={3}>
          <CarouselContent>
            <CarouselItem>
              <View className="h-60 p-1">
                <Card mode={mode} className="w-full h-full flex items-center justify-center">
                  <CardContent className="flex items-center justify-center h-full">
                    <Text
                      className={`text-4xl font-bold ${
                        isDark ? 'text-dark-foreground' : 'text-foreground'
                      }`}
                    >
                      1
                    </Text>
                  </CardContent>
                </Card>
              </View>
            </CarouselItem>
            <CarouselItem>
              <View className="h-60 p-1">
                <Card mode={mode} className="w-full h-full flex items-center justify-center">
                  <CardContent className="flex items-center justify-center h-full">
                    <Text
                      className={`text-4xl font-bold ${
                        isDark ? 'text-dark-foreground' : 'text-foreground'
                      }`}
                    >
                      2
                    </Text>
                  </CardContent>
                </Card>
              </View>
            </CarouselItem>
            <CarouselItem>
              <View className="h-60 p-1">
                <Card mode={mode} className="w-full h-full flex items-center justify-center">
                  <CardContent className="flex items-center justify-center h-full">
                    <Text
                      className={`text-4xl font-bold ${
                        isDark ? 'text-dark-foreground' : 'text-foreground'
                      }`}
                    >
                      3
                    </Text>
                  </CardContent>
                </Card>
              </View>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="bg-opacity-70 hover:bg-opacity-100" />
          <CarouselNext className="bg-opacity-70 hover:bg-opacity-100" />
        </Carousel>
      </View>

      {/* Image Carousel */}
      <Text
        className={`text-xl mb-4 font-bold ${isDark ? 'text-dark-foreground' : 'text-foreground'}`}
      >
        Image Carousel
      </Text>

      <View className="mb-12">
        <Carousel mode={mode} className="w-full" itemCount={3}>
          <CarouselContent>
            <CarouselItem>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000',
                }}
                className="w-full h-48 rounded-md"
                resizeMode="cover"
              />
            </CarouselItem>
            <CarouselItem>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=1000',
                }}
                className="w-full h-48 rounded-md"
                resizeMode="cover"
              />
            </CarouselItem>
            <CarouselItem>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000',
                }}
                className="w-full h-48 rounded-md"
                resizeMode="cover"
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious variant="ghost" />
          <CarouselNext variant="ghost" />
        </Carousel>
      </View>

      {/* Vertical Carousel */}
      <Text
        className={`text-xl mb-4 font-bold ${isDark ? 'text-dark-foreground' : 'text-foreground'}`}
      >
        Vertical Carousel
      </Text>

      <View className="mb-12 h-60">
        <Carousel mode={mode} className="w-full h-full" orientation="vertical" itemCount={3}>
          <CarouselContent>
            <CarouselItem>
              <View className="h-full p-1">
                <Card mode={mode} className="w-full h-full flex items-center justify-center">
                  <CardContent className="flex items-center justify-center h-full">
                    <View className="flex-row items-center gap-2">
                      <Icon name="map-pin" size={24} color={isDark ? '#E5E7EB' : '#111827'} />
                      <Text
                        className={`text-xl font-bold ${
                          isDark ? 'text-dark-foreground' : 'text-foreground'
                        }`}
                      >
                        Location 1
                      </Text>
                    </View>
                  </CardContent>
                </Card>
              </View>
            </CarouselItem>
            <CarouselItem>
              <View className="h-full p-1">
                <Card mode={mode} className="w-full h-full flex items-center justify-center">
                  <CardContent className="flex items-center justify-center h-full">
                    <View className="flex-row items-center gap-2">
                      <Icon name="map-pin" size={24} color={isDark ? '#E5E7EB' : '#111827'} />
                      <Text
                        className={`text-xl font-bold ${
                          isDark ? 'text-dark-foreground' : 'text-foreground'
                        }`}
                      >
                        Location 2
                      </Text>
                    </View>
                  </CardContent>
                </Card>
              </View>
            </CarouselItem>
            <CarouselItem>
              <View className="h-full p-1">
                <Card mode={mode} className="w-full h-full flex items-center justify-center">
                  <CardContent className="flex items-center justify-center h-full">
                    <View className="flex-row items-center gap-2">
                      <Icon name="map-pin" size={24} color={isDark ? '#E5E7EB' : '#111827'} />
                      <Text
                        className={`text-xl font-bold ${
                          isDark ? 'text-dark-foreground' : 'text-foreground'
                        }`}
                      >
                        Location 3
                      </Text>
                    </View>
                  </CardContent>
                </Card>
              </View>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious
            variant="outline"
            className={isDark ? 'bg-primary border-dark-primary' : 'bg-white border-primary'}
          />
          <CarouselNext
            variant="outline"
            className={isDark ? 'bg-primary border-dark-primary' : 'bg-white border-primary'}
          />
        </Carousel>
      </View>

      {/* Card Carousel */}
      <Text
        className={`text-xl mb-4 font-bold ${isDark ? 'text-dark-foreground' : 'text-foreground'}`}
      >
        Card Carousel
      </Text>

      <View className="mb-12">
        <Carousel mode={mode} className="w-full" itemCount={5}>
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <View className="p-1 h-56">
                  <Card
                    mode={mode}
                    className={`${
                      index % 2 === 0
                        ? isDark
                          ? 'bg-dark-primary'
                          : 'bg-primary'
                        : isDark
                          ? 'bg-dark-secondary'
                          : 'bg-secondary'
                    } h-full flex items-center justify-center`}
                  >
                    <CardContent className="h-full flex items-center justify-center">
                      <Text
                        className={`text-2xl font-bold ${
                          index % 2 === 0
                            ? isDark
                              ? 'text-dark-primary-foreground'
                              : 'text-primary-foreground'
                            : isDark
                              ? 'text-dark-secondary-foreground'
                              : 'text-secondary-foreground'
                        }`}
                      >
                        Card {index + 1}
                      </Text>
                    </CardContent>
                  </Card>
                </View>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </View>
    </View>
  );
};

export default CarouselShowcase;
