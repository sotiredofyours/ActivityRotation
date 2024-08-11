import { Activities, Users } from "@/lib/inplace-data";
import { ActivityView } from "@/ui/activity-view";
import { Header } from "@/ui/header/header";

export default function Home() {
  return (
      <>
        <Header></Header>
        <ActivityView
          activity={Activities}
          members={Users}
        />
      </>
  );
}
