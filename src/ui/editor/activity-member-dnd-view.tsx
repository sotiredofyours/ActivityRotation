import { ActivityMember } from "@/lib/definitions";
import Image from "next/image";

import "./activity-member-dnd-view.css";

interface IProps {
  member: ActivityMember;
}

export const ActivityMemberDndView: React.FC<IProps> = (props: IProps) => {
  return (
    <div className="user-dnd-container">
      <div className="image">
        <Image
          src={props.member.image}
          alt={"User Image"}
          width={80}
          height={80}
        />
      </div>
      <div className="user-fullname">
        <h1>{props.member.name} {props.member.surname}</h1>
      </div>
    </div>
  );
};
