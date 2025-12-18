import { useState } from "react";
import Window from "./Window";
import About from "../apps/About";
import ProjectsFolder from "../apps/ProjectsFolder";
import Skills from "../apps/Skills";
import Contact from "../apps/Contact";
import Dock from "./Dock";

type AppName = "About" | "Projects" | "Skills" | "Contact";

const Desktop = () => {
  const [openApps, setOpenApps] = useState<AppName[]>([]);
  const [minimizedApps, setMinimizedApps] = useState<AppName[]>([]);
  const [maximizedApps, setMaximizedApps] = useState<AppName[]>([]);
  const [focusedApp, setFocusedApp] = useState<AppName | null>(null);

  const openApp = (appName: AppName) => {
    setOpenApps((prev) => (prev.includes(appName) ? prev : [...prev, appName]));
    setMinimizedApps((prev) => prev.filter((a) => a !== appName));
    setFocusedApp(appName);
  };

  const closeApp = (appName: AppName) => {
    setOpenApps((prev) => prev.filter((a) => a !== appName));
    setMinimizedApps((prev) => prev.filter((a) => a !== appName));
    setMaximizedApps((prev) => prev.filter((a) => a !== appName));
    if (focusedApp === appName) {
      const remaining = openApps.filter((a) => a !== appName);
      setFocusedApp(remaining[remaining.length - 1] ?? null);
    }
  };

  const minimizeApp = (appName: AppName) => {
    setMinimizedApps((prev) =>
      prev.includes(appName) ? prev : [...prev, appName]
    );
    if (focusedApp === appName) {
      const visible = openApps.filter(
        (a) => a !== appName && !minimizedApps.includes(a)
      );
      setFocusedApp(visible[visible.length - 1] ?? null);
    }
  };

  const toggleMaximize = (appName: AppName) => {
    setMaximizedApps((prev) =>
      prev.includes(appName)
        ? prev.filter((a) => a !== appName)
        : [...prev, appName]
    );
  };

  const focusApp = (appName: AppName) => {
    setFocusedApp(appName);
  };

  const renderApp = (appName: AppName) => {
    switch (appName) {
      case "About":
        return <About />;
      case "Projects":
        return <ProjectsFolder />;
      case "Skills":
        return <Skills />;
      case "Contact":
        return <Contact />;
      default:
        return null;
    }
  };

  return (
    <>
      <main className="desktop" />

      {openApps.map((appName, index) => {
        const isMinimized = minimizedApps.includes(appName);
        const isMaximized = maximizedApps.includes(appName);
        const isFocused = focusedApp === appName;

        if (isMinimized) return null;

        return (
          <Window
            key={appName}
            title={`${appName}`}
            windowId={`window-${appName}`}
            isMaximized={isMaximized}
            isFocused={isFocused}
            zIndex={isFocused ? 600 : 500 + index}
            onClose={() => closeApp(appName)}
            onMinimize={() => minimizeApp(appName)}
            onMaximize={() => toggleMaximize(appName)}
            onFocus={() => focusApp(appName)}
          >
            {renderApp(appName)}
          </Window>
        );
      })}

      <Dock
        openApp={openApp}
        minimizeApp={minimizeApp}
        activeApps={openApps}
        minimizedApps={minimizedApps}
        currentView={focusedApp}
      />
    </>
  );
};

export default Desktop;