import React, { useState } from 'react';
import axios from 'axios';
import {Button} from '../components/ui/button'
const UserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const values = ["Value1", "Value2", "Value3", "Value4"];
  const [isVisible, setIsVisible] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
  const [addresses, setAddresses] = useState([{ street: '', city: '', zipCode: '' }]);
  const [agents, setAgents] = useState([{ name: '', remark: '', date: '' }]);

  const handleAddressChange = (index, event) => {
    const newAddresses = addresses.map((address, addrIndex) => {
      if (index !== addrIndex) return address;
      return { ...address, [event.target.name]: event.target.value };
    });

    setAddresses(newAddresses);
  };

  const handleAddAddress = () => {
    setAddresses([...addresses, { street: '', city: '', zipCode: '' }]);
  };
  const handleRemoveAddress = (index) => {
    setAddresses(addresses.filter((_, addrIndex) => addrIndex !== index));
  };

  const handleAgentChange = (index, event) => {
    const newAgents = agents.map((agent, agentIndex) => {
      if (index !== agentIndex) return agent;
      return { ...agent, [event.target.name]: event.target.value };
    });

    setAgents(newAgents);
  };

  const handleAddAgent = () => {
    setAgents([...agents, { name: '', remark: '', date: '' }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name,
      email,
      addresses,
      agents,
    };

    axios.post('http://localhost:8000/users', newUser)
      .then(response => {
        console.log('User added!', response.data);
        setName('');
        setEmail('');
        setAddresses([{ street: '', city: '', zipCode: '' }]);
        setAgents([{ name: '', remark: '', date: '' }]);
      })
      .catch(error => {
        console.error('There was an error adding the user!', error);
      });
  };
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        {values.map((value) => (
        <div key={value}>
          <input 
            type="radio" 
            id={value} 
            name="selection" 
            value={value}
            // checked={selectedValue === value}
            // onChange={handleChange} 
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor={value}>{value}</label>
        </div>
      ))}
        {/* <input type="text" value={name} onChange={(e) => setName(e.target.value)} required /> */}
      </div>
      <div>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="">
      {/* <Button  onClick={toggleVisibility}>
        {isVisible ? "Close" : "Add Adress"}
      </Button> */}
      {/* {isVisible && (  <div> */}
      {addresses.map((address, index) => (
        <div key={index}>
          <h4>Address {index + 1}</h4>
          <div>
            <label>Street:</label>
            <input
              type="text"
              name="street"
              value={address.street}
              onChange={(event) => handleAddressChange(index, event)}
            />
          </div>
          <div>
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={(event) => handleAddressChange(index, event)}
            />
          </div>
          <div>
            <label>Zip Code:</label>
            <input
              type="text"
              name="zipCode"
              value={address.zipCode}
              onChange={(event) => handleAddressChange(index, event)}
            />
          </div>
          <Button type="button" onClick={() => handleRemoveAddress(index)}>Remove</Button>
        </div>
      ))}
      <button type="button" onClick={handleAddAddress}>Add New Address</button>
      {/* </div>
      )} */}

{/* {isVisible && (  <div> */}
      {agents.map((agent, index) => (
        <div key={index}>
          <h4>Agent {index + 1}</h4>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={agent.name}
              onChange={(event) => handleAgentChange(index, event)}
            />
          </div>
          <div>
            <label>Remark:</label>
            <input
              type="text"
              name="remark"
              value={agent.remark}
              onChange={(event) => handleAgentChange(index, event)}
            />
          </div>
          <div>
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={agent.date}
              onChange={(event) => handleAgentChange(index, event)}
            />
          </div>
        </div>
      ))}
      <button type="button" onClick={handleAddAgent}>Add New Agent</button>
      </div>
      {/* )}
      </div> */}
      <button type="submit">Submit User</button>
    </form>
  );
};

export default UserForm;
