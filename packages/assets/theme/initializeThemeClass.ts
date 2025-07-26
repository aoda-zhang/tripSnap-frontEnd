import ThemeKey from '../../constants/themeKey';
import storageTool from '../../utils/storage';

const DefaultTheme = ThemeKey.LIGHT;

const getHtmlThemeClass = () => {
  const html = document.documentElement;
  if (html.classList.contains(ThemeKey.LIGHT)) return ThemeKey.LIGHT;
  if (html.classList.contains(ThemeKey.DARK)) return ThemeKey.DARK;
  return null;
};

const initializeThemeClass = () => {
  const savedTheme = storageTool.get('darkMode') as string | null;
  const currentHtmlTheme = getHtmlThemeClass();

  // Set default theme if no saved theme and no current class
  if (!savedTheme && !currentHtmlTheme) {
    document.documentElement.classList.add(DefaultTheme);
    return;
  }

  // If saved theme is not set, use the current HTML theme
  if (savedTheme && savedTheme !== currentHtmlTheme) {
    document.documentElement.classList.remove(ThemeKey.LIGHT, ThemeKey.DARK);
    document.documentElement.classList.add(savedTheme);
  }
};

export default initializeThemeClass;
