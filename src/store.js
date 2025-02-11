import { applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import { nanoid } from 'nanoid';
import { createWithEqualityFn } from 'zustand/traditional';
 
export const useStore = createWithEqualityFn((set, get) => ({
  nodes: [],
  edges: [],
  history: [],
  future: [],
  activeIndex: -1,

  incrementActiveIndex(){
   set({activeIndex: get().activeIndex + 1})
  },

  decrementActiveIndex(){
    set({activeIndex: get().activeIndex - 1})
  },

  activeNode: null,
  setActiveNode(node) {
    set({ activeNode: node });
  },
  resetActiveNode() {
    set({ activeNode: null });
  },

  createNode(type) {
    const id = nanoid();
    switch(type) {
      case 'task': {
        const position = { x: 0, y: 0 };
        let data = {taskname: '', asignee: '', asigneemail: '', duedate: ''}
        set({ nodes: [...get().nodes, { id, type, data, position }] });
        set({ history: [...get().history, {action:"AddNode", cont: { id, type, data, position }}]});
        set({ activeIndex: get().activeIndex + 1});
        break;
      }
      case 'condition': {
        const position = { x: 0, y: 0 };
        let data = {conditionname: '', conditionsignificance: ''}
        set({ nodes: [...get().nodes, { id, type, data, position }] });
        set({ history: [...get().history, {action:"AddNode", cont: { id, type, data, position }}]});
        set({ activeIndex: get().activeIndex + 1});
        break;
      }
      case 'notification': {
        const position = { x: 0, y: 0 };
        let data = {notificationname: '', poptrigger: ''}
        set({ nodes: [...get().nodes, { id, type, data, position }] });
        set({ history: [...get().history, {action:"AddNode", cont: { id, type, data, position }}]});
        set({ activeIndex: get().activeIndex + 1});
        break;
      }
    }
  },
 
  onNodesChange(changes) {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  updateNode(id, data) {
    set({
      nodes: get().nodes.map(node => node.id === id
          ? { ...node, data: { ...node.data, ...data } }
          : node
       )
    });
  },

  resetNodes(){
    set({nodes: []});
  },

  removeNode(nodes){
    console.log("node removed", nodes);
    nodes.forEach((node) => {
      set({ history: [...get().history, {action:"DeleteNode", cont: node}]});
      set({ activeIndex: get().activeIndex + 1});
    })
  },

  removeEdge(edges){
    console.log("edge removed", edges);
    edges.forEach((edge) => {
      set({ history: [...get().history, {action:"DeleteEdge", cont: edge}]});
      set({ activeIndex: get().activeIndex + 1});
    })
  },
 
  onEdgesChange(changes) {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  isValidConnection(connection, nodes){
    const sourceNode = nodes.find(node => node.id === connection.source);
    const targetNode = nodes.find(node => node.id === connection.target);
     
      if (!sourceNode || !targetNode) return false;
      
      return sourceNode.type !== targetNode.type; // Allow connection only if types are different
  },
 
  addEdge(data) {
    console.log("connection");
    console.log(data.source);
    console.log(data.target);
    console.log(get().isValidConnection(data, get().nodes));
    if(get().isValidConnection(data, get().nodes)){
      const id = nanoid(6);
      const edge = { id, ...data };
 
      set({ edges: [edge, ...get().edges] });
      set({ history: [...get().history, {action:"AddEdge", cont: edge}]});
      set({ activeIndex: get().activeIndex + 1});
    }
    else {
      alert("cannot connect nodes of same type")
    }
  },


   undo(){
    const canUndo = get().activeIndex > -1;
    if(canUndo){
      const { action, cont } = get().history[get().activeIndex] || {};
      set({ activeIndex: get().activeIndex - 1});
      switch (action) {
        case "AddNode": {
          //removeNode(data as Node, false);
          set({
            nodes: get().nodes.filter(node => node.id !== cont.id)
          });
          break;
        }
        case "AddEdge": {
          //removeEdge(data as Edge, false);
          set({
            edges: get().edges.filter(edge => edge.id !== cont.id)
          });
          break;
        }
        case "DeleteNode": {
          //addNode(data as Node, false);
          set({ nodes: [...get().nodes, cont] });
          break;
        }
        case "DeleteEdge": {
          //addEdge(data as Edge, false);
          set({ edges: [cont, ...get().edges] });
          break;
        }
      }
    }
   },


   redo(){
    const canRedo = get().activeIndex < get().history.length - 1;
    if (canRedo) {
      set({ activeIndex: get().activeIndex + 1});
      const { action, cont } = get().history[get().activeIndex] || {};
      switch (action) {
        case "AddNode": {
          //addNode(data as Node, false);
          set({ nodes: [...get().nodes, cont] });
          break;
        }
        case "AddEdge": {
          //addEdge(data as Edge, false);
          set({ edges: [cont, ...get().edges] });
          break;
        }
        case "DeleteNode": {
          //removeNode(data as Node, false);
          set({
            nodes: get().nodes.filter(node => node.id !== cont.id)
          });
          break;
        }
        case "DeleteEdge": {
          //removeEdge(data as Edge, false);
          set({
            edges: get().edges.filter(edge => edge.id !== cont.id)
          });
          break;
        }
      }
    }
   }

}));