import React, { useState } from "react";
import { useTheme, themes } from "../context/ThemeContext";
import { Palette, Check, X } from "lucide-react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeOptions = [
    {
      key: "green",
      name: "Green",
      color: "bg-green-600",
      ring: "ring-green-600",
    },
    {
      key: "white",
      name: "Light",
      color: "bg-gray-200",
      ring: "ring-gray-400",
    },
    {
      key: "black",
      name: "Dark",
      color: "bg-zinc-900",
      ring: "ring-zinc-900",
    },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Theme Options Panel */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 min-w-[200px] animate-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
            <span className="text-sm font-semibold text-gray-700">Choose Theme</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="size-4 text-gray-400" />
            </button>
          </div>
          <div className="space-y-2">
            {themeOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => {
                  setTheme(option.key);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  theme === option.key
                    ? "bg-gray-100 ring-2 " + option.ring
                    : "hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full ${option.color} flex items-center justify-center shadow-inner`}
                >
                  {theme === option.key && (
                    <Check className="size-4 text-white" />
                  )}
                </div>
                <span className="font-medium text-gray-700">{option.name}</span>
                {theme === option.key && (
                  <span className="ml-auto text-xs text-gray-400">Active</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all duration-300 ${
          isOpen
            ? "bg-gray-800 text-white"
            : theme === "green"
            ? "bg-green-600 text-white hover:bg-green-700"
            : theme === "black"
            ? "bg-zinc-800 text-white hover:bg-zinc-700"
            : "bg-gray-700 text-white hover:bg-gray-800"
        }`}
        title="Change Theme"
      >
        <Palette className="size-5 group-hover:rotate-12 transition-transform" />
        <span className="text-sm font-medium hidden sm:inline">Theme</span>
      </button>
    </div>
  );
};

export default ThemeSwitcher;
