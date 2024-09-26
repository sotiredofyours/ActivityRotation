"use client"

import { ActivityMember } from "@/lib/definitions"
import React from "react";

import './members-list.css';
import { ActivityMemberView } from "./acitivity-member-view";
import MemberCard from "./member-card";

interface IMembersListProps {
  members: Array<ActivityMember>;
}

export function MembersList(props: IMembersListProps){
  const [members, setMembers] = React.useState(props.members);
  const [currentCard, setCurrentCard] = React.useState(members[0]);

  const dropHandler = (event: React.DragEvent<HTMLDivElement>, targetCard: ActivityMember) => {
    event.preventDefault();
    const newMembers = [...members];
    const currentIndex = newMembers.indexOf(currentCard);
    const targetIndex = newMembers.indexOf(targetCard);
    [newMembers[currentIndex], newMembers[targetIndex]] = [newMembers[targetIndex], newMembers[currentIndex]];
    setMembers(newMembers);
    event.currentTarget.style.boxShadow = 'none';
  }

  const dragOverHandler = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
    if (event.currentTarget.className == "member-card"){
      event.currentTarget.style.boxShadow = '0 4px 3px gray';
    }
  }

  const dragLeaveHandler = (event: React.DragEvent<HTMLDivElement>, card: ActivityMember): void => {
    event.preventDefault();
    event.currentTarget.style.boxShadow = 'none';
  }

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, card: ActivityMember): void =>  {
    setCurrentCard(card);
  }

  const renderMemberList = members.map(x => {
    return(
      <div
        onDragLeave={(e) => dragLeaveHandler(e, x)}
        onDragStart={(e) => dragStartHandler(e, x)}
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropHandler(e, x)}
        key={x.id}
        draggable={true}
        className="member-card">
        <ActivityMemberView host={x} title={`${x.name} ${x.surname}`} key={x.id}></ActivityMemberView>
      </div>
  );
})
  return(
    <div className="main-container">
      <div className="drag-context">
        {renderMemberList}
      </div>
      <div className="edit-area">
        <MemberCard
          member={currentCard}
         />
      </div>
    </div>
  )
}
