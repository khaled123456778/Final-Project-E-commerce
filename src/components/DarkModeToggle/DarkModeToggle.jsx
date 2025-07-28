import { useEffect, useState } from 'react';
import { BiSolidSun } from 'react-icons/bi';
import { BsFillMoonFill } from 'react-icons/bs';

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {

    const savedMode = localStorage.getItem('darkMode');

    if (savedMode === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else if (savedMode === 'false') {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
    
      // window.matchMedia('(prefers-color-scheme: dark)').matches;---return true or false
      const isSytemDark  = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(isSytemDark);
      if (isSytemDark) {
        document.documentElement.classList.add('dark');  
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  };

  return (
    <button onClick={toggleDarkMode} className='mt-2'>
      {darkMode ? <BiSolidSun /> : <BsFillMoonFill />}
    </button>
  );
}

export default DarkModeToggle;
