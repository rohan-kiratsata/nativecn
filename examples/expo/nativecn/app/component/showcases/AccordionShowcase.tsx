import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../../lib/ThemeContext';
import { Feather } from '@expo/vector-icons';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../components/ui/accordion';

const AccordionShowcase: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const mode = isDark ? 'dark' : 'light';

  return (
    <View>
      {/* Default Single Accordion */}
      <View className="mb-6 w-full">
        <Text
          className={`text-base mb-2 ${
            isDark ? 'text-dark-muted-foreground' : 'text-muted-foreground'
          }`}
        >
          Default (Single Expansion)
        </Text>
        <Accordion
          mode={mode}
          type="single"
          collapsible
          defaultValue={['item-1']}
          className="w-full"
        >
          <AccordionItem id="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern and supports keyboard navigation and
              screen readers.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styling that matches your theme and can be customized as
              needed.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default, with smooth transitions for both the content and the
              chevron icon.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </View>

      {/* Multiple Expansion Accordion */}
      <View className="mb-6 w-full">
        <Text
          className={`text-base mb-2 ${
            isDark ? 'text-dark-muted-foreground' : 'text-muted-foreground'
          }`}
        >
          Multiple Expansion
        </Text>
        <Accordion mode={mode} type="multiple" defaultValue={['item-1']} className="w-full">
          <AccordionItem id="item-1">
            <AccordionTrigger>Can I expand multiple items?</AccordionTrigger>
            <AccordionContent>
              Yes. When configured with type="multiple", the accordion allows multiple items to be
              expanded simultaneously.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="item-2">
            <AccordionTrigger>How do I customize it?</AccordionTrigger>
            <AccordionContent>
              You can customize the Accordion using className props. The component accepts styling
              through the same className system as other components.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="item-3">
            <AccordionTrigger>Can I nest content?</AccordionTrigger>
            <AccordionContent>
              Yes, you can nest any content inside the AccordionContent component, including other
              components and complex layouts.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </View>

      {/* Custom Styled Accordion */}
      <View className="mb-6 w-full">
        <Text
          className={`text-base mb-2 ${
            isDark ? 'text-dark-muted-foreground' : 'text-muted-foreground'
          }`}
        >
          Custom Styling
        </Text>
        <Accordion
          mode={mode}
          type="single"
          collapsible
          defaultValue={['item-1']}
          className={`w-full rounded-lg ${isDark ? 'bg-dark-card' : 'bg-card'}`}
        >
          <AccordionItem
            id="item-1"
            className={`border-0 ${isDark ? 'border-dark-border' : 'border-border'}`}
          >
            <AccordionTrigger
              className={`px-4 ${isDark ? 'hover:bg-dark-accent' : 'hover:bg-accent'}`}
            >
              Custom header styling
            </AccordionTrigger>
            <AccordionContent
              className={isDark ? 'bg-dark-accent/50' : 'bg-accent/50'}
              contentClassName="px-4"
              textClassName="text-red-500"
            >
              This accordion has custom text color applied to its content. You can fully customize
              text appearance.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            id="item-2"
            className={`border-0 ${isDark ? 'border-dark-border' : 'border-border'}`}
          >
            <AccordionTrigger
              className={`px-4 ${isDark ? 'hover:bg-dark-accent' : 'hover:bg-accent'}`}
              textClassName={isDark ? 'text-dark-primary' : 'text-primary'}
            >
              Custom text color
            </AccordionTrigger>
            <AccordionContent
              className={isDark ? 'bg-dark-accent/50' : 'bg-accent/50 '}
              contentClassName="px-4"
            >
              This trigger has a custom text color that matches your primary theme color.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            id="item-3"
            className={`border-0 rounded-b-lg overflow-hidden ${isDark ? 'border-dark-border' : 'border-border'}`}
          >
            <AccordionTrigger
              className={`px-4 ${isDark ? 'hover:bg-dark-accent' : 'hover:bg-accent'}`}
            >
              <View className="flex-row items-center gap-2">
                <Feather name="info" size={16} color={isDark ? '#FFFFFF' : '#000000'} />
                <Text className={isDark ? 'text-dark-foreground' : 'text-foreground'}>
                  With Icon
                </Text>
              </View>
            </AccordionTrigger>
            <AccordionContent
              className={isDark ? 'bg-dark-accent/50' : 'bg-accent/50'}
              contentClassName="px-4"
            >
              You can include icons or other components within the AccordionTrigger.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </View>
    </View>
  );
};

export default AccordionShowcase;
