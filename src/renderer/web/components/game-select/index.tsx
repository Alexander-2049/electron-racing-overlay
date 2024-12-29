import "./select-game.css";
import IRacingIcon from "./icons/iracing-icon";
("./icons/iracing-icon.tsx");

const SelectGame = () => {
  return (
    <div className="select-game-wrapper">
      <button
        className="select-game-button"
        onClick={() => {
          window.MainWindowAPI.sendMessage("switch-to-iracing");
        }}
      >
        <IRacingIcon className="select-game-icon" />
      </button>
    </div>
  );
};

export default SelectGame;
