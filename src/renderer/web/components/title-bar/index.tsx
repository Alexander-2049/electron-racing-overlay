import "./title-bar.css";

const TitleBar = () => {
  return (
    <div className="title-bar">
      <div className="title-bar-left"></div>
      <div className="title-bar-right">
        <button
          onClick={() => {
            window.titleBar.sendMessage("minimize");
          }}
        >
          -
        </button>
        <button
          onClick={() => {
            window.titleBar.sendMessage("close");
          }}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
