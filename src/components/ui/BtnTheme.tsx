import { Moon, Sun } from "@phosphor-icons/react";

const BtnTheme = () => {
  return (
    <div>
      {/* Theme controller */}
      <label className="swap swap-rotate">
        <input type="checkbox" className="theme-controller" value="business" />
        <Sun
          size={30}
          className="fill-current swap-off text-primary-content"
          weight="fill"
        />
        <Moon
          size={30}
          className="fill-current swap-on text-primary-content"
          weight="fill"
        />
      </label>
    </div>
  );
};

export default BtnTheme;
