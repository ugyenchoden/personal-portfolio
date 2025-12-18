import aboutIcon from "../assets/finder.png";
import projectsIcon from "../assets/safari.png";
import skillsIcon from "../assets/terminal.png";
import contactIcon from "../assets/contact.png";

type AppName = "About" | "Projects" | "Skills" | "Contact";

type DockProps = {
  openApp: (appName: AppName) => void;
  minimizeApp: (appName: AppName) => void;
  activeApps: AppName[];
  minimizedApps: AppName[];
  currentView: AppName | null;
};

const apps: { name: AppName; icon: string }[] = [
  { name: "About", icon: aboutIcon },
  { name: "Projects", icon: projectsIcon },
  { name: "Skills", icon: skillsIcon },
  { name: "Contact", icon: contactIcon },
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
            <span className="icon">
              <img src={app.icon} alt={app.name} />
            </span>
            <p>{app.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Dock;
