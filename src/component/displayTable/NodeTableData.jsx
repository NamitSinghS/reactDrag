import React, {useState, useEffect} from 'react'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { shallow } from 'zustand/shallow';
import { useStore } from '../../store';
import { useVirtualizer } from '@tanstack/react-virtual';


const selector = (store) => ({
    nodes: store.nodes,
});


const TableCell = ({ getValue, row, column, table }) => {
    const initialValue = getValue();
    const columnMeta = column.columnDef.meta;
    const tableMeta = table.options.meta;
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    const onBlur = () => {
        console.log("rrts");
        console.log(row.index,column.id, value);
        let updatedColId = column.id
        if(column.id.includes("data_")){
            updatedColId =  updatedColId.replace("data_", '')
        }
        //console.log(row.index, updatedColId, value);
        tableMeta?.updateData(row.index, updatedColId, value);
    };

    const onSelectChange = (e) => {
        setValue(e.target.value);
        tableMeta?.updateData(row.index, column.id, e.target.value);
      };

    return columnMeta?.type === "select" ? (
        <select onChange={onSelectChange} value={initialValue}>
          {columnMeta?.options?.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      ) : (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
          type={columnMeta?.type || "text"}
        />
      );
  };


  const SubmitCell = ({row, table}) => {
    let val = table.options.meta?.stateDataVal.apprState;
    const updateNode = () => {
        console.log("clicked on row ",val);
    }

     return <button onClick={updateNode} className="bg-teal-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
     >Update</button>
  }


const columnHelper = createColumnHelper();

const columns = [
  columnHelper.display({
        id: "edit",
        cell: SubmitCell,
    }),
  columnHelper.accessor("id", {
    header: "ID",
    cell: TableCell,
    meta: {
        type: "text"
    },
  }),
  columnHelper.accessor("type", {
    header: "Type",
    cell: TableCell,
    meta: {
        type: "text"
    },
  }),
  columnHelper.accessor("data.taskname", {
    header: "Taskname",
    cell: TableCell,
    meta: {
        type: "text"
    },
  }),
  columnHelper.accessor("data.conditionname", {
    header: "Condition",
    cell: TableCell,
    meta: {
        type: "text"
    },
  }),
  columnHelper.accessor("data.notificationname", {
    header: "Notification",
    cell: TableCell,
    meta: {
        type: "text"
    },
  }),
  columnHelper.accessor("position.x", {
    header: "X",
    cell: TableCell,
    meta: {
        type: "text"
    },
  }),
  columnHelper.accessor("position.y", {
    header: "Y",
    cell: TableCell,
    meta: {
        type: "text"
    },
  }),
];

const NodeTableData = () => {
    const store = useStore(selector, shallow);
    const [data, setData] = useState(() => [...store.nodes]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        meta: {
          updateData: (rowIndex, columnId, value) => {
            setData((old) =>
              old.map((row, index) => {
                if (index === rowIndex) {
                  return {
                    ...old[rowIndex],
                    [columnId]: value,
                  };
                }
                return row;
              })
            );
          },
          stateDataVal: {apprState: data}
        },
      });


    const { rows } = table.getRowModel()
   const parentRef = React.useRef(null)

   const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 30,
  })


      return (
        <div ref={parentRef} className="max-w-screen max-h-screen min-h-24 overflow-auto p-4 bg-white shadow-md rounded-lg mb-2">
    <div style={{ height: `${virtualizer.getTotalSize()}px` }} className="max-w-[80vw] max-h-[80vh] min-h-32 overflow-auto border border-gray-300 rounded-lg">
    <table className="w-full border-collapse">
        <thead className="bg-gray-100">
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="border-b border-gray-200">
                    {
                       headerGroup.headers.map(header => (
                            <th key={header.id} className="px-4 py-2 text-left text-gray-700 font-semibold uppercase">
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                       )) 
                    }
                </tr>
            ))}
        </thead>
        <tbody>
           {
              virtualizer.getVirtualItems().map((virtualRow, index) => {
                const row = rows[virtualRow.index]
                return (
                    <tr
                    key={row.id}
                    className="border-b-2 border-gray-200"
                    style={{
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${
                          virtualRow.start - index * virtualRow.size
                        }px)`,
                      }}
                    >

              {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className="px-4 py-2 text-gray-600">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    )
                  })}

                    </tr>
                )
              })
           }

        </tbody>
    </table>
    {/*<div>{JSON.stringify(data, null, "\t")}</div>*/}
    </div>
    </div>
      );
}

export default NodeTableData