type AppIconProps = {
  title: string;
  icon: string;
};

const AppIcon = ({ title, icon }: AppIconProps) => {
  return (
    <div className="app-icon">
      <span className="icon">{icon}</span>
      <p>{title}.app</p>
    </div>
  );
};

export default AppIcon;
