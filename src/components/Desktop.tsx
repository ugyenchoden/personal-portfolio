import { useState } from "react";
import AppIcon from "./AppIcon";
import Window from "./Window";
import About from "../apps/About";  

const Desktop = () => {
  const [isWindowOpen, setIsWindowOpen] = useState(false);

  return(
    <>
    <main className="desktop">
        <div onClick={() => setIsWindowOpen(true)}>
          <AppIcon title="About" icon="📁" />
        </div>

        <AppIcon title="Projects" icon="💻" />
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
