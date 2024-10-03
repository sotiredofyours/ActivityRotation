import React from "react";
import { Activity, ActivityMember } from "@/lib/definitions";
import { ActivityMemberView } from "./acitivity-member-view";
import { ActivtyHeader } from "./activity-header";
import "./activity-view.css";
import { getAllMembersInActivity } from "@/lib/data";

interface IActivityViewProps {
  activities: Array<Activity>;
}

export async function ActivityView(props: IActivityViewProps) {
  const members = await getAllMembersInActivity(props.activities[1].id);
  const currentHost = members[0];
  const membersViews = members.slice(1).map((member) => {
    return (
      <div className="member-view" key={member.id}>
        <ActivityMemberView
          host={member}
          title={`${member.name} ${member.surname}`}
          key={member.id}
        />
      </div>
    );
  });

  const activities = props.activities.map((activity) => {
    return (
      <div className="activity" key={activity.id}>
        <ActivtyHeader activity={activity} />
        <ActivityMemberView
          title={`Текущий: ${currentHost.name} ${currentHost.surname}`}
          host={currentHost}
        />
        <div className="members">{membersViews}</div>
      </div>
    );
  });

  return <div className="activity-view">{activities}</div>;
}
