type WindowProps = {
  title: string;
  windowId?: string;
  isMaximized?: boolean;
  isFocused?: boolean;
  zIndex?: number;
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onFocus?: () => void;
  children: React.ReactNode;
};

const Window = ({
  title,
  windowId,
  isMaximized = false,
  isFocused = false,
  zIndex = 500,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  children,
}: WindowProps) => {
  return (
    <div
      className={`window-overlay ${isFocused ? "focused" : ""}`}
      style={{ zIndex }}
      onMouseDown={onFocus}
    >
      <div
        className={`window ${isMaximized ? "window-maximized" : ""}`}
        id={windowId}
      >
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
