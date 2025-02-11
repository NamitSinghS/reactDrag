// import { useReactFlow } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { useStore } from '../../store';


const selector = (store) => ({
    nodes: store.nodes,
    edges: store.edges,
});
 
const ExportFile = () => {
  const store = useStore(selector, shallow);
  // const { getNodes, getEdges } = useReactFlow();
 
  const handleExport = () => {
    const flowData = {
      nodes: store.nodes,
      edges: store.edges,
    };
 
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(flowData, null, 2)
    )}`;
 
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "workflow.json";
 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
 
  return <button className="bg-teal-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleExport}>Export Workflow</button>;
};

export default ExportFile;