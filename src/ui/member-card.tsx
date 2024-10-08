"use client";

import { ActivityMember } from "@/lib/definitions";
import "./member-card.css";
import { useState } from "react";
import {
  deleteMember,
  deleteMemberFromActivity,
  updateMember,
} from "@/lib/data";

interface IMemberCardProps {
  member: ActivityMember;
}

export default function MemberCard(props: IMemberCardProps) {
  const [currentInfo, setCurrentInfo] = useState(props.member);
  const handleSurnameChange = (event: any) => {
    const { value } = event.target;
    setCurrentInfo((prevModel) => ({ ...prevModel, surname: value }));
  };

  const handleNameChange = (event: any) => {
    const { value } = event.target;
    setCurrentInfo((prevModel) => ({ ...prevModel, name: value }));
  };

  const handleDescriptionChange = (event: any) => {
    console.log("handleInputChange called:", event.target);
    const { value } = event.target;
    setCurrentInfo((prevModel) => ({ ...prevModel, description: value }));
  };

  return (
  <div className="edit-area">
    <div className="editable-card">
      <div className="title">
        <h1>Изменить информацию об участнике</h1>
      </div>
      <div>
        <input
          className="input-field"
          value={currentInfo.name}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <input
          className="input-field"
          value={currentInfo.surname}
          onChange={handleSurnameChange}
        />
      </div>
      <div>
        <textarea
          className="input-field"
          value={currentInfo.description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="button-container">
        <button
          className="edit-button"
          onClick={() => updateMember(currentInfo)}
        >
          Сохранить
        </button>
        <button
          className="edit-button"
          onClick={() => deleteMemberFromActivity(0, currentInfo.id)}
        >
          Удалить из активности
        </button>
        <button
          className="edit-button"
          onClick={() => deleteMember(currentInfo.id)}
        >
          Удалить совсем
        </button>
      </div>
    </div>
  </div>
  );
}
