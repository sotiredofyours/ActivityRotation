"use client";

import { ActivityMember } from "@/lib/definitions";
import React from "react";

import "./members-list.css";
import { ActivityMemberView } from "./acitivity-member-view";

interface IProps {
  members: Array<ActivityMember>;
}

export const MembersList: React.FC<IProps> = (props: IProps) => {
  const [members, setMembers] = React.useState(props.members);
  const [currentCard, setCurrentCard] = React.useState(members[0]);

  const dropHandler = (
    event: React.DragEvent<HTMLDivElement>,
    targetCard: ActivityMember
  ) => {
    event.preventDefault();
    const newMembers = [...members];
    const currentIndex = newMembers.indexOf(currentCard);
    const targetIndex = newMembers.indexOf(targetCard);
    [newMembers[currentIndex], newMembers[targetIndex]] = [
      newMembers[targetIndex],
      newMembers[currentIndex],
    ];
    setMembers(newMembers);
    event.currentTarget.style.boxShadow = "none";
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
    event.currentTarget.style.boxShadow = "none";
  };

  const dragStartHandler = (
    e: React.DragEvent<HTMLDivElement>,
    card: ActivityMember
  ): void => {
    setCurrentCard(card);
  };

  const renderMemberList = members.map((member) => {
    return (
      <div
        onDragLeave={(e) => dragLeaveHandler(e, member)}
        onDragStart={(e) => dragStartHandler(e, member)}
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropHandler(e, member)}
        key={member.id}
        draggable={true}
        className="member-card"
      >
        <ActivityMemberView
          member={member}
          title={`${member.name} ${member.surname}`}
          key={member.id}
        />
      </div>
    );
  });
  return <div className="drag-context">{renderMemberList}</div>;
}
