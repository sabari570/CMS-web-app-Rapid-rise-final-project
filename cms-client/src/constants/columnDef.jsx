import { handleImageUrl } from "../utils/helperFunctions.js";

export const columns = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => {
      return (
        <div className="contact-profile">
          <img
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
];
