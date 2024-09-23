import { Activity, ActivityMember } from "@/lib/definitions";
import './member-card.css';

interface IMemberCardProps {
  member: ActivityMember
}

export default function MemberCard(props: IMemberCardProps) {
  return (
  <div className="editable-card">
    <div className="title">
      <h1>Изменить информацию об участнике</h1>
    </div>
    <div>
      <input className="input-field" placeholder={props.member.name} />
    </div>
    <div>
      <input className="input-field" placeholder={props.member.surname} />
    </div>
    <div>
      <input className="input-field" placeholder={props.member.description} />
    </div>
    <div>
      <button className="edit-button">Сохранить</button>
      <button className="edit-button">Удалить из активности</button>
      <button className="edit-button">Удалить совсем</button>
    </div>
  </div>
  );
}
