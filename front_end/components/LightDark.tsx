import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface LightDarkProps {
  themeMode: string;
  setThemeMode: Dispatch<SetStateAction<string>>;
}

const LightDark = ({ themeMode, setThemeMode }: LightDarkProps) => {
  function toogleDarkMode(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked === true) {
      // set theme to dark
      setThemeMode("dark");
      localStorage.setItem("theme", "dark");
    } else {
      // set theme to light
      setThemeMode("light");
      localStorage.setItem("theme", "light");
    }
  }

  return (
    <div className="fixed bottom-2 left-2">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          onChange={toogleDarkMode}
          checked={themeMode === "dark" ? true : false}
        />
        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="-mt-1 ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {themeMode === "dark" ? "Dark Mode" : "Light Mode"}
        </span>
      </label>
    </div>
  );
};

export default LightDark;
