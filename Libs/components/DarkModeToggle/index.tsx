import { MoonStar, SunMoon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import storageTool from '../../utils/storage';

const ThemeKey = {
  LIGHT: 'light',
  DARK: 'dark',
};

const ModeIcon = ({ isLight }: { isLight: boolean }) => {
  return isLight ? (
    <SunMoon color="#f5ac2e" size={36} />
  ) : (
    <MoonStar color="#52c0e5" size={36} />
  );
};

const DarkModeToggle = () => {
  const [isLight, setIsLight] = useState(() => {
    const value = storageTool.get('darkMode');
    return value === ThemeKey.LIGHT || !value;
  });

  const handleDarkRootClass = useCallback((light: boolean) => {
    if (light) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    // Initialize the dark mode based on state
    handleDarkRootClass(isLight);
  }, [isLight, handleDarkRootClass]);

  const handleModeToggle = () => {
    const newTheme = !isLight;
    setIsLight(newTheme);
    storageTool.set('darkMode', newTheme ? ThemeKey.LIGHT : ThemeKey.DARK);
    handleDarkRootClass(newTheme);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleModeToggle}
      aria-pressed={!isLight}
      className="cursor-pointer p-2 rounded outline-none focus:ring focus:ring-blue-300"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleModeToggle();
        }
      }}
    >
      <ModeIcon isLight={isLight} />
    </div>
  );
};

export default DarkModeToggle;
