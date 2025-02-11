// import { useReactFlow } from "reactflow";
import { useReactFlow } from "@xyflow/react";
import { useState } from "react";
 
const ImportFile = () => {
  const { setNodes, setEdges } = useReactFlow();
  const [fileInput, setFileInput] = useState(null);
 
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
 
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.nodes && data.edges) {
          setNodes(data.nodes);
          setEdges(data.edges);
        } else {
          alert("Invalid JSON format");
        }
      } catch (error) {
        alert("Error parsing JSON file");
      }
    };
    reader.readAsText(file);
  };
 
  return (
    <div>
      <input
        type="file"
        accept="application/json"
        onChange={handleFileChange}
        ref={(input) => setFileInput(input)}
        style={{ display: "none" }}
      />
      <button className="bg-teal-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => fileInput && fileInput.click()}>
        Import Workflow
      </button>
    </div>
  );
};

export default ImportFile;