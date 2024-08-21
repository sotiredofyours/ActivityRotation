"use client";

import Image from "next/image";
import { HeaderButton } from "./header-button";
import logo from "../../../public/activity-logo.svg";
import "./header.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Header(props: any) {
  const router = useRouter();

  return (
    <div className="header-container">
      <div className="buttons-container">
        <div className="logo">
          <Link href="/">
            <Image src={logo} alt="Logo" width={32} height={32} />
          </Link>
        </div>
        <HeaderButton
          text="Текущие активности"
          onClick={() => router.push("/")}
        />
        <HeaderButton
          text="Настроить активности"
          onClick={() => router.push("/activity-settings")}
        />
      </div>
    </div>
  );
}
