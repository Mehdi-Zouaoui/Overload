import { View, Text, TouchableOpacity } from 'react-native';

import { useThemeStore } from '../stores/themeStore';

interface TabBarProps {
  tabs: string[];
  activeTab: string;
  onTabPress: (tab: string) => void;
}

export const TabBar = ({ tabs, activeTab, onTabPress }: TabBarProps) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <View
      className={`mb-2 flex-row items-center justify-around rounded-lg py-4 shadow-sm ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => onTabPress(tab)}
          className={`items-center rounded-full px-4 py-2 ${
            activeTab === tab ? (isDarkMode ? 'bg-gray-800' : 'bg-gray-100') : ''
          }`}>
          <Text
            className={`text-base font-medium
              ${
                activeTab === tab
                  ? isDarkMode
                    ? 'text-white'
                    : 'text-black'
                  : isDarkMode
                    ? 'text-gray-400'
                    : 'text-gray-500'
              }`}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
