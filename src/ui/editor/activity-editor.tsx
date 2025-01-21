"use client";

import { useState } from "react";
import MemberCard from "./member-card";
import { MembersList } from "./members-list";
import { ActivityMember } from "@/lib/definitions";
import "./activity-editor.css";

interface IProps {
  members: Array<ActivityMember>;
  activityId: number;
}

export function ActivityEditor(props: IProps) {
  const [currentMember, setCurrentMember] = useState<ActivityMember>(
    props.members[0] ?? null
  );

  const [members, setCurentMemberList] = useState<Array<ActivityMember>>(
    props.members ?? null
  );

  const updateActivityMember = (card: ActivityMember) => {
    setCurrentMember(card);
  };

  const updateMembersList = (card: ActivityMember) => {
    setCurentMemberList((prevList) => {
      const itemIndex = prevList.findIndex(existingItem => existingItem.id === card.id);
      if (itemIndex !== -1) {
        // Если элемент уже есть, обновляем его
        const updatedCollection = [...prevList];
        updatedCollection[itemIndex] = card;
        return updatedCollection;
      } else {
        // Если элемента нет, добавляем его
        return [...prevList, card];
      }
    })
  }

  return (
    <div className="main-container">
      <MembersList
        needDndView={true}
        currentMember={currentMember}
        members={props.members}
        updateCurrentMember={updateActivityMember}
      />
      <MemberCard member={currentMember} updateMemberList={updateActivityMember} activityId={props.activityId} />
    </div>
  );
}
