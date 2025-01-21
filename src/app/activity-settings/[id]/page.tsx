"use server";

import { getAllActivities, getAllMembersInActivity } from "@/lib/data";
import { Header } from "@/ui/header/header";
import { NavigationBar } from "@/ui/navigation-bar/navigation-bar";
import "./page.css";
import { ActivityEditor } from "@/ui/editor/activity-editor";

export default async function Page({ params }: { params: { id: number } }) {
  const activities = await getAllActivities();
  const members = await getAllMembersInActivity(params.id);
  return (
    <>
      <Header />
      <div className="main-content">
        <NavigationBar
          activities={activities}
          linkTo="/activity-settings/"
          needEditButtons={true}
        />
        <ActivityEditor
          members={members}
          activityId={params.id}
        ></ActivityEditor>
      </div>
    </>
  );
}
