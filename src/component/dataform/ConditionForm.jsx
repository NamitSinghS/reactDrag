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

const ConditionForm = ({setFormVisibility}) => {

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
            <label className="block text-gray-700 text-sm font-bold" htmlFor="conditionname">
                Condition Name
            </label>
            <input
                {...register("conditionname", { required: "Name is required" })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="conditionname"
                type="text"
                placeholder="Enter condition name"
            />
            {errors.conditionname && <p className="text-red-500 text-xs italic">{errors.conditionname.message}</p>}
            <label className="block text-gray-700 text-sm font-bold mt-2" htmlFor="conditionsignificance">
                Condition Significance
            </label>
            <select
                {...register("conditionsignificance", { required: "Significance is required" })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="conditionsignificance"
            >
                <option value="" disabled selected>
                    Select significance
                </option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>
            {errors.conditionsignificance && <p className="text-red-500 text-xs italic">{errors.conditionsignificance.message}</p>}
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

export default ConditionForm