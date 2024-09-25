import { Moon, Sun } from "@phosphor-icons/react";

const BtnTheme = () => {
  return (
    <div>
      {/* Theme controller */}
      <label className="swap swap-rotate">
        <input type="checkbox" className="theme-controller" value="forest" />
        <Sun size={36} className="fill-current swap-off" />
        <Moon size={36} className="fill-current swap-on" />
      </label>
    </div>
  );
};

export default BtnTheme;
