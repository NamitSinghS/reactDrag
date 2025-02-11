import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { shallow } from 'zustand/shallow';
import { useStore } from '../../store';

const activeNodeSelector = (store) => ({
    activeNode: store.activeNode,
    resetActiveNode: store.resetActiveNode,
    resetNodes: store.resetNodes,
    updateNode: store.updateNode,
})

const TaskForm = ({setFormVisibility}) => {

    const { activeNode, resetActiveNode, resetNodes, updateNode } = useStore(activeNodeSelector, shallow);

   const { register, handleSubmit, formState: { errors } } = useForm();

   const onSubmit = (data) => {
      console.log(data);
      updateNode(activeNode.id, data);
      setFormVisibility(false);
      //resetActiveNode();
   }

  
  return (
    <form className="p-4 bg-gray-100 rounded shadow-md" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold" htmlFor="taskname">
                Task Name
            </label>
            <input
                {...register("taskname", { required: "Task Name is required" })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="taskname"
                type="text"
                placeholder="Enter task name"
            />
            {errors.taskname && <p className="text-red-500 text-xs italic">{errors.taskname.message}</p>}
            <label className="block text-gray-700 text-sm font-bold mt-2" htmlFor="asignee">
                Asignee
            </label>
            <input
                {...register("asignee", { required: "Asignee Name is required" })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="asignee"
                type="text"
                placeholder="Enter Asignee"
            />
            {errors.asignee && <p className="text-red-500 text-xs italic">{errors.asignee.message}</p>}
            <label className="block text-gray-700 text-sm font-bold mt-2" htmlFor="asigneemail">
                Asignee Email
            </label>
            <input
                {...register("asigneemail", { required: "Asignee email is required", pattern: {value: /^\S+@\S+$/i, message: "Email pattern incorrect"} })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="asigneemail"
                type="text"
                placeholder="Enter Asignee"
            />
            {errors.asigneemail && <p className="text-red-500 text-xs italic">{errors.asigneemail.message}</p>}
            <label className="block text-gray-700 text-sm font-bold mt-2" htmlFor="duedate">
                Due Date
            </label>
            <input
                {...register("duedate", { required: "Due Date required" })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="duedate"
                type="date"
            />
            {errors.duedate && <p className="text-red-500 text-xs italic">{errors.duedate.message}</p>}
        </div>
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
        >
            Submit
        </button>
    </form>
  )
}

export default TaskForm