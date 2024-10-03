'use server'

import { getAllActivities, getAllMembersInActivity } from "@/lib/data";
import { ActivityEditor } from "@/ui/activity-editor"
import { Header } from "@/ui/header/header"
import { NavigationBar } from "@/ui/navigation-bar"
import './page.css'

export default async function Page({ params }: { params: { id: number } }) {
  const activities = await getAllActivities();
  const members = await getAllMembersInActivity(params.id);
  return(
  <>
    <Header />
    <div className="main-content">
      <NavigationBar activities={activities} linkTo="/activity-settings/"/>
      <ActivityEditor members={members}></ActivityEditor>
    </div>
  </>)
}
