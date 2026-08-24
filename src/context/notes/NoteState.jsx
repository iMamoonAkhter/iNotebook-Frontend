import { useState, useCallback } from "react";
import NoteContext from "./noteContext";
import { toast } from "react-toastify";

const NoteState = (props) => {
  const host = import.meta.env.VITE_SERVER_URL;
  const [notes, setNotes] = useState([]);
  const [userData, setUserData] = useState(null);

  const fetchUserData = useCallback(async () => {
    try {
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem('auth-token'),
        },
      });

      const data = await response.json();
      if (data) {
        setUserData(data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  }, [host]);

  // Get All Notes
  const getNotes = useCallback(async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error);
      toast.error("Failed to fetch notes");
    }
  }, [host]);

  // Add a Note
  const addNote = useCallback(async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const note = await response.json();
      console.log(note);
      
      // Check if the response contains the note data
      if (note && !note.error) {
        setNotes(prevNotes => [...prevNotes, note]);
        toast.success("Note added successfully!");
      } else {
        toast.error(note.message || "Failed to add note.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred.");
    }
  }, [host]);

  // Delete a Note
  const deleteNote = useCallback(async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      const json = await response.json();
      if(json){
        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
        toast.success(json.message);
      }else{
        toast.error(json.error);
      }

    } catch (error) {
      toast.error("Error deleting note:", error);
    }
  }, [host, notes]);

  // Edit a Note
  const editNote = useCallback(async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const json = await response.json();
      console.log(json)
      if(json.note._id === id){
        const updatedNotes = notes.map((note)=>
          note._id === id ?
          {...note, title, description, tag} : note
        );

        setNotes(updatedNotes);
        toast.success(json.message);
      }else{
        toast.error("Unable to update note!");
      }
      
    } catch (error) {
      toast.error(error.message);
    }
  }, [host, notes]);
  
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes, host, userData, setUserData, fetchUserData }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;