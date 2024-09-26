import { Header } from "@/ui/header/header";
import { MembersList } from "@/ui/members-list";
import { NavigationBar } from "@/ui/navigation-bar";

import './page.css'
import { getAllActivities, getAllMembersInActivity, updateMember } from "@/lib/data";

export default async function ActivitySettingsPage(){
  const activities = await getAllActivities();
  const members = await getAllMembersInActivity(2);
  return(
    <>
      <Header />
      <div className="main-content">
        <NavigationBar activities={activities} />
        <MembersList members={members}></MembersList>
      </div>
    </>
  );
}
