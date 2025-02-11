import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
 
function CustomNode({ id, data }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-lime-200 border-2 border-lime-400">
      <div className="flex">
         {data?.conditionname ? data?.conditionname : "CONDITION"}
      </div>
 
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-teal-500 !w-4 !h-4"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-teal-500 !w-4 !h-4"
      />
    </div>
  );
}
 
export default memo(CustomNode);
