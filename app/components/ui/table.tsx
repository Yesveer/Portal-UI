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