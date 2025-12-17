import { useState } from "react";
import AppIcon from "./AppIcon";
import Window from "./Window";
import About from "../apps/About";  
import ProjectsFolder from "../apps/ProjectsFolder";
import Contact from "../apps/Contact";
import Skills from "../apps/Skills";

type View = "desktop" | "projects" | "skills";

const Desktop = () => {
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [view, setView] = useState<View>("desktop");

  if(view ==="projects"){
    return(
      <ProjectsFolder onBack={() => setView("desktop")} />
    )
  }
  if(view === "skills"){
    return(
      <Skills onBack={() => setView("desktop")} />
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

        <div onClick={() => setView("skills")}>
          <AppIcon title="Skills" icon="🧠" />
        </div>

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
