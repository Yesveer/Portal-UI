import { formatDate } from "date-fns";
import { EditIcon } from "lucide-react";

export const generateColumnsOrder = (data: any[]): any[] => {
    if (!data || data?.length === 0) {
      console.error("Data is empty or undefined!");
      return [];
    }
  
    console.log(data, "tabledataaknjkabjdbajk");
  
    const sample = data?.[0] || [];
  
    const columns = Object.keys(sample)
      .filter((key) => key !== "_id") // Filter out '_id' key
      .map((key) => {
          function formatHeader(key: string): import("react").ReactNode {
              throw new Error("Function not implemented.");
          }

        return {
          header: (
            <span key={key} className="capitalize text-center font-bold">
              {formatHeader(key)}
            </span>
          ),
          accessorKey: key,
          id: key, // Ensure each column has a unique id
          cell: ({ cell }: { cell: any }) => {
            const value = cell.getValue();
            if (
              typeof value === "string" &&
              /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(value)
            ) {
              return <div className="text-center">{formatDate(value)}</div>;
            }
  
            if (typeof value === "boolean") {
              return <div className="text-center">{value.toString()}</div>;
            }
  
            if (Array.isArray(value) && value.length > 0) {
              // Checking if the array has the `is_aasigned` property for the first element
              if (value[0]?.is_aasigned !== undefined) {
                return (
                  <div className="text-center">
                    {value[0].is_aasigned.toString()}
                  </div>
                );
              }
              return (
                <div className="text-center">
                  Array has no 'is_aasigned' property
                </div>
              );
            }
  
            // Check for object and avoid direct rendering if not handled
            if (typeof value === "object" && value !== null) {
              return <div className="text-center">Object</div>;
            }
  
            return (
              <div className="text-center">
                {value?.toString() || "Invalid value"}
              </div>
            );
          },
        };
      })
      .flat();
    return [
      {
        accessorKey: "_id",
        header: () => <div className="text-center">Action</div>,
        id: "_id", // Ensure the action column has a unique id
        cell: ({ row }: { row: any }) => (
          <div className=" flex justify-center gap-2 items-center">
            <EditIcon
              onClick={() => navigate(`/update-staff/${row.getValue("_id")}`)}
              className=" p-1.5 cursor-pointer w-8 h-8"
            />
            {/* <Trash2Icon className=" p-1.5 hover:bg-slate-300 cursor-pointer rounded-full w-8 h-8"/> */}
          </div>
        ),
      },
      ...columns,
    ];
  };