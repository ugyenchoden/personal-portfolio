import { useState } from "react";
import AppIcon from "./AppIcon";
import Window from "./Window";
import About from "../apps/About";  
import ProjectsFolder from "../apps/ProjectsFolder";

type View = "desktop" | "projects";

const Desktop = () => {
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [view, setView] = useState<View>("desktop");

  if(view ==="projects"){
    return(
      <ProjectsFolder onBack={() => setView("desktop")} />
    )
  }
  return(
    <>
    <main className="desktop">
        <div onClick={() => setIsWindowOpen(true)}>
          <AppIcon title="About" icon="📁" />
        </div>
        
        <div onClick={() => setView("projects")}>
        <AppIcon title="Projects" icon="💻" />
        </div>
        
        <AppIcon title="Skills" icon="🧠" />
        <AppIcon title="Contact" icon="✉️" />
      </main>

      {isWindowOpen && (
        <Window title="About Me" onClose={() => setIsWindowOpen(false)}>
          <About />
        </Window>
      )}    
    </>
  )
};

export default Desktop;
