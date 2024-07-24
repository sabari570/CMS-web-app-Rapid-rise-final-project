import { Link } from "react-router-dom";
import { handleImageUrl } from "../utils/helperFunctions.js";
import { MdDelete } from "react-icons/md";

export const columns = (onDelete) => [
  {
    header: "ID",
    accessorKey: "_id",
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => {
      return (
        <div className="contact-profile">
          <img
            crossOrigin="anonymous"
            src={handleImageUrl(row.original.profilePic)}
            alt="contact-avatar"
          />
          <span className="contact-name-text">{`${row.original.firstName} ${row.original.lastName}`}</span>
        </div>
      );
    },
  },
  {
    header: "Address",
    accessorKey: "address",
  },
  {
    header: "Company Name",
    accessorKey: "companyName",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      return (
        <div className="contact-working-status">
          <button className={`${row.original.status.toLowerCase()}`}>
            {row.original.status}
          </button>
        </div>
      );
    },
  },
  {
    header: "Phone",
    accessorKey: "phone",
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="contact-table-actions">
          <Link to={`/edit-contact/${row.original._id}`}>
            <button className="contact-edit-btn">Edit</button>
          </Link>
          <MdDelete
            onClick={() => onDelete(row.original._id)}
            className="contact-delete-btn"
          />
        </div>
      );
    },
  },
];
