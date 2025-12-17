type AppName = "About" | "Projects" | "Skills" | "Contact";

type DockProps = {
  openApp: (appName: AppName) => void;
  minimizeApp: (appName: AppName) => void;
  activeApps: AppName[];
  minimizedApps: AppName[];
  currentView: AppName | null;
};

const apps: { name: AppName; icon: string }[] = [
  { name: "About", icon: "📁" },
  { name: "Projects", icon: "💼" },
  { name: "Skills", icon: "🧠" },
  { name: "Contact", icon: "✉️" },
];

const Dock = ({
  openApp,
  activeApps,
  minimizedApps,
  currentView,
}: DockProps) => {
  const handleClick = (appName: AppName) => {
    const isOpen = activeApps.includes(appName);
    const isMinimized = minimizedApps.includes(appName);

    // Not open at all -> open it (launch)
    if (!isOpen) {
      openApp(appName);
      return;
    }

    // Open but minimized -> restore and focus
    if (isMinimized) {
      openApp(appName);
      return;
    }

    // Open (minimized or not) -> bring to front / focus (macOS-like behavior)
    openApp(appName);
  };

  return (
    <div className="dock">
      {apps.map((app) => {
        const isOpen = activeApps.includes(app.name);
        const isMinimized = minimizedApps.includes(app.name);
        const isActive = currentView === app.name && !isMinimized;

        return (
          <div
            key={app.name}
            className={`dock-icon ${
              isActive ? "active" : isOpen ? "open" : ""
            } ${isMinimized ? "minimized" : ""}`}
            onClick={() => handleClick(app.name)}
          >
            <span className="icon">{app.icon}</span>
            <p>{app.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Dock;
