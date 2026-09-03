import React from "react";
import { NavigationLink } from "../../utils/contentTypes";

interface DekstopDropdownProps {
  links?: NavigationLink[];
}

const DekstopDropdown: React.FC<DekstopDropdownProps> = ({ links }) => {
  return (
    <ul className="invisible absolute top-full -left-8 z-1 flex translate-y-2 transform flex-col gap-y-7 rounded-tl-lg rounded-tr-2xl rounded-br-2xl rounded-bl-2xl bg-white pt-8 pr-16 pb-11 pl-8 opacity-0 drop-shadow-[2px_4px_30px_rgba(0,0,0,.10)] transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
      {links?.map((link) => (
        <li
          key={link.id}
          className="flex cursor-pointer items-center font-medium transition-all duration-200"
        >
          <a
            className="text-grey-600 text-nowrap hover:text-black"
            href={link.href}
          >
            {link.text}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default DekstopDropdown;
