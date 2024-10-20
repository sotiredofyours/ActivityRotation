import React from "react";
import { Activity, ActivityMember } from "@/lib/definitions";
import { ActivityMemberView } from "./acitivity-member-view";
import { ActivtyHeader } from "./activity-header";
import "./activity-view.css";
import { getAllMembersInActivity } from "@/lib/data";

interface IProps {
  activities: Array<Activity>;
}

export const ActivityView: React.FC<IProps> = async (props: IProps) => {
  const renderActivityMembers = async (activityMembers: ActivityMember[]) => {
    return activityMembers.slice(1).map((member) => {
      return (
        <div className="member-view" key={member.id}>
          <ActivityMemberView
            member={member}
            title={`${member.name} ${member.surname}`}
            key={member.id}
          />
        </div>
      );
    });
  };

  const renderHost = (member: ActivityMember) => {
    return (
      <ActivityMemberView
        title={`Текущий: ${member.name} ${member.surname}`}
        member={member}
      />
    );
  };

  const activities = props.activities.map(async (activity) => {
    const activityMembers = await getAllMembersInActivity(activity.id);
    return (
      <div className="activity" key={activity.id}>
        <ActivtyHeader activity={activity} />
        {renderHost(activityMembers[0])}
        <div className="members">
          {await renderActivityMembers(activityMembers)}
        </div>
      </div>
    );
  });

  return <div className="activity-view">{activities}</div>;
};
