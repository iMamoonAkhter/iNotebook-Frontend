import { useContext } from "react";
import NoteContext from "../context/notes/noteContext";

const NoteItem = ({ note, updateNote }) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;

  // Convert date string to Date object
  const getTime = new Date(note.date);

  // Format date and time (e.g., Aug 25, 2024 9:28 PM)
  const formattedDateTime = getTime.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="border rounded p-3 mb-3 bg-light" style={{ width: "100%" }}>
      <p className="text-muted mb-2" style={{ fontSize: "0.5rem" }}>
        {formattedDateTime}
      </p>
      <h5 className="mb-2">{note.title}</h5>
      <p className="text-muted mb-3">{note.description}</p>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-danger me-2"
          onClick={() => deleteNote(note._id)}
        >
          <i className="fa fa-trash"></i> Delete
        </button>
        <button
          className="btn btn-primary"
          onClick={() => updateNote(note)}
        >
          <i className="fa fa-edit"></i> Edit
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
