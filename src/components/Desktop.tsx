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
  const [currentView, setCurrentView] = useState<AppName | null>(null);

  /**
   * Open (or focus) an app.
   * - Adds to open apps if not present
   * - Removes from minimized list if present
   * - Sets as the current foreground view
   */
  const openApp = (appName: AppName) => {
    setOpenApps((prevOpen) =>
      prevOpen.includes(appName) ? prevOpen : [...prevOpen, appName]
    );
    setMinimizedApps((prevMinimized) =>
      prevMinimized.filter((app) => app !== appName)
    );
    setCurrentView(appName);
  };

  /**
   * Close an app completely.
   * - Removes from open and minimized lists
   * - Updates current view to the last opened remaining app, if any
   */
  const closeApp = (appName: AppName) => {
    setOpenApps((prevOpen) => {
      const nextOpen = prevOpen.filter((app) => app !== appName);

      setMinimizedApps((prevMinimized) =>
        prevMinimized.filter((app) => app !== appName)
      );

      if (currentView === appName) {
        setCurrentView(nextOpen[nextOpen.length - 1] ?? null);
      }

      return nextOpen;
    });
  };

  /**
   * Minimize an app.
   * - Adds to minimized list
   * - Clears currentView if that app was in front
   */
  const minimizeApp = (appName: AppName) => {
    setMinimizedApps((prevMinimized) =>
      prevMinimized.includes(appName)
        ? prevMinimized
        : [...prevMinimized, appName]
    );
    if (currentView === appName) {
      setCurrentView(null);
    }
  };

  /**
   * Toggle a simple "maximized" CSS class on the window.
   */
  const maximizeApp = () => {
    const element = document.getElementById("window-active");
    if (!element) return;
    element.classList.toggle("window-maximized");
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

      {currentView && !minimizedApps.includes(currentView) && (
        <Window
          title={`${currentView}.app`}
          windowId="window-active"
          onClose={() => closeApp(currentView)}
          onMinimize={() => minimizeApp(currentView)}
          onMaximize={maximizeApp}
        >
          {renderApp(currentView)}
        </Window>
      )}

      <Dock
        openApp={openApp}
        minimizeApp={minimizeApp}
        activeApps={openApps}
        minimizedApps={minimizedApps}
        currentView={currentView}
      />
    </>
  );
};

export default Desktop;