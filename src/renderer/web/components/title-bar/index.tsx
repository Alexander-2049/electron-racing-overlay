import CloseIcon from "../icons/close";
import MinimizeIcon from "../icons/minimize";
import "./title-bar.css";

const TitleBar = () => {
  return (
    <div className="title-bar">
      <div className="title-bar-left"></div>
      <div className="title-bar-right">
        <button
          className="title-bar-button title-bar-minimize-btn"
          onClick={() => {
            window.titleBar.sendMessage("minimize");
          }}
        >
          <MinimizeIcon width="20px" height={"20px"} fill="white" />
        </button>
        <button
          className="title-bar-button title-bar-close-btn"
          onClick={() => {
            window.titleBar.sendMessage("close");
          }}
        >
          <CloseIcon width="20px" height={"20px"} fill="white" />
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
