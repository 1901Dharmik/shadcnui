// // src/components/AddNote.js
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import { useHistory } from 'react-router-dom';
// import { addNote } from "../features/notes/notesSlice";
// import { toast } from "sonner";

// const AddNote = () => {
//   const dispatch = useDispatch();
//   const [Products, setProducts] = useState([
//     { Product_Name: "", Quantity: "" },
//   ]);
//   //   const history = useHistory();
//   const initialState = {
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
//     Product_Purchase : [],
//     Date2: "",
//   };
//   const [note, setNote] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNote({
//       ...note,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await dispatch(addNote(note));
//     toast("Event has been created", {
//       description: "Note added successfully!",
//       action: {
//         label: "Okey",
//         onClick: () => console.log("Undo"),
//       },
//     });
//     setNote(initialState);
//     // history.push("/");
//   };

//   const handleProductChange = (index, event) => {
//     const newProducts = Products.map((Product, addrIndex) => {
//       if (index !== addrIndex) return Product;
//       return { ...Product, [event.target.name]: event.target.value };
//     });

//     setProducts(newProducts);
//   };

//   const handleAddProduct = () => {
//     setProducts([...Products, { street: '', city: '', zipCode: '' }]);
//   };

//   // const handleSubmit = (event) => {
//   //   event.preventDefault();
//   // }

//   return (
//     <form onSubmit={handleSubmit}>
//       {/* Render form fields similarly as shown in your initial code */}
//       <label>Prepaid_amount</label>
//       <input
//         name="Prepaid_amount"
//         value={note.Prepaid_amount}
//         onChange={handleChange}
//       />
//       <label>Status</label>
//       <input name="Status" value={note.Status} onChange={handleChange} />
//       <label>Source</label>
//       <input name="Source" value={note.Source} onChange={handleChange} />
//       {/*  */}
      
//       {Products.map((Product, index) => (
//     <div key={index}>
//       <h4>Product {index + 1}</h4>
//       <div>
//         <label>Product Name</label>
//         <input
//           type="text"
//           name="productname"
//           value={Product.Product_Name}
//           onChange={(event) => handleProductChange(index, event)}
         
//         />
//       </div>
//       <div>
//         <label>Quantity:</label>
//         <input
//           type="number"
//           name="productqty"
//           value={Product.Quantity}
//           onChange={(event) => handleProductChange(index, event)}
         
//         />
//       </div>
      
//     </div>
//   ))}
//   <button type="button" onClick={handleAddProduct}>Add Address</button>
//       {/*  */}
//       {/* Add other fields similarly */}
//       <button type="submit">Add Note</button>
//     </form>
//   );
// };

// export default AddNote;
import React from 'react'

const AddNote = () => {
  return (
    <div>
      Add Notes
    </div>
  )
}

export default AddNote

