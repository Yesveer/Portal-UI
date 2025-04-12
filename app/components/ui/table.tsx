// components/Table.js
import React from "react";
import { useTable, usePagination, useRowSelect } from "react-table";
import { motion, AnimatePresence } from "framer-motion";

const IndeterminateCheckbox = ({ indeterminate, ...rest }) => {
    const ref = React.useRef();

    React.useEffect(() => {
        if (typeof indeterminate === "boolean") {
            ref.current.indeterminate = !rest.checked && indeterminate;
        }
    }, [ref, indeterminate]);

    return (
        <input
            type="checkbox"
            ref={ref}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            {...rest}
        />
    );
};

const Table = ({ columns, data, onEditClick, onViewClick, onDeleteClick }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize, selectedRowIds }
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 5 }
        },
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => [
                {
                    id: "selection",
                    Header: ({ getToggleAllPageRowsSelectedProps }) => (
                        <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                    ),
                    Cell: ({ row }) => (
                        <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                    )
                },
                ...columns
            ]);
        }
    );

    return (
        <div className="p-4 bg-white rounded-lg border border-gray-300">
            <div className="overflow-x-auto">
                <div className="max-h-[600px] overflow-y-auto rounded-xl">
                    <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100 sticky top-0 z-10">
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th key={column.id} 
                                            {...column.getHeaderProps()}
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {column.render("Header")}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody
                            {...getTableBodyProps()}
                            className="bg-white divide-y divide-gray-200"
                        >
                            <AnimatePresence>
                                {page.map((row, i) => {
                                    prepareRow(row);
                                    return (
                                        <motion.tr
                                        key={row.id}
                                            {...row.getRowProps()}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className={`${row.isSelected ? "bg-blue-50" : ""} hover:bg-gray-50`}
                                        >
                                            {row.cells.map(cell => {
                                                if (cell.column.Header === "Actions") {
                                                    return (
                                                        <td key={cell.column.id}
                                                            {...cell.getCellProps()}
                                                            className="px-1 py-1 absolute whitespace-nowrap text-sm text-gray-500"
                                                        >
                                                            {cell.render("Cell")}
                                                        </td>
                                                    );
                                                }
                                                return (
                                                    <td key={cell.column.id}
                                                        {...cell.getCellProps()}
                                                        className="px-6 py-3 whitespace-nowrap text-sm text-gray-500"
                                                    >
                                                        {cell.render("Cell")}
                                                    </td>
                                                );
                                            })}
                                        </motion.tr>
                                    );
                                })}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="py-3 flex items-center justify-between">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div className="flex gap-x-2 items-center">
                        <span className="text-sm text-gray-700">
                            Rows per page:{" "}
                            <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}
                                className="ml-2 border rounded px-2 py-1">
                                {[5, 10, 20].map(size => <option key={size} value={size}>{size}</option>)}
                            </select>
                        </span>
                    </div>
                    <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                            <button
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                Previous
                            </button>
                            {Array.from(Array(pageCount).keys()).map(number => (
                                <button
                                    key={number}
                                    onClick={() => gotoPage(number)}
                                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${pageIndex === number ? "bg-blue-50 text-blue-600" : "text-gray-500"} hover:bg-gray-50`}
                                >
                                    {number + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => nextPage()}
                                disabled={!canNextPage}
                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                Next
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;










// "use client"

// import React, { useState } from "react"
// import { useTable, usePagination, useRowSelect } from "react-table"
// import { motion, AnimatePresence } from "framer-motion"
// import { Trash2 } from "lucide-react"
// import { Button } from "~/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "~/components/ui/dialog"

// const IndeterminateCheckbox = ({ indeterminate, ...rest }) => {
//   const ref = React.useRef()

//   React.useEffect(() => {
//     if (typeof indeterminate === "boolean") {
//       ref.current.indeterminate = !rest.checked && indeterminate
//     }
//   }, [ref, indeterminate, rest.checked])

//   return (
//     <input
//       type="checkbox"
//       ref={ref}
//       className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
//       {...rest}
//     />
//   )
// }

// interface TableProps {
//   columns: any[]
//   data: any[]
//   onEditClick?: (row: any) => void
//   onViewClick?: (row: any) => void
//   onDeleteClick?: (row: any) => void
//   onBulkDelete?: (selectedRows: any[]) => void
// }

// export function EnhancedTable({ columns, data, onEditClick, onViewClick, onDeleteClick, onBulkDelete }: TableProps) {
//   const [isConfirmOpen, setIsConfirmOpen] = useState(false)

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     prepareRow,
//     page,
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     pageCount,
//     gotoPage,
//     nextPage,
//     previousPage,
//     setPageSize,
//     selectedFlatRows,
//     state: { pageIndex, pageSize },
//   } = useTable(
//     {
//       columns,
//       data,
//       initialState: { pageIndex: 0, pageSize: 5 },
//     },
//     usePagination,
//     useRowSelect,
//     (hooks) => {
//       hooks.visibleColumns.push((columns) => [
//         {
//           id: "selection",
//           Header: ({ getToggleAllPageRowsSelectedProps }) => (
//             <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
//           ),
//           Cell: ({ row }) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />,
//         },
//         ...columns,
//       ])
//     },
//   )

//   const selectedRows = selectedFlatRows.map((row) => row.original)
//   const hasSelection = selectedRows.length > 0

//   const handleBulkDelete = () => {
//     if (onBulkDelete) {
//       onBulkDelete(selectedRows)
//     }
//     setIsConfirmOpen(false)
//   }

//   return (
//     <div className="relative">
//       <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
//         <div className="overflow-x-auto">
//           <div className="max-h-[600px] overflow-y-auto rounded-xl">
//             <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50 sticky top-0 z-10">
//                 {headerGroups.map((headerGroup) => (
//                   <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
//                     {headerGroup.headers.map((column) => (
//                       <th
//                         key={column.id}
//                         {...column.getHeaderProps()}
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         {column.render("Header")}
//                       </th>
//                     ))}
//                   </tr>
//                 ))}
//               </thead>
//               <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
//                 <AnimatePresence>
//                   {page.map((row) => {
//                     prepareRow(row)
//                     return (
//                       <motion.tr
//                         key={row.id}
//                         {...row.getRowProps()}
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className={`${row.isSelected ? "bg-primary-50" : ""} hover:bg-gray-50`}
//                       >
//                         {row.cells.map((cell) => {
//                           return (
//                             <td
//                               key={cell.column.id}
//                               {...cell.getCellProps()}
//                               className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${
//                                 cell.column.Header === "Actions" ? "w-32" : ""
//                               }`}
//                             >
//                               {cell.render("Cell")}
//                             </td>
//                           )
//                         })}
//                       </motion.tr>
//                     )
//                   })}
//                 </AnimatePresence>
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div className="py-3 flex items-center justify-between">
//           <div className="flex-1 flex items-center justify-between flex-wrap gap-4">
//             <div className="flex gap-x-2 items-center">
//               <span className="text-sm text-gray-700">
//                 Showing page {pageIndex + 1} of {pageOptions.length} | Rows per page:{" "}
//                 <select
//                   value={pageSize}
//                   onChange={(e) => setPageSize(Number(e.target.value))}
//                   className="ml-1 border rounded px-2 py-1 text-sm"
//                 >
//                   {[5, 10, 20, 50].map((size) => (
//                     <option key={size} value={size}>
//                       {size}
//                     </option>
//                   ))}
//                 </select>
//               </span>
//             </div>
//             <div>
//               <nav className="relative gap-2 z-0 inline-flex -space-x-px">
//                 <Button
//                   variant="outline"
//                   onClick={() => previousPage()}
//                   disabled={!canPreviousPage}
                 
//                   size="sm"
//                 >
//                   Previous
//                 </Button>
//                 <div className="flex">
//                   {Array.from(Array(pageCount).keys())
//                     .slice(Math.max(0, pageIndex - 2), Math.min(pageCount, pageIndex + 3))
//                     .map((number) => (
//                       <Button
                      
//                         key={number}
//                         onClick={() => gotoPage(number)}
//                         variant={pageIndex === number ? "default" : "outline"}
                       
//                         size="sm"
//                       >
//                         {number + 1}
//                       </Button>
//                     ))}
//                 </div>
//                 <Button
//                   variant="outline"
//                   onClick={() => nextPage()}
//                   disabled={!canNextPage}
                  
//                   size="sm"
//                 >
//                   Next
//                 </Button>
//               </nav>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Selection Action Bar */}
//       <AnimatePresence>
//         {hasSelection && (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 50 }}
//             className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
//           >
//             <div className="bg-white px-6 py-4 rounded-lg shadow-lg border border-gray-200 flex items-center gap-4">
//               <span className="text-sm font-medium">
//                 {selectedRows.length} {selectedRows.length === 1 ? "item" : "items"} selected
//               </span>
//               <Button
//                 variant="destructive"
//                 size="sm"
//                 onClick={() => setIsConfirmOpen(true)}
//                 className="flex items-center gap-2"
//               >
//                 <Trash2 size={16} />
//                 Delete Selected
//               </Button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Confirmation Dialog */}
//       <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Confirm Deletion</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to delete {selectedRows.length} {selectedRows.length === 1 ? "item" : "items"}? This
//               action cannot be undone.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={handleBulkDelete}>
//               Delete
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }

// export default EnhancedTable
