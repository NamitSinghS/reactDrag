import React, { useState } from 'react';
import { ReactFlow, Background, Panel, Controls, useNodesState } from '@xyflow/react';
import { shallow } from 'zustand/shallow';
 
import { useStore } from './store';

import Task from './component/nodes/Task';
import Condition from './component/nodes/Condition';
import Notification from './component/nodes/Notification';
import CustomEdge from './component/updatededge/CustomEdge';
import NodesForm from './component/dataform/NodesForm';
import ExportFile from './component/exportimport/ExportFile';
import ImportFile from './component/exportimport/ImportFile';
import NodeTableData from './component/displayTable/NodeTableData';
import Samplet from './component/displayTable/Samplet';
 
const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
  createNode: store.createNode,
  setActiveNode: store.setActiveNode,
  removeNode: store.removeNode,
  removeEdge: store.removeEdge,
  undo: store.undo,
  redo: store.redo,
});

const edgeTypes = {
  'custom-edge': CustomEdge
}

const nodeTypes = {
  task: Task,
  condition: Condition,
  notification: Notification,
};
 
export default function App() {
  const store = useStore(selector, shallow);
  const [formVisibility, setFormVisibility] = useState(false);
  const [formType, setFormType] = useState('');
  const [tableVisibility, setTableVisibility] = useState(false);

  const [nodes, setNodes] = useNodesState(store.nodes);

  const onNodeClick = (event, node) => {
    console.log(node);
    setFormVisibility(true);
    setFormType(node.type);
    store.setActiveNode(node);
  };
 
  return (
    <ReactFlow
      nodes={store.nodes}
      nodeTypes={nodeTypes}
      edges={store.edges}
      onNodesChange={store.onNodesChange}
      onEdgesChange={store.onEdgesChange}
      onConnect={store.addEdge}
      edgeTypes={edgeTypes}
      onNodeClick={onNodeClick}
      onNodesDelete={store.removeNode}
      onEdgesDelete={store.removeEdge}
    >
      <Panel position="top-right">
        <div id="contd" className="flex justify-between">
          <button 
            className="bg-teal-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => store.createNode('task')}
          >
           Task
          </button>
          <button 
            className="bg-teal-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => store.createNode('condition')}
          >
           Condition
          </button>
          <button 
            className="bg-teal-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => store.createNode('notification')}
          >
           Notification
          </button>
          <button 
            className="bg-teal-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => setTableVisibility(true)}
          >
           Show Table
          </button>
          <ExportFile />
          <ImportFile />
        </div>
      </Panel>
      {formVisibility && (<Panel position="bottom-right">
         <NodesForm 
            formType={formType} 
            setFormVisibility={setFormVisibility} 
         />
      </Panel>)}
      {tableVisibility && <Panel position="top-left" className="bg-white">
        <button 
            className="text-black font-bold rounded ml-2"
            onClick={() => setTableVisibility(false)}
          >
           X
          </button>
        {store.nodes.length > 0 ?(<NodeTableData />) : <h2 className="text-2xl font-extrabold mb-2">No data in Table</h2>}
      </Panel>}
      <Panel position="bottom-left">
         <button 
            className="bg-teal-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => store.undo()}
         >
          Undo
         </button>
         <button 
            className="bg-teal-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => store.redo()}
         >
          Redo
         </button>
      </Panel>
      
      <Background />
    </ReactFlow>
  );
}