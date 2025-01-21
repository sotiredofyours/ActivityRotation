import React from "react";
import { Activity, ActivityMember } from "@/lib/definitions";
import { ActivityMemberView } from "./acitivity-member-view";
import { ActivtyHeader } from "../activity-header";
import "./activity-view.css";
import { getAllMembersInActivity } from "@/lib/data";

interface IProps {
  activities: Array<Activity>;
}

export const ActivityView: React.FC<IProps> = async (props: IProps) => {
  const renderActivityMembers = async (activityMembers: ActivityMember[], activityId: number) => {
    return activityMembers.slice(1).map((member) => {
      return (
        <div className="member-view" key={member.id}>
          <ActivityMemberView
            member={member}
            activityId={activityId}
            title={`${member.name} ${member.surname}`}
            key={member.id}
          />
        </div>
      );
    });
  };

  const renderHost = (member: ActivityMember, activityId: number) => {
    if (!member)
      return null;
    return (
      <div className="host-member">
        <ActivityMemberView
          activityId={activityId}
          title={`Текущий: ${member.name} ${member.surname}`}
          member={member}
        />
      </div>
    );
  };

  const activities = props.activities.map(async (activity) => {
    const activityMembers = await getAllMembersInActivity(activity.id);
    return (
      <div className="activity" key={activity.id}>
        <ActivtyHeader activity={activity} />
        {renderHost(activityMembers[0], activity.id)}
        <div className="members">
          {await renderActivityMembers(activityMembers, activity.id)}
        </div>
      </div>
    );
  });

  return <div className="activity-view">{activities}</div>;
};
