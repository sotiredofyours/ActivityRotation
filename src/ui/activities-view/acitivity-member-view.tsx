import { ActivityMember } from "@/lib/definitions";
import Image from "next/image";
import "./activity-member-view.css";
import React, { useCallback, useMemo } from "react";
import { getNextChangeDate } from "@/lib/data";

interface IProps {
  member: ActivityMember;
  title: string;
  activityId: number;
}

/**
 * Renders member card with general information on the main page.
 * @param props Props.
 * @returns Member view on the main page.
 */
export const ActivityMemberView: React.FC<IProps> = async (props: IProps) => {
  const updateDate = await getNextChangeDate(props.activityId, props.member.id);

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
            До {updateDate.getDate()} / {updateDate.getMonth() + 1} / {updateDate.getFullYear()}
          </div>
          <div className="description">
            <h2>{props.member.description}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
