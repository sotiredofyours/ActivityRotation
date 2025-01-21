"use client";

import { ActivityMember } from "@/lib/definitions";
import React, { Dispatch, SetStateAction } from "react";

import "./members-list.css";
import { ActivityMemberDndView } from "./activity-member-dnd-view";

interface IProps {
  members: Array<ActivityMember>;
  updateCurrentMember: (card: ActivityMember) => void;
  needDndView: boolean;
  currentMember: ActivityMember;
}

export const MembersList: React.FC<IProps> = (props: IProps) => {
  const [members, setMembers] = React.useState(props.members);

  const dropHandler = (
    event: React.DragEvent<HTMLDivElement>,
    targetCard: ActivityMember
  ) => {
    event.preventDefault();
    const newMembers = [...members];
    const currentIndex = newMembers.indexOf(props.currentMember);
    const targetIndex = newMembers.indexOf(targetCard);
    [newMembers[currentIndex], newMembers[targetIndex]] = [
      newMembers[targetIndex],
      newMembers[currentIndex],
    ];
    setMembers(newMembers);
    event.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.15)";
  };

  const dragOverHandler = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    if (event.currentTarget.className == "member-card") {
      event.currentTarget.style.boxShadow = "0 4px 3px gray";
    }
  };

  const dragLeaveHandler = (
    event: React.DragEvent<HTMLDivElement>,
    card: ActivityMember
  ): void => {
    event.preventDefault();
    event.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.15)";
  };

  const dragStartHandler = (
    e: React.DragEvent<HTMLDivElement>,
    card: ActivityMember
  ): void => {
    props.updateCurrentMember(card);
  };

  const renderMemberList = members.map((member) => {
    return (
      <div
        onDragLeave={(e) => dragLeaveHandler(e, member)}
        onDragStart={(e) => dragStartHandler(e, member)}
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropHandler(e, member)}
        onClick={() => props.updateCurrentMember(member)}
        key={member.id}
        draggable={true}
        className="member-card"
      >
        <ActivityMemberDndView member={member} />
      </div>
    );
  });
  return <div className="drag-context">{renderMemberList}</div>;
};
