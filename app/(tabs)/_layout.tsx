import { Tabs } from 'expo-router';
import React, { createContext, useState } from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// Déclarer le contexte à l'extérieur du composant pour pouvoir l'importer ailleurs
export const CirclesContext = createContext({ circles: [], setCircles: () => {} });

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [circles, setCircles] = useState([]);

  return (
    <CirclesContext.Provider value={{ circles, setCircles }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />, 
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />, 
          }}
        />
        <Tabs.Screen
          name="canvas"
          options={{
            title: 'Modification',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="circle" color={color} />, // Choix d'une icône simple
          }}
        />
        <Tabs.Screen
          name="les_bouttons"
          options={{
            title: 'Utilisation',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="chevron.right" color={color} />, 
          }}
        />
      </Tabs>
    </CirclesContext.Provider>
  );
}
