// // src/components/UpdateNote.js
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, } from 'react-router-dom';
// import { updateNote } from '../features/notes/notesSlice';
// const initialState = {
//   Prepaid_amount: "",
//   Status: "",
//   Source: "",
//   Time: "",
//   Type: "",
//   Method: "",
//   Date: "",
//   Agent: "",
//   Customer_Name: "",
//   Customer_No: "",
//   Alt_No: "",
//   Address: "",
//   Area: "",
//   State: "",
//   Pincode: "",
//   City: "",
//   Price: "",
//   Disease: "",
//   Gasofine_Powder: "",
//   Refresh_Churna: "",
//   Constirelex_Powder: "",
//   Icerose_Powder: "",
//   Lexolite_Teblet: "",
//   Amrutam_Teblet: "",
//   Courier: "",
//   Tracking_id: "",
//   Agent1: "",
//   Remarks1: "",
//   Date1: "",
//   Agent2: "",
//   Remarks2: "",
//   Date2: "",
//   Products: "",
//   created_at: "",
// };
// const UpdateNote = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
// //   const history = useHistory();
//   const notes = useSelector(state => state.notes.notes);
//   const [note, setNote] = useState(null);

//   useEffect(() => {
//     const noteToUpdate = notes.find(n => n._id === id);
//     if (noteToUpdate) {
//       setNote(noteToUpdate);
//     }
//   }, [id, notes]);

//   if (!note) return <div>Loading...</div>;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNote({
//       ...note,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await dispatch(updateNote(note));
//     setNote(initialState)
//     // history.push("/");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>Prepaid_amount</label>
//       <input name="Prepaid_amount" value={note.Prepaid_amount} onChange={handleChange} />
//       <label>Status</label>
//       <input name="Status" value={note.Status} onChange={handleChange} />
//       <label>Source</label>
//       <input name="Source" value={note.Source} onChange={handleChange} />
//       {/* Add other fields similarly */}
//       <button type="submit">Update Note</button>
//     </form>
//   );
// };

// export default UpdateNote;
import React from 'react'

const EditNote = () => {
  return (
    <div>
      
    </div>
  )
}

export default EditNote

