// // src/components/NoteList.js
// import React ,{ useEffect, useState, }from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { deleteNote } from '../features/notes/notesSlice';
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../components/ui/table";
// import { Button } from "../components/ui/button";
// const NoteList = () => {
//   const dispatch = useDispatch();
//   const { notes, loading, error } = useSelector(state => state.notes);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
// <>
//     {/* <div>
//       <h2>Notes</h2>
//       <Link to="/add">Add Note</Link>
//       {notes && 
//       notes.map(note => (
//         <div key={note._id}>
//           <h3>{note.Source}</h3>
//           <h3>{note.Status}</h3>
//           <h3>{note.Date}</h3>
//           <button onClick={() => dispatch(deleteNote(note._id))}>Delete</button>
//           <Link to={`/update/${note._id}`}>Update</Link>
//         </div>
//       ))}
//     </div> */}
//      <Table>
//         <TableCaption>A list of your recent invoices.</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-[100px]">Id</TableHead>
//             <TableHead>Prepaid_amount</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead>Source</TableHead>
//             <TableHead>Time</TableHead>
//             <TableHead>Type</TableHead>
//             <TableHead>Method</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead>Agent</TableHead>
//             <TableHead>Customer_Name</TableHead>
//             <TableHead>Customer_No</TableHead>
//             <TableHead>Alt_No</TableHead>
//             <TableHead>Address</TableHead>
//             <TableHead>Area</TableHead>
//             <TableHead>State</TableHead>
//             <TableHead>Pincode</TableHead>
//             <TableHead>City</TableHead>
//             <TableHead>Price</TableHead>
//             <TableHead>Disease</TableHead>
//             <TableHead>Gasofine_Powder</TableHead>
//             <TableHead>Refresh_Churna</TableHead>
//             <TableHead>Constirelex_Powder</TableHead>
//             <TableHead>Icerose_Powder</TableHead>
//             <TableHead>Lexolite_Teblet</TableHead>
//             <TableHead>Amrutam_Teblet</TableHead>
//             <TableHead>Courier</TableHead>
//             <TableHead>Tracking_id</TableHead>
//             <TableHead>Agent1</TableHead>
//             <TableHead>Remarks1</TableHead>
//             <TableHead>Date1</TableHead>
//             <TableHead>Agent2</TableHead>
//             <TableHead>Remarks2</TableHead>
//             <TableHead>Date2</TableHead>
           
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {notes &&
//             notes.map((note) => (
//               <TableRow key={note.id}>
//                 <TableCell>{note._id}</TableCell>
//                 <TableCell>{note.Prepaid_amount}</TableCell>
//                 <TableCell>{note.Status}</TableCell>
//                 <TableCell>{note.Source}</TableCell>
//                 <TableCell>{note.Time}</TableCell>
//                 <TableCell>{note.Type}</TableCell>
//                 <TableCell>{note.Method}</TableCell>
//                 <TableCell>{note.Date}</TableCell>
//                 <TableCell>{note.Agent}</TableCell>
//                 <TableCell>{note.Customer_Name}</TableCell>
//                 <TableCell>{note.Customer_No}</TableCell>
//                 <TableCell>{note.Alt_No}</TableCell>
//                 <TableCell>{note.Address}</TableCell>
//                 <TableCell>{note.Area}</TableCell>
//                 <TableCell>{note.State}</TableCell>
//                 <TableCell>{note.Pincode}</TableCell>
//                 <TableCell>{note.City}</TableCell>
//                 <TableCell>{note.Price}</TableCell>
//                 <TableCell>{note.Disease}</TableCell>
//                 <TableCell>{note.Gasofine_Powder}</TableCell>
//                 <TableCell>{note.Refresh_Churna}</TableCell>
//                 <TableCell>{note.Constirelex_Powder}</TableCell>
//                 <TableCell>{note.Icerose_Powder}</TableCell>
//                 <TableCell>{note.Lexolite_Teblet}</TableCell>
//                 <TableCell>{note.Amrutam_Teblet}</TableCell>
//                 <TableCell>{note.Courier}</TableCell>
//                 <TableCell>{note.Tracking_id}</TableCell>
//                 <TableCell>{note.Agent1}</TableCell>
//                 <TableCell>{note.Remarks1}</TableCell>
//                 <TableCell>{note.Date1}</TableCell>
//                 <TableCell>{note.Agent2}</TableCell>
//                 <TableCell>{note.Remarks2}</TableCell>
//                 <TableCell>{note.Date2}</TableCell>

//                 <TableCell>
//                   <Button >
//                   <Link to={`http://localhost:5173/notes/view/${note._id}`}>Update</Link>
//                   </Button>
//                 </TableCell>
//                 <TableCell>
//                   <Button onClick={() => dispatch(deleteNote(note._id))}>
//                     Delete Note
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//         </TableBody>
//       </Table>
//     </>
//   );
// };

// export default NoteList;
import React from 'react'

export default function NoteList ()  {
  return (
    <div>
      NoteList
    </div>
  )
}



