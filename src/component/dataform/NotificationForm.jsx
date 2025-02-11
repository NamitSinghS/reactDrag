import React from 'react';
import { useForm } from "react-hook-form";
import { shallow } from 'zustand/shallow';
import { useStore } from '../../store';

const activeNodeSelector = (store) => ({
    activeNode: store.activeNode,
    resetActiveNode: store.resetActiveNode,
    resetNodes: store.resetNodes,
    updateNode: store.updateNode,
})

const NotificationForm = ({setFormVisibility}) => {

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
            <label className="block text-gray-700 text-sm font-bold" htmlFor="notificationname">
               Notification Name
            </label>
            <input
                {...register("notificationname", { required: "Name is required" })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="notificationname"
                type="text"
                placeholder="Enter notification name"
            />
            {errors.notificationname && <p className="text-red-500 text-xs italic">{errors.notificationname.message}</p>}
            <label className="block text-gray-700 text-sm font-bold mt-2" htmlFor="poptrigger">
                Notification trigger
            </label>
            <select
                {...register("poptrigger", { required: "Trigger is required" })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="poptrigger"
            >
                <option value="" disabled selected>
                    Select Notification Trigger
                </option>
                <option value="high">Create</option>
                <option value="medium">Update</option>
                <option value="low">Delete</option>
            </select>
            {errors.poptrigger && <p className="text-red-500 text-xs italic">{errors.poptrigger.message}</p>}
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

export default NotificationForm