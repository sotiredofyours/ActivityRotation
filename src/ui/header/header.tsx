import Image from "next/image";
import { HeaderButton } from "./header-button";
import logo from "../../../public/activity-logo.svg";
import "./header.css";

export function Header(props: any) {
  return (
    <div className="header-container">
      <div className="buttons-container">
        <div className="logo">
          <Image src={logo} alt="Logo" width={32} height={32} />
        </div>
        <HeaderButton text="Текущие активности" />
        <HeaderButton text="Настроить активности" />
      </div>
    </div>
  );
}
