import { Activities, Users } from "@/lib/inplace-data";
import { Header } from "@/ui/header/header";
import { MembersList } from "@/ui/members-list";
import { NavigationBar } from "@/ui/navigation-bar";

import './page.css'

export default function ActivitySettingsPage(){

  return(
    <>
      <Header />
      <div className="main-content">
        <NavigationBar activities={Activities} />
        <MembersList members={Users}></MembersList>
      </div>
    </>
  );
}
