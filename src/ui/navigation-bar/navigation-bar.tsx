'use client'

import { Activity } from "@/lib/definitions";

import "./navigation-bar.css";
import Link from "next/link";
import Image from "next/image";
import { deleteActivity } from "@/lib/data";
import React from "react";
import { EditActivityDialog } from "../edit-activity-dialog/edit-activity-dialog";

interface INavigationBarProps {
  activities: Array<Activity>;
  linkTo: string;
  needEditButtons: boolean;
}

export function NavigationBar(props: INavigationBarProps) {
  const [editModalIsOpen, setEditModalIsOpen] = React.useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = React.useState(false);

  function openEditModal() {
    setEditModalIsOpen(true);
  }

  function closeEditModal() {
    setEditModalIsOpen(false);
  }

  function openDeleteModal() {
    setDeleteModalIsOpen(true);
  }

  function closeDeleteModal() {
    setDeleteModalIsOpen(false);
  }

  const renderActionButtons = (activity: Activity) => {
    if (props.needEditButtons) {
      return (
        <>
          <Image
            className="edit-btn"
            src={"/edit-button.svg"}
            alt="edit button"
            width={24}
            height={24}
            onClick={() => {
              openEditModal();
            }}
          />
          <EditActivityDialog activity={activity} closeDialog={closeEditModal} isOpen={editModalIsOpen} />
          <Image
            onClick={() => {
              deleteActivity(activity.id)
            }}
            className="delete-btn"
            src={"/delete-button.svg"}
            alt="delete button"
            width={24}
            height={24}
          />
        </>
      );
    }
    return null;
  };

  const renderAddButton = () => {
    if (props.needEditButtons)
      return (
        <div className="navigation-item add-button">
          <Image
            className="add-btn"
            src={"/add-button.svg"}
            alt="add button"
            width={24}
            height={24}
            onClick={() => {
              openDeleteModal();
            }}
          />
          <EditActivityDialog closeDialog={closeDeleteModal} isOpen={deleteModalIsOpen} />
        </div>
      );
    return null;
  };

  const renderActivities = props.activities.map((x) => {
    return (
      <div key={x.id} className="navigation-item">
        <Link href={`${props.linkTo}${x.id}`} className="activity-link">
          {x.title}
        </Link>
        <div className="action-buttons">{renderActionButtons(x)}</div>
      </div>
    );
  });

  return (
    <nav className="navigation-bar-container">
      {renderActivities}
      {renderAddButton()}
    </nav>
  );
}
