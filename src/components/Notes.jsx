import { useContext, useEffect, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

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
    <Container>
      <AddNote />
      <Typography variant="h4" gutterBottom>
        Your Notes
      </Typography>
      {Array.isArray(notes) && notes.length === 0 && (
        <Typography variant="h6">No notes to display</Typography>
      )}
      <div className="d-flex flex-column align-items-stretch">
        {Array.isArray(notes) && notes.map((note) => (
          <NoteItem key={note._id} updateNote={handleClickOpen} note={note} />
        ))}
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="etitle"
            label="Title"
            type="text"
            fullWidth
            value={note.etitle}
            name="etitle"
            onChange={onChange}
            required
            minLength={5}
          />
          <TextField
            margin="dense"
            id="edescription"
            label="Description"
            type="text"
            fullWidth
            value={note.edescription}
            name="edescription"
            onChange={onChange}
            required
            minLength={5}
            multiline
            rows={4}  // Adjust the number of rows as needed
          />
          <TextField
            margin="dense"
            id="etag"
            label="Tag"
            type="text"
            fullWidth
            value={note.etag}
            name="etag"
            onChange={onChange}
            required
            minLength={5}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Notes;
