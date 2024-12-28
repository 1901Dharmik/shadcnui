import React, { createContext, useState, useEffect, forwardRef, useRef } from "react";
import axios from "axios";


export const NoteContext = createContext();
export const useNotes = () => {
    return useContext(NoteContext);
  };
  const initialFormValues = {
    Prepaid_amount: "",
    Status: "",
    Source: "",
    Time: "",
    Type: "",
    Method: "",
    Date: "",
    Agent: "",
    Customer_Name: "",
    Customer_No: "",
    Alt_No: "",
    Address: "",
    Area: "",
    State: "",
    Pincode: "",
    City: "",
    Price: "",
    Disease: "",
    Gasofine_Powder: "",
    Refresh_Churna: "",
    Constirelex_Powder: "",
    Icerose_Powder: "",
    Lexolite_Teblet: "",
    Amrutam_Teblet: "",
    Courier: "",
    Tracking_id: "",
    Agent1: "",
    Remarks1: "",
    Date1: "",
    Agent2: "",
    Remarks2: "",
    Date2: "",
    Products:"",
    created_at: "",
};
export default function NoteProvider({children}) {
 
  // const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
//   const [createForm, setCreateForm] = useState({
//     Prepaid_amount: "",
//     Status: "",
//     Source: "",
//     Time: "",
//     Type: "",
//     Method: "",
//     Date: "",
//     Agent: "",
//     Customer_Name: "",
//     Customer_No: "",
//     Alt_No: "",
//     Address: "",
//     Area: "",
//     State: "",
//     Pincode: "",
//     City: "",
//     Price: "",
//     Disease: "",
//     Gasofine_Powder: "",
//     Refresh_Churna: "",
//     Constirelex_Powder: "",
//     Icerose_Powder: "",
//     Lexolite_Teblet: "",
//     Amrutam_Teblet: "",
//     Courier: "",
//     Tracking_id: "",
//     Agent1: "",
//     Remarks1: "",
//     Date1: "",
//     Agent2: "",
//     Remarks2: "",
//     Date2: "",
//     Products:"",
//     created_at: "",
//   });
  const [updateForm, setUpdateForm] = useState({
    _id: null,
    Prepaid_amount: "",
    Status: "",
    Source: "",
    Time: "",
    Type: "",
    Method: "",
    Date: "",
    Agent: "",
    Customer_Name: "",
    Customer_No: "",
    Alt_No: "",
    Address: "",
    Area: "",
    State: "",
    Pincode: "",
    City: "",
    Price: "",
    Disease: "",
    Gasofine_Powder: "",
    Refresh_Churna: "",
    Constirelex_Powder: "",
    Icerose_Powder: "",
    Lexolite_Teblet: "",
    Amrutam_Teblet: "",
    Courier: "",
    Tracking_id: "",
    Agent1: "",
    Remarks1: "",
    Date1: "",
    Agent2: "",
    Remarks2: "",
    Date2: "",
    Products:'',
    created_at: "",
  });
  useEffect(() => {
    axios.get('http://localhost:8000/notes').then(response => {
        setNotes(response.data);
    });
}, []);

const addNote = (note) => {
    axios.post('http://localhost:8000/notes', note).then(response => {
        setNotes([...notes, response.data]);
    });
};
// const createNote = async (e) => {
//     e.preventDefault();

//     const res = await axios.post("http://localhost:8000/notes", createForm);

//     setNotes([...notes, res.data.note]);

//     setCreateForm({
//       Prepaid_amount: "",
//       Status: "",
//       Source: "",
//       Time: "",
//       Type: "",
//       Method: "",
//       Date: "",
//       Agent: "",
//       Customer_Name: "",
//       Customer_No: "",
//       Alt_No: "",
//       Address: "",
//       Area: "",
//       State: "",
//       Pincode: "",
//       City: "",
//       Price: "",
//       Disease: "",
//       Gasofine_Powder: "",
//       Refresh_Churna: "",
//       Constirelex_Powder: "",
//       Icerose_Powder: "",
//       Lexolite_Teblet: "",
//       Amrutam_Teblet: "",
//       Courier: "",
//       Tracking_id: "",
//       Agent1: "",
//       Remarks1: "",
//       Date1: "",
//       Agent2: "",
//       Remarks2: "",
//       Date2: "",
//       Products:'',
//       created_at: "",
//     });
//   };

const updateNote = (id, updatedNote) => {
    axios.put(`http://localhost:8000/notes/${id}`, updatedNote).then(response => {
        setNotes(notes.map(note => note.id === id ? response.data : note));
       
    });
};

const getNoteById = (id) => {
    return notes.find(note => note.id === parseInt(id));
};
const getNote = (id) => {
    return notes.find(note => note.id === id);
};

// const deleteNote = (id) => {
//     axios.delete(`http://localhost:8000/notes/${id}`)
//         .then(() => {
//             setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
//         })
//         .catch(error => {
//             console.error('Error deleting note:', error);
//         });
// };
const deleteNote = async (_id) => {
    // Delete the note
    const res = await axios.delete(`http://localhost:8000/notes/${_id}`);

    // Update state
    const newNotes = [...notes].filter((note) => {
        return note._id !== _id;
    });

    setNotes(newNotes);
   
  
};

  return (
    <NoteContext.Provider value={{ notes, addNote, updateNote, getNote, deleteNote, getNoteById}}>
    {children}
</NoteContext.Provider>
   
  );
}


