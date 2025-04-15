"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { FiMoreVertical, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import { TbReload } from "react-icons/tb";
import { FcEmptyTrash } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import Table from "~/components/ui/table";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { EventsEditDrawer } from "./eventedit";
import { EventsAlertDelete } from "./AlertDelete";
import { fetchAllEvents } from "~/routes/ERP/Events/api";
import { EventDialog } from "./CreateEventDialog";

const ERPEventsMolecule = () => {
  const [data, setData] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const dropdownRefs = useRef<{ [key: number]: HTMLElement }>({});
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const { success, data, error } = await fetchAllEvents();
        if (success && data) {
          setData(data);
        } else {
          console.error("Failed to fetch events:", error);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [refreshKey]);

  

  const handleDropdownToggle = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleEditClick = (event: Event) => {
    setSelectedEvent(event);
    setIsEditOpen(true);
    setActiveDropdown(null);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = useMemo(() => {
    return data.filter((event) => {
      const titleMatch =
        event.title?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
      const locationMatch =
        event.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        false;
      const createdByName = event.createdBy?.name?.toLowerCase() || "";
      const createdByMatch = createdByName.includes(searchTerm.toLowerCase());

      return titleMatch || locationMatch || createdByMatch;
    });
  }, [data, searchTerm]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
        Cell: ({ row }: { row: { original: Event } }) => (
          <Link to={`/erp/events/${row.original._id}`}>
            {row.original.title || "Untitled Event"}
          </Link>
        ),
      },
      {
        Header: "Start Date",
        accessor: "startDate",
        Cell: ({ row }: { row: { original: Event } }) =>
          row.original.startDate ? formatDate(row.original.startDate) : "No date",
      },
      
      {
        Header: "Location",
        accessor: "location",
        Cell: ({ row }: { row: { original: Event } }) =>
          row.original.location || "No location",
      },
      {
        Header: "Created By",
        accessor: "createdBy",
        Cell: ({ row }: { row: { original: Event } }) =>
          row.original.createdBy?.name || "Unknown",
      },
      {
        Header: "Actions",
        Cell: ({ row }: { row: { index: number; original: Event } }) => (
          <td className="px-6 py-0 whitespace-nowrap text-sm text-gray-500">
            <div
              className="absolute"
              ref={(el) => {
                if (el) dropdownRefs.current[row.index] = el;
              }}
            >
              <button
                onClick={() => handleDropdownToggle(row.index)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <FiMoreVertical className="h-5 w-5" />
              </button>
              {activeDropdown === row.index && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  <div className="py-1">
                    <EventDialog id={row.original._id} mode="update" initialData={row.original}  >
                    <button
                    
                      
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    >
                      <FiEdit2 className="mr-2" /> Edit Event
                    </button>
                    </EventDialog>
                   
                    <button
                      onClick={() =>
                        navigate(`/erp/events/${row.original._id}`)
                      }
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    >
                      <FiEye className="mr-2" /> View Details
                    </button>
                    <EventsAlertDelete
                      eventId={row.original._id}
                      eventTitle={row.original.title}
                      onSuccess={() => setRefreshKey((prev) => prev + 1)}
                    >
                      <button className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full">
                        <FiTrash2 className="mr-2" /> Delete
                      </button>
                    </EventsAlertDelete>
                  </div>
                </div>
              )}
            </div>
          </td>
        ),
      },
    ],
    [activeDropdown, navigate]
  );

  if (loading) {
    return <div className="p-4">Loading events...</div>;
  }

  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-10 border rounded-lg"
    >
      <div className="flex items-center justify-center">
        <FcEmptyTrash size={60} />
      </div>
      <h3 className="text-lg font-medium text-gray-900 pt-5">
        No Events Available
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new event.
      </p>
    </motion.div>
  );

  return (
    <div className=" p-6">
      <div className="sm:flex sm:items-center sm:justify-between mb-4">
        <div className="sm:mt-0 flex inline-flex items-center gap-2">
          <EventDialog mode="create" >
            <Button type="button" variant="outline">+ Add Event</Button>
          </EventDialog>

          <Button
            variant="outline"
            onClick={() => setRefreshKey((prev) => prev + 1)}
          >
            <TbReload /> Reload
          </Button>
        </div>
        <div className="mt-4 sm:mt-0">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-2 py-1 border border-gray-200 rounded-md"
          />
        </div>
      </div>

      {filteredData.length === 0 ? (
        <EmptyState />
      ) : (
        <Table
          columns={columns}
          data={filteredData}
          onViewClick={(id) => navigate(`/erp/events/${id}`)}
        />
      )}

      
    </div>
  );
};

export default ERPEventsMolecule;
