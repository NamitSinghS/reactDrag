import React from 'react';
import NotificationForm from './NotificationForm';
import ConditionForm from './ConditionForm';
import TaskForm from './TaskForm';

const NodesForm = ({formType, setFormVisibility}) => {

  return (
    <>
        {formType === "task" ? 
        (<TaskForm setFormVisibility={setFormVisibility} />) : formType === "condition" ? 
        (<ConditionForm setFormVisibility={setFormVisibility} />) : formType === "notification" ? 
        (<NotificationForm setFormVisibility={setFormVisibility} />) : null}
    </>
  )
}

export default NodesForm