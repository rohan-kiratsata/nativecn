import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../lib/ThemeContext';
import { Avatar, AvatarImage, AvatarFallback } from '../../../components/ui/avatar';

// Define a type for our loading callbacks
type LoadingCallbacks = {
  [key: string]: (isLoading: boolean) => void;
};

const AvatarShowcase: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const textColorClass = isDark ? 'text-dark-foreground' : 'text-foreground';
  const mutedTextColorClass = isDark ? 'text-dark-muted-foreground' : 'text-muted-foreground';
  const bgColorClass = isDark ? 'bg-dark-muted' : 'bg-muted';

  // Default GitHub avatar URL that we know works
  const DEFAULT_AVATAR_URL = 'https://avatars.githubusercontent.com/u/157279520?v=4';

  // Track loading state for each avatar to demonstrate fallbacks
  const [isLoading, setIsLoading] = useState({
    avatar1: true,
    avatar2: true,
    avatar3: true,
    avatar4: true,
    customAvatar: true,
  });

  // Track error state for each avatar
  const [hasError, setHasError] = useState({
    avatar1: false,
    avatar2: false,
    avatar3: false,
    avatar4: false,
    customAvatar: false,
  });

  // Add state for custom URL avatar
  const [customUrl, setCustomUrl] = useState(DEFAULT_AVATAR_URL);
  const [showCustomAvatar, setShowCustomAvatar] = useState(true);
  const [customUrlError, setCustomUrlError] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState(DEFAULT_AVATAR_URL);

  // Load the default avatar on mount
  useEffect(() => {
    // Initialize custom avatar with default URL
    setCurrentImageUrl(DEFAULT_AVATAR_URL);
    setShowCustomAvatar(true);

    // Reset loading states after a short delay to ensure images have time to load
    const timer = setTimeout(() => {
      setIsLoading(prev => ({
        ...prev,
        customAvatar: false,
        avatar1: false,
        avatar2: false,
        avatar3: false,
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Use refs to prevent infinite loops with loading status callbacks
  const loadingCallbacksRef = useRef<LoadingCallbacks>({});

  // Create loading callbacks only once using useRef
  if (!loadingCallbacksRef.current.avatar1) {
    loadingCallbacksRef.current = {
      avatar1: (isLoading: boolean) => {
        // Update the loading state with a small delay to ensure proper UI updates
        setTimeout(() => {
          setIsLoading(prev => ({ ...prev, avatar1: isLoading }));
        }, 50);
      },
      avatar2: (isLoading: boolean) => {
        setTimeout(() => {
          setIsLoading(prev => ({ ...prev, avatar2: isLoading }));
        }, 50);
      },
      avatar3: (isLoading: boolean) => {
        setTimeout(() => {
          setIsLoading(prev => ({ ...prev, avatar3: isLoading }));
        }, 50);
      },
      avatar4: (isLoading: boolean) => {
        setTimeout(() => {
          setIsLoading(prev => ({ ...prev, avatar4: isLoading }));
        }, 50);
      },
      customAvatar: (isLoading: boolean) => {
        // Use setTimeout to ensure state updates don't conflict
        setTimeout(() => {
          setIsLoading(prev => ({ ...prev, customAvatar: isLoading }));
        }, 50);
      },
    };
  }

  // Helper function to validate image URLs - simple version without regex
  const isValidImageUrl = (url: string): boolean => {
    try {
      // Simple validation - just check for http/https protocol
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  // Handle custom URL submission
  const handleCustomUrlSubmit = useCallback(() => {
    if (customUrl) {
      try {
        // Reset error state
        setCustomUrlError(false);
        setIsLoading(prev => ({ ...prev, customAvatar: true }));

        // Trim whitespace and ensure URL has http/https
        const trimmedUrl = customUrl.trim();
        const formattedUrl = trimmedUrl.startsWith('http') ? trimmedUrl : `https://${trimmedUrl}`;

        // Basic URL validation
        if (!isValidImageUrl(formattedUrl)) {
          setCustomUrlError(true);
          setIsLoading(prev => ({ ...prev, customAvatar: false }));
          return;
        }

        // Use setTimeout to ensure proper UI update sequence
        setTimeout(() => {
          setCurrentImageUrl(formattedUrl);
          setShowCustomAvatar(true);
        }, 50);
      } catch (error) {
        setCustomUrlError(true);
        setIsLoading(prev => ({ ...prev, customAvatar: false }));
      }
    }
  }, [customUrl]);

  // Reset custom URL error when URL changes
  const handleCustomUrlChange = useCallback(
    (text: string) => {
      setCustomUrl(text);
      if (customUrlError) {
        setCustomUrlError(false);
      }
    },
    [customUrlError]
  );

  return (
    <ScrollView>
      {/* Standard Avatar with GitHub profile image */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle} className={mutedTextColorClass}>
          Standard Avatar
        </Text>
        <View style={styles.avatarRow}>
          <Avatar size="md" style={styles.noSpacing}>
            <AvatarImage
              key="github-avatar"
              source={{ uri: 'https://avatars.githubusercontent.com/u/157279520?v=4' }}
              alt="GitHub Avatar"
              onLoadingStatusChange={loadingCallbacksRef.current.avatar1}
              onError={() => {
                setHasError(prev => ({ ...prev, avatar1: true }));
              }}
            />
            <AvatarFallback isImageLoading={isLoading.avatar1} hasImageError={hasError.avatar1}>
              <Text style={styles.avatarText} className={textColorClass}>
                GH
              </Text>
            </AvatarFallback>
          </Avatar>
          <Text style={styles.avatarLabel} className={textColorClass}>
            GitHub Avatar {isLoading.avatar1 ? '(Loading...)' : ''}
          </Text>
        </View>
        <Text style={styles.description} className={mutedTextColorClass}>
          Default size with GitHub profile image.
        </Text>
      </View>

      {/* Custom URL Avatar Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle} className={mutedTextColorClass}>
          Custom URL Avatar
        </Text>
        <View style={styles.customUrlContainer}>
          <TextInput
            style={[
              styles.urlInput,
              isDark ? styles.darkInput : styles.lightInput,
              customUrlError ? styles.errorInput : {},
            ]}
            placeholder="Enter image URL (e.g. https://example.com/image.jpg)"
            placeholderTextColor={isDark ? '#666' : '#999'}
            value={customUrl}
            onChangeText={handleCustomUrlChange}
            onSubmitEditing={handleCustomUrlSubmit}
          />
          <TouchableOpacity
            style={[styles.urlButton, isDark ? styles.darkButton : styles.lightButton]}
            onPress={handleCustomUrlSubmit}
          >
            <Text
              style={styles.buttonText}
              className={isDark ? 'text-dark-background' : 'text-background'}
            >
              Load
            </Text>
          </TouchableOpacity>
        </View>

        {showCustomAvatar && (
          <View style={styles.avatarRow}>
            <Avatar size="md" style={styles.noSpacing}>
              <AvatarImage
                key={`avatar-image-${currentImageUrl}`}
                source={{ uri: currentImageUrl }}
                alt="Custom Avatar"
                className="no-spacing"
                onLoadingStatusChange={loadingCallbacksRef.current.customAvatar}
                onError={() => {
                  setCustomUrlError(true);
                  setHasError(prev => ({ ...prev, customAvatar: true }));
                  // Make sure to update loading state to false when there's an error
                  setTimeout(() => {
                    setIsLoading(prev => ({ ...prev, customAvatar: false }));
                  }, 50);
                }}
              />
              <AvatarFallback
                isImageLoading={isLoading.customAvatar}
                hasImageError={hasError.customAvatar}
              >
                <Text style={styles.avatarText} className={textColorClass}>
                  URL
                </Text>
              </AvatarFallback>
            </Avatar>
            <Text style={styles.avatarLabel} className={textColorClass}>
              {customUrlError
                ? `Error loading image`
                : isLoading.customAvatar
                  ? 'Loading...'
                  : 'Custom URL Avatar'}
            </Text>
          </View>
        )}

        <Text style={styles.description} className={mutedTextColorClass}>
          Enter any image URL to load it as an avatar.
        </Text>
      </View>

      {/* Different sizes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle} className={mutedTextColorClass}>
          Avatar Sizes
        </Text>
        <View style={styles.avatarRow}>
          <Avatar size="sm" style={styles.noSpacing}>
            <AvatarImage
              source={{ uri: 'https://avatars.githubusercontent.com/u/157279520?v=4' }}
              alt="Small Avatar"
              onLoadingStatusChange={loadingCallbacksRef.current.avatar2}
              onError={() => {
                setHasError(prev => ({ ...prev, avatar2: true }));
              }}
            />
            <AvatarFallback isImageLoading={isLoading.avatar2} hasImageError={hasError.avatar2}>
              <Text style={styles.smallAvatarText} className={textColorClass}>
                SM
              </Text>
            </AvatarFallback>
          </Avatar>

          <View style={styles.spacer} />

          <Avatar size="md" style={styles.noSpacing}>
            {' '}
            {/* Default size */}
            <AvatarImage
              source={{ uri: 'https://avatars.githubusercontent.com/u/157279520?v=4' }}
              alt="Medium Avatar"
              onError={() => {
                setHasError(prev => ({ ...prev, avatar3: true }));
              }}
            />
            <AvatarFallback isImageLoading={false} hasImageError={hasError.avatar3}>
              <Text style={styles.avatarText} className={textColorClass}>
                MD
              </Text>
            </AvatarFallback>
          </Avatar>

          <View style={styles.spacer} />

          <Avatar size="lg" style={styles.noSpacing}>
            <AvatarImage
              source={{ uri: 'https://avatars.githubusercontent.com/u/157279520?v=4' }}
              alt="Large Avatar"
              onLoadingStatusChange={loadingCallbacksRef.current.avatar3}
              onError={() => {
                setHasError(prev => ({ ...prev, avatar3: true }));
              }}
            />
            <AvatarFallback isImageLoading={isLoading.avatar3} hasImageError={hasError.avatar3}>
              <Text style={styles.largeAvatarText} className={textColorClass}>
                LG
              </Text>
            </AvatarFallback>
          </Avatar>
        </View>
        <Text style={styles.description} className={mutedTextColorClass}>
          Avatars come in different predefined sizes: small, medium, and large.
        </Text>
      </View>

      {/* Fallback Demonstration */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle} className={mutedTextColorClass}>
          Fallback Example
        </Text>
        <View style={styles.avatarRow}>
          <Avatar size="md" style={styles.noSpacing}>
            <AvatarImage
              source={{ uri: 'https://invalid-image-url.com/not-found.jpg' }}
              alt="Invalid Image"
              onLoadingStatusChange={loadingCallbacksRef.current.avatar4}
              onError={() => {
                setHasError(prev => ({ ...prev, avatar4: true }));
                // Set loading to false as the image load operation has completed (with an error)
                setTimeout(() => {
                  setIsLoading(prev => ({ ...prev, avatar4: false }));
                }, 50);
              }}
            />
            <AvatarFallback isImageLoading={isLoading.avatar4} hasImageError={hasError.avatar4}>
              <Text style={styles.avatarText} className={textColorClass}>
                404
              </Text>
            </AvatarFallback>
          </Avatar>
          <Text style={styles.avatarLabel} className={textColorClass}>
            Fallback on invalid image
          </Text>
        </View>
        <Text style={styles.description} className={mutedTextColorClass}>
          When an image fails to load, the fallback is displayed with custom content.
        </Text>
      </View>

      {/* Avatar with colored backgrounds */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle} className={mutedTextColorClass}>
          Colored Avatars
        </Text>
        <View style={styles.avatarRow}>
          <Avatar size="md" style={styles.noSpacing}>
            <AvatarFallback standalone={true} className="bg-primary">
              <Text style={styles.avatarText} className="text-primary-foreground">
                MT
              </Text>
            </AvatarFallback>
          </Avatar>

          <View style={styles.spacer} />

          <Avatar size="md" style={styles.noSpacing}>
            <AvatarFallback standalone={true} className="bg-secondary">
              <Text style={styles.avatarText} className="text-secondary-foreground">
                RN
              </Text>
            </AvatarFallback>
          </Avatar>

          <View style={styles.spacer} />

          <Avatar size="md" style={styles.noSpacing}>
            <AvatarFallback standalone={true} className="bg-destructive">
              <Text style={styles.avatarText} className="text-destructive-foreground">
                X
              </Text>
            </AvatarFallback>
          </Avatar>
        </View>
        <Text style={styles.description} className={mutedTextColorClass}>
          Avatars can have different background colors with initials.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 32,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '500',
  },
  smallAvatarText: {
    fontSize: 12,
    fontWeight: '500',
  },
  largeAvatarText: {
    fontSize: 16,
    fontWeight: '500',
  },
  avatarLabel: {
    marginLeft: 16,
  },
  description: {
    marginTop: 8,
  },
  spacer: {
    width: 16,
  },
  // Custom URL input styles
  customUrlContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  urlInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  darkInput: {
    backgroundColor: '#333',
    borderColor: '#444',
    color: '#fff',
  },
  lightInput: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    color: '#000',
  },
  errorInput: {
    borderColor: '#f44336',
  },
  urlButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  darkButton: {
    backgroundColor: '#fff',
  },
  lightButton: {
    backgroundColor: '#000',
  },
  buttonText: {
    fontWeight: '500',
  },
  noSpacing: {
    padding: 0,
    margin: 0,
  },
});

export default AvatarShowcase;
