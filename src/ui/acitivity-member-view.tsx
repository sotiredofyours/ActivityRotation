import { ActivityMember } from "@/lib/definitions";
import Image from "next/image";
import "./activity-member-view.css";

interface IActivityMemberView {
  host: ActivityMember;
  title: string;
}

export function ActivityMemberView(props: IActivityMemberView) {
  const host = props.host;

  return (
    <div className="host-view">
      <div className="host-title">
        <h1>{props.title}</h1>
      </div>
      <div className="user-info-container">
        <div className="image">
          <Image src={host.image} alt={"User Image"} width={120} height={120} />
        </div>
        <div>
          <div className="term">
            <h2>До 14.08.24</h2>
          </div>
          <div className="description">
            <h2>{host.description}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
