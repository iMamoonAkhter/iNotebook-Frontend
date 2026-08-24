import { useContext } from "react";
import NoteContext from "../context/notes/noteContext";

const NoteItem = ({ note, updateNote }) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;

  const getTime = new Date(note.date);
  const formattedDateTime = getTime.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="card-padded hover:shadow-card-hover transition-all duration-300 group">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-surface-500 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
            {formattedDateTime}
          </p>
          <h3 className="text-lg font-semibold text-surface-900 line-clamp-1">{note.title}</h3>
        </div>
        {note.tag && (
          <span className="badge-primary flex-shrink-0 mt-0.5 whitespace-nowrap">
            {note.tag}
          </span>
        )}
      </div>
      
      <p className="text-surface-600 text-sm leading-relaxed line-clamp-3 mb-4">
        {note.description}
      </p>

      <div className="flex items-center justify-end gap-2 pt-3 border-t border-surface-100">
        <button
          onClick={() => updateNote(note)}
          className="btn-ghost btn-sm gap-1.5"
          aria-label="Edit note"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span>Edit</span>
        </button>
        
        <button
          onClick={() => deleteNote(note._id)}
          className="btn-danger btn-sm gap-1.5"
          aria-label="Delete note"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default NoteItem;