import { Activity } from "@/lib/definitions";

import "./activity-header.css";

interface IActivtyHeaderProps {
  activity: Activity;
}

export function ActivtyHeader(props: IActivtyHeaderProps) {
  return (
    <div className="activty-header">
      <h1>{props.activity.title}</h1>
      <h2>{props.activity.description}</h2>
    </div>
  );
}
