import React, { useState, useMemo } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '../lib/ThemeContext';
import Header from './components/Header';
import ComponentCard from './components/ComponentCard';
import componentsData, { ComponentInfo } from './components/componentsData';

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');

  // Filter components based on search query
  const filteredComponents = useMemo(() => {
    if (!searchQuery.trim()) return componentsData;

    const query = searchQuery.toLowerCase();
    return componentsData.filter(
      component =>
        component.name.toLowerCase().includes(query) ||
        component.description.toLowerCase().includes(query) ||
        component.category.toLowerCase().includes(query)
    );
  }, [componentsData, searchQuery]);

  // Group components by category
  const componentsByCategory = useMemo(() => {
    const grouped: Record<string, ComponentInfo[]> = {};

    filteredComponents.forEach(component => {
      if (!grouped[component.category]) {
        grouped[component.category] = [];
      }
      grouped[component.category].push(component);
    });

    return grouped;
  }, [filteredComponents]);

  // Get all categories in the filtered components
  const categories = Object.keys(componentsByCategory);

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-dark-background' : 'bg-background'}`}>
      <Header
        title="Component Gallery"
        showSearch
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <ScrollView className="flex-1 p-4">
        {filteredComponents.length === 0 ? (
          <View className="flex-1 items-center justify-center mt-10">
            <Text
              className={`text-lg ${
                isDark ? 'text-dark-muted-foreground' : 'text-muted-foreground'
              }`}
            >
              No components found
            </Text>
          </View>
        ) : (
          <>
            {categories.map(category => (
              <View key={category} className="mb-6">
                <Text
                  className={`text-xl font-bold mb-3 ${
                    isDark ? 'text-dark-foreground' : 'text-foreground'
                  }`}
                >
                  {category}
                </Text>
                {componentsByCategory[category].map(component => (
                  <ComponentCard
                    key={component.id}
                    name={component.name}
                    description={component.description}
                    icon={component.icon}
                    slug={component.id}
                  />
                ))}
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
