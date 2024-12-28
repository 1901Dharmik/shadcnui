import React, { useState, useEffect } from 'react';
import axios from 'axios';

const fetchProductsData = () => {
//   const [notes, setNotes] = useState([]);
  const [products, setProducts] = useState([]);
//   const [note, setNote] = useState({ title: '', content: '' });
  const [product, setProduct] = useState({ name: '', description: '', price: '' });
//   const [selectedNote, setSelectedNote] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // fetchNotes();
    fetchProducts();
  }, []);

//   const fetchNotes = async () => {
//     const response = await axios.get('/api/notes');
//     setNotes(response.data);
//   };

  const fetchProducts = async () => {
    const response = await axios.get('/api/products');
    setProducts(response.data);
  };

//   const fetchNote = async (id) => {
//     const response = await axios.get(`/api/notes/${id}`);
//     setSelectedNote(response.data);
//     setNote({ title: response.data.title, content: response.data.content });
//   };

  const fetchProduct = async (id) => {
    const response = await axios.get(`/api/products/${id}`);
    setSelectedProduct(response.data);
    setProduct({ name: response.data.name, description: response.data.description, price: response.data.price });
  };

//   const handleNoteChange = (e) => {
//     const { name, value } = e.target;
//     setNote(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

//   const handleNoteSubmit = async (e) => {
//     e.preventDefault();
//     if (selectedNote) {
//       await axios.put(`/api/notes/${selectedNote._id}`, note);
//     } else {
//       await axios.post('/api/notes', note);
//     }
//     fetchNotes();
//     setNote({ title: '', content: '' });
//     setSelectedNote(null);
//   };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (selectedProduct) {
      await axios.put(`/api/products/${selectedProduct._id}`, product);
    } else {
      await axios.post('/api/products', product);
    }
    fetchProducts();
    setProduct({ name: '', description: '', price: '' });
    setSelectedProduct(null);
  };

//   const handleNoteDelete = async (id) => {
//     await axios.delete(`/api/notes/${id}`);
//     fetchNotes();
//   };

  const handleProductDelete = async (id) => {
    await axios.delete(`/api/products/${id}`);
    fetchProducts();
  };

  return (
    <div>
      <h1>Notes</h1>
      {/* <form onSubmit={handleNoteSubmit}>
        <input name="title" value={note.title} onChange={handleNoteChange} placeholder="Title" />
        <textarea name="content" value={note.content} onChange={handleNoteChange} placeholder="Content" />
        <button type="submit">{selectedNote ? 'Update Note' : 'Add Note'}</button>
      </form>
      <ul>
        {notes.map(note => (
          <li key={note._id}>
            {note.title}: {note.content}
            <button onClick={() => fetchNote(note._id)}>Edit</button>
            <button onClick={() => handleNoteDelete(note._id)}>Delete</button>
          </li>
        ))}
      </ul> */}

      <h1>Products</h1>
      <form onSubmit={handleProductSubmit}>
        <input name="name" value={product.name} onChange={handleProductChange} placeholder="Name" />
        <textarea name="description" value={product.description} onChange={handleProductChange} placeholder="Description" />
        <input name="price" type="number" value={product.price} onChange={handleProductChange} placeholder="Price" />
        <button type="submit">{selectedProduct ? 'Update Product' : 'Add Product'}</button>
      </form>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name}: {product.description} - ${product.price}
            <button onClick={() => fetchProduct(product._id)}>Edit</button>
            <button onClick={() => handleProductDelete(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default fetchProductsData;
