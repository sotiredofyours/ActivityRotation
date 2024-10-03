'use client'

import { useState } from "react";
import MemberCard from "./member-card";
import { MembersList } from "./members-list";
import { ActivityMember } from "@/lib/definitions";
import './activity-editor.css';

interface IProps {
  members: Array<ActivityMember>;
}

export function ActivityEditor(props: IProps) {
  const [currentMember, updateCurrentMember] = useState<ActivityMember>(props.members[0]);
  return (
    <div className="main-container">
      <MembersList members={props.members}></MembersList>
      <MemberCard member={currentMember} />
    </div>
  );
}
