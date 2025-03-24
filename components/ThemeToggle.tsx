import { Moon, Sun } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';

import { useThemeStore } from '../stores/themeStore';

export const ThemeToggle = () => {
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      className={`rounded-full p-2 ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}>
      {isDarkMode ? <Moon size={20} color="black" /> : <Sun size={20} color="black" />}
    </TouchableOpacity>
  );
};
