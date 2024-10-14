'use client';

import { useTheme } from 'next-themes';

import { ThemeSwitch } from './switch';
import { useMemo } from 'react';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const handleThemeChange = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  const switchValue = useMemo(() => {
    return theme === 'light' ? 'on' : 'off';
  }, [theme]);

  const checked = useMemo(() => {
    return theme === 'light' ? true : false;
  }, [theme]);
  //   console.log(theme);

  return (
    <div className='hidden md:block'>
      <ThemeSwitch
        value={switchValue}
        checked={checked}
        onCheckedChange={handleThemeChange}
      />
      <span className='sr-only'>Change theme</span>
    </div>
  );
}
