import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

function Crud() {
  // State
  const [notes, setNotes] = useState(null);
  const [createForm, setCreateForm] = useState({
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
  });
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
    Created_at: { type: Date, default: Date.now },
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
  });

  // Use effect
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    // Fetch the notes
    const res = await axios.get("http://localhost:8000/notes");

    // Set to state
    setNotes(res.data.notes);
  };

  const updateCreateFormField = (e) => {
    const { name, value } = e.target;

    setCreateForm({
      ...createForm,
      [name]: value,
    });
  };

  const createNote = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:8000/notes", createForm);

    setNotes([...notes, res.data.note]);

    setCreateForm({
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
      Created_at: { type: Date, default: Date.now },
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
    });
  };

  // const deleteNote = async (_id) => {
  //   // Delete the note
  //   const res = await axios.delete(`http://localhost:8000/notes/${_id}`);

  //   // Update state
  //   const newNotes = [...notes].filter((note) => {
  //     return note._id !== _id;
  //   });

  //   setNotes(newNotes);
  // };

  const deleteNote = async (_id) => {
    try {
      // Delete the note
      await axios.delete(`http://localhost:8000/notes/${_id}`);

      // Update state
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== _id));
    } catch (error) {
      console.error(error);
      // Handle error scenario, e.g., display an error message to the user
    }
  };

  const handleUpdateFieldChange = (e) => {
    const { value, name } = e.target;

    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  const toggleUpdate = (note) => {
    // Set state on update form
    setUpdateForm(
      {
        Prepaid_amount: note.Prepaid_amount,
        Status: note.Status,
        Source: note.Source,
        Time: note.Time,
        Type: note.Type,
        Method: note.Method,
        Date: note.Date,
        Agent: note.Agent,
        Customer_Name: note.Customer_Name,
        Customer_No: note.Customer_No,
        Alt_No: note.Alt_No,
        Address: note.Address,
        Area: note.Area,
        State: note.State,
        Pincode: note.Pincode,
        City: note.City,
        Created_at: { type: Date, default: Date.now },
        Price: note.Price,
        Disease: note.Disease,
        Gasofine_Powder: note.Gasofine_Powder,
        Refresh_Churna: note.Refresh_Churna,
        Constirelex_Powder: note.Constirelex_Powder,
        Icerose_Powder: note.Icerose_Powder,
        Lexolite_Teblet: note.Lexolite_Teblet,
        Amrutam_Teblet: note.Amrutam_Teblet,
        Courier: note.Courier,
        Tracking_id: note.Tracking_id,
        Agent1: note.Agent1,
        Remarks1: note.Remarks1,
        Date1: note.Date1,
        Agent2: note.Agent2,
        Remarks2: note.Remarks2,
        Date2: note.Date2,
      }
      // { title: note.title, body: note.body, _id: note._id }
    );
  };

  const updateNote = async (e) => {
    e.preventDefault();

    const {
      Prepaid_amount,
      Status,
      Source,
      Time,
      Type,
      Method,
      Date,
      Agent,
      Customer_Name,
      Customer_No,
      Alt_No,
      Address,
      Area,
      State,
      Pincode,
      City,
      Created_at,
      Price,
      Disease,
      Gasofine_Powder,
      Refresh_Churna,
      Constirelex_Powder,
      Icerose_Powder,
      Lexolite_Teblet,
      Amrutam_Teblet,
      Courier,
      Tracking_id,
      Agent1,
      Remarks1,
      Date1,
      Agent2,
      Remarks2,
      Date2,
    } = updateForm;

    // Send the update request
    const res = await axios.put(
      `http://localhost:8000/notes/${updateForm._id}`,
      {
        Prepaid_amount,
        Status,
        Source,
        Time,
        Type,
        Method,
        Date,
        Agent,
        Customer_Name,
        Customer_No,
        Alt_No,
        Address,
        Area,
        State,
        Pincode,
        City,
        Created_at,
        Price,
        Disease,
        Gasofine_Powder,
        Refresh_Churna,
        Constirelex_Powder,
        Icerose_Powder,
        Lexolite_Teblet,
        Amrutam_Teblet,
        Courier,
        Tracking_id,
        Agent1,
        Remarks1,
        Date1,
        Agent2,
        Remarks2,
        Date2,
      }
    );

    // Update state
    const newNotes = [...notes];
    const noteIndex = notes.findIndex((note) => {
      return note._id === updateForm._id;
    });
    newNotes[noteIndex] = res.data.note;

    setNotes(newNotes);

    // Clear update form state
    setUpdateForm({
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
    });
  };

  return (
    <>
    <div className="App">
      <div>
        <h2>Notes:</h2>
        {/* {notes &&
          notes.map((note) => {
            return (
              <div key={note._id}>
                <h3>{note.title}</h3>
                <button onClick={() => deleteNote(note._id)}>
                  Delete note
                </button>
                <button onClick={() => toggleUpdate(note)}>Update note</button>
              </div>
            );
          })} */}

        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Prepaid_amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Agent</TableHead>
              <TableHead>Customer_Name</TableHead>
              <TableHead>Customer_No</TableHead>
              <TableHead>Alt_No</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Area</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Pincode</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Disease</TableHead>
              <TableHead>Gasofine_Powder</TableHead>
              <TableHead>Refresh_Churna</TableHead>
              <TableHead>Constirelex_Powder</TableHead>
              <TableHead>Icerose_Powder</TableHead>
              <TableHead>Lexolite_Teblet</TableHead>
              <TableHead>Amrutam_Teblet</TableHead>
              <TableHead>Courier</TableHead>
              <TableHead>Tracking_id</TableHead>
              <TableHead>Agent1</TableHead>
              <TableHead>Remarks1</TableHead>
              <TableHead>Date1</TableHead>
              <TableHead>Agent2</TableHead>
              <TableHead>Remarks2</TableHead>
              <TableHead>Date2</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notes &&
              notes.map((note) => (
                <TableRow key={note.id}>
                  <TableCell>{note._id}</TableCell>
                  <TableCell>{note.Prepaid_amount}</TableCell>
                  <TableCell>{note.Status}</TableCell>
                  <TableCell>{note.Source}</TableCell>
                  <TableCell>{note.Time}</TableCell>
                  <TableCell>{note.Type}</TableCell>
                  <TableCell>{note.Method}</TableCell>
                  <TableCell>{note.Date}</TableCell>
                  <TableCell>{note.Agent}</TableCell>
                  <TableCell>{note.Customer_Name}</TableCell>
                  <TableCell>{note.Customer_No}</TableCell>
                  <TableCell>{note.Alt_No}</TableCell>
                  <TableCell>{note.Address}</TableCell>
                  <TableCell>{note.Area}</TableCell>
                  <TableCell>{note.State}</TableCell>
                  <TableCell>{note.Pincode}</TableCell>
                  <TableCell>{note.City}</TableCell>
                  <TableCell>{note.Price}</TableCell>
                  <TableCell>{note.Disease}</TableCell>
                  <TableCell>{note.Gasofine_Powder}</TableCell>
                  <TableCell>{note.Refresh_Churna}</TableCell>
                  <TableCell>{note.Constirelex_Powder}</TableCell>
                  <TableCell>{note.Icerose_Powder}</TableCell>
                  <TableCell>{note.Lexolite_Teblet}</TableCell>
                  <TableCell>{note.Amrutam_Teblet}</TableCell>
                  <TableCell>{note.Courier}</TableCell>
                  <TableCell>{note.Tracking_id}</TableCell>
                  <TableCell>{note.Agent1}</TableCell>
                  <TableCell>{note.Remarks1}</TableCell>
                  <TableCell>{note.Date1}</TableCell>
                  <TableCell>{note.Agent2}</TableCell>
                  <TableCell>{note.Remarks2}</TableCell>
                  <TableCell>{note.Date2}</TableCell>

                  <TableCell>
                    <Button onClick={() => toggleUpdate(note)}>
                      Update note
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => deleteNote(note._id)}>
                      Delete Note
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {updateForm._id && (
        <div>
          <h2>Update note</h2>
          <form onSubmit={updateNote}>
            <Label>Prepaid_amount</Label>
            <Input
              onChange={handleUpdateFieldChange}
              value={updateForm.title}
              name="title"
            />
            <Label>Prepaid_amount</Label>
            <Input
              onChange={handleUpdateFieldChange}
              value={updateForm.body}
              name="body"
            />
            <button type="submit">Update note</button>
          </form>
        </div>
      )}

      {!updateForm._id && (
        <div className="grid grid-cols-4 gap-4">
          <h2>Create note</h2>
          <form onSubmit={createNote}>
            <Label>Prepaid_amount</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.Prepaid_amount}
              name="Prepaid_amount"
            />

            <Label>Status</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.Status}
              name="Status"
            />
            <Label>Source</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.Source}
              name="Source"
            />
            <Label>Time</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.Time}
              name="Time"
            />
            <Label>Type</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.Type}
              name="Type"
            />
            <Label>Method</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.Method}
              name="Method"
            />
            <Label>Date</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.Date}
              name="Date"
            />
            {/* <Label>Status</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.Status}
              name="Status"
            /> */}
            <Label>Agent</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.Agent}
              name="Agent"
            />
            <Label>Customer Name.</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.Customer_Name}
              name="Customer_Name"
            />

            <Label>Customer No.t</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.Customer_No}
              name="Customer_No"
            />
            {/* <Label>Prepaid_amount</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.body}
              name="body"
            /> */}
            <Label>Alt_No</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.Alt_No}
              name="Alt_No"
            />
            <Label>Address</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.Address}
              name="Address"
            />
            <Label>Area</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.Area}
              name="Area"
            />
            <Label>State</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.State}
              name="State"
            />
            <Label>Pincode</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.Pincode}
              name="Pincode"
            />
            <Label>City</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.City}
              name="City"
            />

            {/* <Label>Created_at</Label> */}
            {/* <Input
              onChange={updateCreateFormField}
              value={createForm.Created_at}
              name="Created_at"
            /> */}
            <Label>Price</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.Price}
              name="Price"
            />
            <Label>Disease</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.Disease}
              name="Disease"
            />
            <Label>Gasofine_Powder</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.Gasofine_Powder}
              name="Gasofine_Powder"
            />
            <Label>Refresh_Churna</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.Refresh_Churna}
              name="Refresh_Churna"
            />
            <Label>Constirelex_Powder</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.Constirelex_Powder}
              name="Constirelex_Powder"
            />
            <Label>Icerose_Powder</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.Icerose_Powder}
              name="Icerose_Powder"
            />
            <Label>Lexolite_Teblet</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.Lexolite_Teblet}
              name="Lexolite_Teblet"
            />
            <Label>Amrutam_Teblet</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.Amrutam_Teblet}
              name="Amrutam_Teblet"
            />
            <Label>Courier</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.Courier}
              name="Courier"
            />
            <Label>Tracking_id</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.Tracking_id}
              name="Tracking_id"
            />
            <Label>Agent1</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.Agent1}
              name="Agent1"
            />
            <Label>Remarks1</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.Remarks1}
              name="Remarks1"
            />
            <Label>Date1</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.Date1}
              name="Date1"
            />
            <Label>Agent2</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.Agent2}
              name="Agent2"
            />
            <Label>Remarks2</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.Remarks2}
              name="Remarks2"
            />
            <Label>Date2</Label>
            <Input
              onChange={updateCreateFormField}
              value={createForm.Date2}
              name="Date2"
            />

            <button type="submit">Create note</button>
          </form>
        </div>
      )}
    </div>
  
    </>
  );
}

export default Crud;
