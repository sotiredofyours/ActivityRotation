import { Activities, Users } from "@/lib/inplace-data";
import { ActivityView } from "@/ui/activity-view";
import { Header } from "@/ui/header/header";
import { NavigationBar } from "@/ui/navigation-bar";
import './page.css'

export default function Home() {
  return (
    <>
      <Header />
      <div className='main-content'>
        <NavigationBar activities={Activities} />
        <ActivityView activity={Activities} members={Users} />
      </div>
    </>
  );
}
