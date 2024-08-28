import { useState } from "react";
import NoteContext from "./noteContext";
import { toast } from "react-toastify";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState([]);
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
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
  };



  // Get All Notes
  const getNotes = async () => {
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
      // Optionally, you can handle the error here (e.g., display an error message)
    }
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
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
  };   

  // Delete a Note
  const deleteNote = async (id) => {
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
      // Optionally, you can handle the error here (e.g., display an error message)
    }
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
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
      // Optionally, you can handle the error here (e.g., display an error message)
    }
  };
  

  
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes, host, userData, setUserData, fetchUserData }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
