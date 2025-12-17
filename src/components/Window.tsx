type WindowProps = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

const Window = ({ title, onClose, children }: WindowProps) => {
  return (
    <div className="window-overlay">
      <div className="window">
        <div className="window-header">
          <div className="window-controls">
            <span className="control close" onClick={onClose}></span>
            <span className="control minimize"></span>
            <span className="control maximize"></span>
          </div>
          <p className="window-title">{title}</p>
        </div>

        <div className="window-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Window;
