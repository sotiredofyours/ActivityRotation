"use client";

import { ActivityMember } from "@/lib/definitions";
import "./member-card.css";
import { useEffect, useState } from "react";
import {
  addMemberToActivity,
  createMember,
  deleteMember,
  deleteMemberFromActivity,
  updateMember,
} from "@/lib/data";
import { TextField } from "@mui/material";

interface IMemberCardProps {
  member: ActivityMember;
  activityId: number;
  updateMemberList: (card: ActivityMember) => void;
}

export default function MemberCard(props: IMemberCardProps) {
  const [currentMember, setCurrentMember] = useState(props.member);

  useEffect(() => {
    setCurrentMember(props.member);
  }, [props.member]);

  const handleSurnameChange = (event: any) => {
    const { value } = event.target;
    setCurrentMember((prevModel) => ({ ...prevModel, surname: value }));
  };

  const handleNameChange = (event: any) => {
    const { value } = event.target;
    setCurrentMember((prevModel) => ({ ...prevModel, name: value }));
  };

  const handleDescriptionChange = (event: any) => {
    const { value } = event.target;
    setCurrentMember((prevModel) => ({ ...prevModel, description: value }));
  };

  return (
    <div className="edit-area">
      <div className="editable-card">
        <div className="title">
          <h1>Изменить информацию об участнике</h1>
        </div>
        <div>
          <TextField
            label="Имя"
            variant="outlined"
            className="input-field"
            value={currentMember.name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <TextField
            label="Фамилия"
            variant="outlined"
            className="input-field"
            value={currentMember.surname}
            onChange={handleSurnameChange}
          />
        </div>
        <div>
          <TextField
            multiline
            variant="outlined"
            label="Описание"
            rows={4}
            className="input-field"
            value={currentMember.description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="button-container">
          <button
            className="edit-button"
            onClick={() => {
              updateMember(currentMember);
              props.updateMemberList(currentMember);
            }}
          >
            Сохранить
          </button>
          <button
            className="edit-button"
            onClick={() =>
              deleteMemberFromActivity(props.activityId, currentMember.id)
            }
          >
            Удалить из активности
          </button>
          <button
            className="edit-button"
            onClick={() => deleteMember(currentMember.id)}
          >
            Удалить совсем
          </button>
          <button
            className="edit-button"
            onClick={async () => {
              const newMemberId = await createMember(currentMember);
              addMemberToActivity(props.activityId, newMemberId, new Date());
            }}
          >
            Добавить новичка
          </button>
        </div>
      </div>
    </div>
  );
}
