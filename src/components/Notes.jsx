import { useContext, useEffect, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      getNotes();
    } else {
      navigate("/login");
    }
  }, [getNotes, navigate]);

  const [note, setNote] = useState({
    etitle: "",
    edescription: "",
    etag: "",
    id: "",
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = (currentNote) => {
    setOpen(true);
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    handleClose();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <AddNote />
      
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-surface-900">Your Notes</h2>
        {Array.isArray(notes) && notes.length > 0 && (
          <span className="text-sm text-surface-500">{notes.length} note{notes.length !== 1 ? 's' : ''}</span>
        )}
      </div>

      {Array.isArray(notes) && notes.length === 0 ? (
        <div className="text-center py-16 animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-surface-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 110 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 11-4 0v-1a1 1 0 00-1-1H7a1 1 0 01-1-1V7a1 1 0 011-1h1a2 2 0 110-4H7a1 1 0 01-1-1V7a1 1 0 011-1h1V4z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-surface-900 mb-2">No notes yet</h3>
          <p className="text-surface-500 mb-6">Get started by creating your first note above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.isArray(notes) && notes.map((note) => (
            <NoteItem key={note._id} updateNote={handleClickOpen} note={note} />
          ))}
        </div>
      )}

      {/* Edit Dialog - Only rendered when open */}
      {open && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="edit-dialog-title" role="dialog" aria-modal="true">
          <div className="flex min-h-full items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
              onClick={handleClose}
              aria-hidden="true"
            />
            
            {/* Dialog Panel */}
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl animate-slide-up">
              <div className="flex items-center justify-between p-4 border-b border-surface-200">
                <h3 id="edit-dialog-title" className="text-lg font-semibold text-surface-900">Edit Note</h3>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-lg text-surface-400 hover:text-surface-600 hover:bg-surface-100 transition-colors"
                  aria-label="Close dialog"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-4 space-y-4">
                <div>
                  <label htmlFor="etitle" className="label">Title</label>
                  <input
                    type="text"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    required
                    minLength={5}
                    className="input"
                    autoFocus
                  />
                </div>
                
                <div>
                  <label htmlFor="edescription" className="label">Description</label>
                  <textarea
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    required
                    minLength={5}
                    rows={4}
                    className="input resize-y min-h-[100px]"
                  />
                </div>
                
                <div>
                  <label htmlFor="etag" className="label">Tag</label>
                  <input
                    type="text"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                    required
                    minLength={5}
                    className="input"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 p-4 border-t border-surface-200 bg-surface-50 rounded-b-2xl">
                <button
                  onClick={handleClose}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;