import Image from "next/image";
import { FC, useState } from "react";

export interface EButtonProps {
  Icon: string;
  onClick?: () => void;
  className?: string;
  dropdown?: JSX.Element;
}

const EButton: FC<EButtonProps> = ({ className, onClick, Icon, dropdown }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className={`-mb-[6px] ${className}`}>
      <Image
        alt="button"
        src={Icon}
        onClick={!dropdown ? onClick : toggleDropdown}
        className="cursor-pointer"
      />
      {dropdownOpen && (
        <div onClick={() => toggleDropdown()} className="absolute z-10">
          {dropdown}
        </div>
      )}
    </div>
  );
};

export default EButton;
