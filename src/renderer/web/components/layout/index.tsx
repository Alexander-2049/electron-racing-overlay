import SelectGame from "../game-select";
import TitleBar from "../title-bar";
import "./layout.css";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="app-wrapper">
      <TitleBar />
      <SelectGame />
      <div className="app-content">{children}</div>
    </div>
  );
};

export default Layout;
