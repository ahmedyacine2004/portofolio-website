'use client';

import { motion } from 'framer-motion';
import {
  Bot,
  Box,
  ChevronDown,
  ChevronRight,
  Download,
  Eye,
  Laptop,
  Palette,
  RotateCcw,
  Search,
  Smartphone,
  Sparkles,
  Tablet,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

import RobotImage from '@/assets/images/robot.png';
import { KeyboardScene } from '@/components/3d/KeyboardScene';
import { useTheme } from '@/hooks/use-theme';

type CategoryId = 'appearance' | '3d-elements' | 'accessibility' | 'performance' | 'ai-assistant';

type SettingItem = {
  id: string;
  title: string;
  description: string;
  type: 'select' | 'toggle';
  options?: string[];
  value: string | boolean;
};

type Category = {
  id: CategoryId;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: SettingItem[];
};

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  // Settings State
  const [searchQuery, setSearchQuery] = useState('');
  const [openCategories, setOpenCategories] = useState<Record<CategoryId, boolean>>({
    appearance: true,
    '3d-elements': true,
    accessibility: true,
    performance: true,
    'ai-assistant': true,
  });

  const [colorAccent, setColorAccent] = useState('Indigo');
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [fontFamily, setFontFamily] = useState('Inter');
  const [compactMode, setCompactMode] = useState(false);

  const [hero3dEnabled, setHero3dEnabled] = useState(true);
  const [interactive3d, setInteractive3d] = useState(true);
  const [performanceMode, setPerformanceMode] = useState('Auto Detect');

  const [reduceMotion, setReduceMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [focusIndicators, setFocusIndicators] = useState(true);
  const [textScaling, setTextScaling] = useState('100%');

  const [imageLazyLoading, setImageLazyLoading] = useState(true);
  const [smoothScrolling, setSmoothScrolling] = useState(true);
  const [preloadCritical, setPreloadCritical] = useState(true);

  const [aiAssistantEnabled, setAiAssistantEnabled] = useState(true);
  const [autoSuggest, setAutoSuggest] = useState(true);
  const [contextAwareness, setContextAwareness] = useState(true);

  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const toggleCategory = (id: CategoryId) => {
    setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleResetDefaults = () => {
    setTheme('dark');
    setColorAccent('Indigo');
    setAnimationsEnabled(true);
    setFontFamily('Inter');
    setCompactMode(false);
    setHero3dEnabled(true);
    setInteractive3d(true);
    setPerformanceMode('Auto Detect');
    setReduceMotion(false);
    setHighContrast(false);
    setFocusIndicators(true);
    setTextScaling('100%');
    setImageLazyLoading(true);
    setSmoothScrolling(true);
    setPreloadCritical(true);
    setAiAssistantEnabled(true);
    setAutoSuggest(true);
    setContextAwareness(true);
  };

  const handleExportPreferences = () => {
    const prefs = {
      theme,
      colorAccent,
      animationsEnabled,
      fontFamily,
      compactMode,
      hero3dEnabled,
      interactive3d,
      performanceMode,
      reduceMotion,
      highContrast,
      focusIndicators,
      textScaling,
      imageLazyLoading,
      smoothScrolling,
      preloadCritical,
      aiAssistantEnabled,
      autoSuggest,
      contextAwareness,
    };
    const blob = new Blob([JSON.stringify(prefs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-preferences.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const categories: Category[] = [
    {
      id: 'appearance',
      title: 'APPEARANCE',
      icon: Palette,
      items: [
        {
          id: 'theme',
          title: 'Theme',
          description: 'Choose overall theme of the workspace',
          type: 'select',
          options: ['Dark Modern', 'Light Modern'],
          value: theme === 'dark' ? 'Dark Modern' : 'Light Modern',
        },
        {
          id: 'accent',
          title: 'Color Accents',
          description: 'Primary accent color used across the portfolio',
          type: 'select',
          options: ['Indigo', 'Emerald', 'Violet', 'Cyan', 'Rose'],
          value: colorAccent,
        },
        {
          id: 'animations',
          title: 'Animations',
          description: 'Enable smooth transitions and micro-interactions',
          type: 'toggle',
          value: animationsEnabled,
        },
        {
          id: 'font',
          title: 'Font Family',
          description: 'Select primary typography',
          type: 'select',
          options: ['Inter', 'Roboto', 'Outfit', 'Fira Code'],
          value: fontFamily,
        },
        {
          id: 'compact',
          title: 'Compact Mode',
          description: 'Reduce spacing for a more dense grid view',
          type: 'toggle',
          value: compactMode,
        },
      ],
    },
    {
      id: '3d-elements',
      title: '3D ELEMENTS',
      icon: Box,
      items: [
        {
          id: '3d-hero',
          title: '3D Hero on Home',
          description: 'Enable 3D rendering on the landing page',
          type: 'toggle',
          value: hero3dEnabled,
        },
        {
          id: 'interactive-3d',
          title: 'Interactive 3D',
          description: 'Enable mouse & touch rotation for 3D elements',
          type: 'toggle',
          value: interactive3d,
        },
        {
          id: 'perf-mode',
          title: 'Performance Mode',
          description: 'Lower 3D quality on low-end devices',
          type: 'select',
          options: ['Auto Detect', 'High Quality', 'Low Latency'],
          value: performanceMode,
        },
      ],
    },
    {
      id: 'accessibility',
      title: 'ACCESSIBILITY',
      icon: Eye,
      items: [
        {
          id: 'reduce-motion',
          title: 'Reduce Motion',
          description: 'Minimize animations across the workspace',
          type: 'toggle',
          value: reduceMotion,
        },
        {
          id: 'high-contrast',
          title: 'High Contrast',
          description: 'Increase contrast ratio for better readability',
          type: 'toggle',
          value: highContrast,
        },
        {
          id: 'focus-indicators',
          title: 'Focus Indicators',
          description: 'Outline focused interactive elements',
          type: 'toggle',
          value: focusIndicators,
        },
        {
          id: 'text-scaling',
          title: 'Text Scaling',
          description: 'Adjust base text size for the workspace',
          type: 'select',
          options: ['100%', '110%', '125%'],
          value: textScaling,
        },
      ],
    },
    {
      id: 'performance',
      title: 'PERFORMANCE',
      icon: Zap,
      items: [
        {
          id: 'lazy-load',
          title: 'Image Lazy Loading',
          description: 'Load images as they scroll into view',
          type: 'toggle',
          value: imageLazyLoading,
        },
        {
          id: 'smooth-scroll',
          title: 'Smooth Scrolling',
          description: 'Enable smooth scrolling across the workspace',
          type: 'toggle',
          value: smoothScrolling,
        },
        {
          id: 'preload',
          title: 'Preload Critical Assets',
          description: 'Preload important resources for faster navigation',
          type: 'toggle',
          value: preloadCritical,
        },
      ],
    },
    {
      id: 'ai-assistant',
      title: 'AI ASSISTANT',
      icon: Bot,
      items: [
        {
          id: 'ai-enable',
          title: 'AI Assistant',
          description: 'Enable your portfolio AI assistant',
          type: 'toggle',
          value: aiAssistantEnabled,
        },
        {
          id: 'auto-suggest',
          title: 'Auto Suggest',
          description: 'Show context-sensitive suggested prompts',
          type: 'toggle',
          value: autoSuggest,
        },
        {
          id: 'context-aware',
          title: 'Context Awareness',
          description: 'Allow assistant to use portfolio content',
          type: 'toggle',
          value: contextAwareness,
        },
      ],
    },
  ];

  const filteredCategories = categories
    .map((cat) => {
      const filteredItems = cat.items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      return { ...cat, items: filteredItems };
    })
    .filter(
      (cat) => cat.title.toLowerCase().includes(searchQuery.toLowerCase()) || cat.items.length > 0,
    );

  return (
    <div className="font-inter flex h-full w-full max-h-[620px] flex-col overflow-y-auto select-none rounded-sm bg-background p-2.5 text-foreground shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] lg:overflow-hidden scrollbar-none sm:p-3.5">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 pb-3 border-b border-border/40">
        <div>
          <h1 className="font-inter text-xl sm:text-2xl font-black text-foreground tracking-tight uppercase leading-none">
            Workspace Preferences
          </h1>
          <p className="font-inter text-[11px] font-normal text-muted-foreground mt-1">
            Fine-tune your experience while exploring my portfolio.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Search preferences */}
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search preferences (Ctrl+K)..."
              className="font-inter w-full sm:w-56 pl-8 pr-3 py-1.5 rounded-xs bg-muted/40 text-[11px] text-foreground placeholder:text-muted-foreground border border-transparent focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          {/* Reset button */}
          <button
            onClick={handleResetDefaults}
            className="font-inter inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-muted/40 hover:bg-muted text-[11px] font-bold text-foreground transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            <RotateCcw className="size-3 text-muted-foreground" />
            <span>Reset To Default</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="font-inter flex flex-col lg:flex-row gap-3.5 w-full h-full p-1 pt-2 overflow-hidden">
        {/* ================= LEFT ACCORDIONS SECTION ================= */}
        <div className="flex-1 min-w-0 flex flex-col h-full overflow-y-auto scrollbar-none p-1 space-y-2.5 pb-3">
          {filteredCategories.map((cat) => {
            const CatIcon = cat.icon;
            const isOpen = openCategories[cat.id] ?? true;

            return (
              <div
                key={cat.id}
                className="rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] border border-border/20 space-y-2"
              >
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(cat.id)}
                  className="w-full flex items-center justify-between text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-xs bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                      <CatIcon className="size-3.5" />
                    </div>
                    <span className="font-inter text-[11px] font-bold text-foreground tracking-wider uppercase">
                      {cat.title}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronDown className="size-3.5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="size-3.5 text-muted-foreground" />
                  )}
                </button>

                {/* Category Settings List */}
                {isOpen && (
                  <div className="space-y-1.5 pt-1 border-t border-border/20">
                    {cat.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2 rounded-xs bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="min-w-0 pr-3">
                          <h4 className="font-inter text-[11px] font-semibold text-foreground leading-tight">
                            {item.title}
                          </h4>
                          <p className="font-inter text-[9.5px] text-muted-foreground leading-tight mt-0.5">
                            {item.description}
                          </p>
                        </div>

                        {/* Setting Controls */}
                        <div className="shrink-0">
                          {item.id === 'theme' ? (
                            <select
                              value={theme === 'dark' ? 'Dark Modern' : 'Light Modern'}
                              onChange={(e) =>
                                setTheme(e.target.value === 'Dark Modern' ? 'dark' : 'light')
                              }
                              className="font-inter bg-background text-[10px] font-bold text-foreground border border-border/40 px-2 py-1 rounded-xs focus:outline-none cursor-pointer"
                            >
                              <option value="Dark Modern">Dark Modern</option>
                              <option value="Light Modern">Light Modern</option>
                            </select>
                          ) : item.id === 'accent' ? (
                            <select
                              value={colorAccent}
                              onChange={(e) => setColorAccent(e.target.value)}
                              className="font-inter bg-background text-[10px] font-bold text-foreground border border-border/40 px-2 py-1 rounded-xs focus:outline-none cursor-pointer"
                            >
                              {item.options?.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          ) : item.id === 'font' ? (
                            <select
                              value={fontFamily}
                              onChange={(e) => setFontFamily(e.target.value)}
                              className="font-inter bg-background text-[10px] font-bold text-foreground border border-border/40 px-2 py-1 rounded-xs focus:outline-none cursor-pointer"
                            >
                              {item.options?.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          ) : item.id === 'perf-mode' ? (
                            <select
                              value={performanceMode}
                              onChange={(e) => setPerformanceMode(e.target.value)}
                              className="font-inter bg-background text-[10px] font-bold text-foreground border border-border/40 px-2 py-1 rounded-xs focus:outline-none cursor-pointer"
                            >
                              {item.options?.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          ) : item.id === 'text-scaling' ? (
                            <select
                              value={textScaling}
                              onChange={(e) => setTextScaling(e.target.value)}
                              className="font-inter bg-background text-[10px] font-bold text-foreground border border-border/40 px-2 py-1 rounded-xs focus:outline-none cursor-pointer"
                            >
                              {item.options?.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          ) : (
                            /* Toggle Switch */
                            <button
                              type="button"
                              onClick={() => {
                                if (item.id === 'animations')
                                  setAnimationsEnabled(!animationsEnabled);
                                else if (item.id === 'compact') setCompactMode(!compactMode);
                                else if (item.id === '3d-hero') setHero3dEnabled(!hero3dEnabled);
                                else if (item.id === 'interactive-3d')
                                  setInteractive3d(!interactive3d);
                                else if (item.id === 'reduce-motion')
                                  setReduceMotion(!reduceMotion);
                                else if (item.id === 'high-contrast')
                                  setHighContrast(!highContrast);
                                else if (item.id === 'focus-indicators')
                                  setFocusIndicators(!focusIndicators);
                                else if (item.id === 'lazy-load')
                                  setImageLazyLoading(!imageLazyLoading);
                                else if (item.id === 'smooth-scroll')
                                  setSmoothScrolling(!smoothScrolling);
                                else if (item.id === 'preload')
                                  setPreloadCritical(!preloadCritical);
                                else if (item.id === 'ai-enable')
                                  setAiAssistantEnabled(!aiAssistantEnabled);
                                else if (item.id === 'auto-suggest') setAutoSuggest(!autoSuggest);
                                else if (item.id === 'context-aware')
                                  setContextAwareness(!contextAwareness);
                              }}
                              className={`relative inline-flex h-4.5 w-8 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                Boolean(item.value) ? 'bg-primary' : 'bg-muted-foreground/30'
                              }`}
                            >
                              <span
                                className={`pointer-events-none inline-block size-3.5 transform rounded-full bg-background shadow-xs ring-0 transition duration-200 ease-in-out ${
                                  Boolean(item.value) ? 'translate-x-3.5' : 'translate-x-0'
                                }`}
                              />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ================= RIGHT SIDEBAR ================= */}
        <div className="w-full lg:w-[320px] shrink-0 flex flex-col justify-between h-full overflow-y-auto scrollbar-none rounded-sm bg-background p-3.5 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] border border-border/20 space-y-3.5 m-0.5">
          {/* Workspace Preview Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <Eye className="size-4 text-primary" />
              <h2 className="font-inter text-[12px] font-bold text-foreground">
                Workspace Preview
              </h2>
            </div>
            <p className="font-inter text-[10px] text-muted-foreground leading-tight">
              This is how your portfolio workspace looks with current preferences.
            </p>

            {/* Interactive Preview Canvas Box (Live Micro View of Home / Page) */}
            <div
              className={`relative overflow-hidden rounded-xs border border-border/40 p-1.5 shadow-xs transition-all duration-300 mx-auto ${
                previewDevice === 'desktop'
                  ? 'w-full'
                  : previewDevice === 'tablet'
                    ? 'w-[84%]'
                    : 'w-[58%]'
              } ${theme === 'dark' ? 'bg-black text-slate-100' : 'bg-white text-slate-900'}`}
            >
              {/* Mini Browser Top Bar */}
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-border/30 text-[7.5px] font-mono">
                <div className="flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-red-500" />
                  <span className="size-1.5 rounded-full bg-amber-500" />
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  <span className="ml-1 opacity-75 truncate max-w-[90px]">portfolio.app/</span>
                </div>
                <div className="flex items-center gap-1 font-bold text-primary">
                  <span className="uppercase text-[7px] px-1 bg-primary/10 rounded-xs">
                    {theme}
                  </span>
                </div>
              </div>

              {/* Live Home Page Mini Layout (Scaled Representation of / Page) */}
              <div className="relative h-[155px] w-full overflow-hidden p-1 flex gap-1.5">
                {/* Left Side: Intro & Home Info */}
                <div className="flex flex-col justify-between w-[55%] min-w-0">
                  <div>
                    <span className="text-[6.5px] font-semibold text-primary bg-primary/10 px-1 py-0.5 rounded-xs inline-block">
                      Salutations
                    </span>
                    <p className="text-[6px] font-medium text-primary mt-0.5">
                      Workspace Initialized
                    </p>
                    <h3 className="font-black text-[10px] sm:text-[11px] leading-[0.85] tracking-tight uppercase mt-0.5">
                      <span className="block text-foreground">AHMED YASSINE</span>
                      <span className="block text-primary">ABBANE</span>
                    </h3>
                    <p className="text-[6.5px] text-muted-foreground mt-0.5 line-clamp-2 leading-none">
                      Full Stack Web Developer & Graphic Designer
                    </p>
                  </div>

                  {/* Mini Home Cards */}
                  <div className="grid grid-cols-2 gap-1 mt-1">
                    <div className="p-1 rounded-xs bg-muted/40 text-[6.5px]">
                      <div className="font-bold text-foreground">Quick Actions</div>
                      <div className="text-[5.5px] text-muted-foreground truncate">
                        About • Projects
                      </div>
                    </div>
                    <div className="p-1 rounded-xs bg-muted/40 text-[6.5px]">
                      <div className="font-bold text-emerald-600 dark:text-emerald-400">
                        Featured
                      </div>
                      <div className="text-[5.5px] text-muted-foreground truncate">CONSULTIFY</div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Live 3D Keyboard Scene */}
                <div className="w-[45%] h-full rounded-xs overflow-hidden border border-border/20 relative">
                  <KeyboardScene />
                </div>

                {/* Floating Welcome Tag */}
                <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-xs px-1.5 py-0.5 rounded-xs border border-border/40 shadow-xs text-[5.5px] font-bold text-foreground flex items-center gap-1 z-10 whitespace-nowrap">
                  <span>Welcome to the Developer Environment</span>
                </div>
              </div>

              {/* Device Viewport Buttons */}
              <div className="flex items-center justify-between pt-1.5 border-t border-border/30 mt-1">
                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`flex-1 py-0.5 text-[8px] font-bold rounded-xs flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                    previewDevice === 'desktop'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted/40'
                  }`}
                >
                  <Laptop className="size-2.5" />
                  <span>Desktop</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('tablet')}
                  className={`flex-1 py-0.5 text-[8px] font-bold rounded-xs flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                    previewDevice === 'tablet'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted/40'
                  }`}
                >
                  <Tablet className="size-2.5" />
                  <span>Tablet</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`flex-1 py-0.5 text-[8px] font-bold rounded-xs flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                    previewDevice === 'mobile'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted/40'
                  }`}
                >
                  <Smartphone className="size-2.5" />
                  <span>Mobile</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="space-y-1.5 pt-2 border-t border-border/20">
            <h3 className="font-inter text-[10px] font-bold text-foreground uppercase tracking-wider">
              QUICK INFO
            </h3>

            <div className="space-y-1 text-[10px]">
              <div className="flex items-center justify-between py-0.5">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Palette className="size-3 text-primary" /> Theme
                </span>
                <span className="font-bold text-foreground">
                  {theme === 'dark' ? 'Dark Modern' : 'Light Modern'}
                </span>
              </div>
              <div className="flex items-center justify-between py-0.5">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Sparkles className="size-3 text-primary" /> Animations
                </span>
                <span className="font-bold text-foreground">
                  {animationsEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div className="flex items-center justify-between py-0.5">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Zap className="size-3 text-primary" /> Performance
                </span>
                <span className="font-bold text-foreground">{performanceMode}</span>
              </div>
              <div className="flex items-center justify-between py-0.5">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Bot className="size-3 text-primary" /> AI Assistant
                </span>
                <span className="font-bold text-foreground">
                  {aiAssistantEnabled ? 'Ready' : 'Disabled'}
                </span>
              </div>
              <div className="flex items-center justify-between py-0.5">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Search className="size-3 text-primary" /> Search Index
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Up to date</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-1.5 pt-2 border-t border-border/20 shrink-0">
            <h3 className="font-inter text-[10px] font-bold text-foreground uppercase tracking-wider">
              ACTIONS
            </h3>

            <button
              onClick={handleResetDefaults}
              className="w-full p-2 rounded-xs bg-muted/40 hover:bg-muted text-foreground transition-all flex items-center gap-2 cursor-pointer shadow-xs text-left"
            >
              <div className="size-6 rounded-xs bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <RotateCcw className="size-3" />
              </div>
              <div>
                <h4 className="font-inter text-[11px] font-bold leading-tight">
                  Reset All Preferences
                </h4>
                <p className="font-inter text-[9px] text-muted-foreground">
                  Restore default workspace settings
                </p>
              </div>
            </button>

            <button
              onClick={handleExportPreferences}
              className="w-full p-2 rounded-xs bg-muted/40 hover:bg-muted text-foreground transition-all flex items-center gap-2 cursor-pointer shadow-xs text-left"
            >
              <div className="size-6 rounded-xs bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Download className="size-3" />
              </div>
              <div>
                <h4 className="font-inter text-[11px] font-bold leading-tight">
                  Export Preferences
                </h4>
                <p className="font-inter text-[9px] text-muted-foreground">
                  Download your workspace preferences
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
