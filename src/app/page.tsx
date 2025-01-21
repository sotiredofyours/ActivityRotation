import { ActivityView } from "@/ui/activities-view/activity-view";
import { Header } from "@/ui/header/header";
import { NavigationBar } from "@/ui/navigation-bar/navigation-bar";
import "./page.css";
import { getAllActivities } from "@/lib/data";
import React from "react";

export default async function Home() {
  const activities = await getAllActivities();
  return (
    <>
      <Header />
      <div className="main-content">
        <NavigationBar activities={activities} linkTo="/#" needEditButtons={false} />
        <ActivityView activities={activities} />
      </div>
    </>
  );
}
