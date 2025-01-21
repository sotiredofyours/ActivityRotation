import { createActivity, updateActivity } from "@/lib/data";
import { Activity } from "@/lib/definitions";
import {
  Box,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { useState, useEffect, useCallback, useMemo } from "react";

interface IEditActivityProps {
  activity?: Activity;
  isOpen: boolean;
  closeDialog: () => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 12,
  pt: 2,
  px: 4,
  pb: 3,
};

export function EditActivityDialog(props: IEditActivityProps) {
  const [currentActivity, setCurrentActivity] = useState<Activity>({
    title: '',
    description: '',
    period: 7,
    day: 0,
    id: 0
  });

  const isCreationDialog: boolean = useMemo(() => !props.activity, [ props.activity ]);

  useEffect(() => {
    if (!props.isOpen && props.activity) {
      setCurrentActivity(props.activity);
    }
  }, [props.activity, props.isOpen]);



  const handlePeriodChange = (event: any) => {
    const { value } = event.target;
    setCurrentActivity((prevModel) => ({ ...prevModel, period: value }));
  };

  const handleTitleChange = (event: any) => {
    const { value } = event.target;
    console.log('title changed');
    setCurrentActivity((prevModel) => ({ ...prevModel, title: value }));
  };

  const handleDayChange = (event: any) => {
    const { value } = event.target;
    setCurrentActivity((prevModel) => ({ ...prevModel, day: value }));
  };

  const handleDescriptionChange = (event: any) => {
    const { value } = event.target;
    setCurrentActivity((prevModel) => ({ ...prevModel, description: value }));
  };

  return (
    <Modal open={props.isOpen} onClose={props.closeDialog}>
      <Box sx={style}>
        <h1>Изменить информацию об активности</h1>
        <TextField
          label="Название активности"
          variant="outlined"
          className="input-field"
          value={currentActivity?.title ?? ''}
          onChange={handleTitleChange}
        />
        <TextField
          label="Описание активности"
          variant="outlined"
          className="input-field"
          multiline
          rows={4}
          value={currentActivity?.description ?? ''}
          onChange={handleDescriptionChange}
        />
        <div className="input-field">
          <InputLabel id="label">Период</InputLabel>
          <Select
            labelId="label"
            value={currentActivity?.period ?? '7'}
            fullWidth
            onChange={handlePeriodChange}
          >
            <MenuItem value="7">Раз в неделю</MenuItem>
            <MenuItem value="14">Раз в две недели</MenuItem>
          </Select>
        </div>
        <div className="input-field">
          <InputLabel id="label">День недели</InputLabel>
          <Select
            labelId="label"
            value={currentActivity?.day ?? '0'}
            fullWidth
            onChange={handleDayChange}
          >
            <MenuItem value="0">Понедельник</MenuItem>
            <MenuItem value="1">Вторник</MenuItem>
            <MenuItem value="2">Среда</MenuItem>
            <MenuItem value="3">Четверг</MenuItem>
            <MenuItem value="4">Пятница</MenuItem>
          </Select>
        </div>
        <div className="button-container">
          <button className="edit-button" onClick={() => {
            if (isCreationDialog)
              createActivity(currentActivity);
            else
              updateActivity(currentActivity);
            props.closeDialog();
          }}>
            Сохранить
          </button>
          <button className="edit-button" onClick={() => { props.closeDialog() }}>
            Отмена
          </button>
        </div>
      </Box>
    </Modal>
  );
}
