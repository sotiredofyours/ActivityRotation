import React from "react";
import { Activity, ActivityMember } from "@/lib/definitions";
import { ActivityMemberView } from "./acitivity-member-view";
import { ActivtyHeader } from "./activity-header";
import "./activity-view.css";

interface IActivityViewProps {
  activity: Array<Activity>;
  members: Array<ActivityMember>;
}

export function ActivityView(props: IActivityViewProps) {
  const getCurrentHost = React.useCallback(
    (members: Array<ActivityMember>) => members[0],
    []
  );
  const membersViews = props.members.slice(1).map((member) => {
    return (
      <div className="member-view" key={member.id}>
        <ActivityMemberView
         host={member}
         title={`${member.name} ${member.surname}`}
         key={member.id} />
      </div>
    );
  });

  const activities = props.activity.map((activity) => {
    return (
      <div className="activity" key={activity.id}>
        <ActivtyHeader activity={activity} />
        <ActivityMemberView
          title={`Текущий: ${getCurrentHost(props.members).name} ${getCurrentHost(props.members).surname}`}
          host={getCurrentHost(props.members)} />
        <div className="members">{membersViews}</div>
      </div>
    );
  });

  return (
    <div className='activity-view'>
      {activities}
    </div>
  );
}
