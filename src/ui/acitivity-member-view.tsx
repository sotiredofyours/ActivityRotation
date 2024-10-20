import { ActivityMember } from "@/lib/definitions";
import Image from "next/image";
import "./activity-member-view.css";
import React from "react";

interface IProps {
  member: ActivityMember;
  title: string;
}

export const ActivityMemberView: React.FC<IProps> = (props: IProps) => {
  return (
    <div className="host-view">
      <div className="host-title">
        <h1>{props.title}</h1>
      </div>
      <div className="user-info-container">
        <div className="image">
          <Image
            src={props.member.image}
            alt={"User Image"}
            width={120}
            height={120}
          />
        </div>
        <div>
          <div className="term">
            <h2>До 14.08.24</h2>
          </div>
          <div className="description">
            <h2>{props.member.description}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
