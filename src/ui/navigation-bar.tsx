import { Activity } from "@/lib/definitions";

import "./navigation-bar.css";
import Link from "next/link";

interface INavigationBarProps {
  activities: Array<Activity>;
  linkTo: string
}

export function NavigationBar(props: INavigationBarProps) {
  const renderActivities = props.activities.map((x) => {
    return (
      <Link
        href={`${props.linkTo}${x.id}`}
        key={x.id}
        className="navigation-item"
        scroll={true}
      >
        {x.title}
      </Link>
    );
  });

  return <nav className="navigation-bar-container">{renderActivities}</nav>;
}
