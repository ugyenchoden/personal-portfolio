type WindowProps = {
  title: string;
  windowId?: string;
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  children: React.ReactNode;
};

const Window = ({
  title,
  windowId = "window-active",
  onClose,
  onMinimize,
  onMaximize,
  children,
}: WindowProps) => {
  return (
    <div className="window-overlay">
      <div className="window" id={windowId}>
        <div className="window-header">
          <div className="window-controls">
            <span className="control close" onClick={onClose}></span>
            <span className="control minimize" onClick={onMinimize}></span>
            <span className="control maximize" onClick={onMaximize}></span>
          </div>
          <p className="window-title">{title}</p>
        </div>

        <div className="window-content">{children}</div>
      </div>
    </div>
  );
};

export default Window;
