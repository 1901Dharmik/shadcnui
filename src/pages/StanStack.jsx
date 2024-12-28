import React, {createContext, useState, useEffect } from "react";
import axios from "axios";
import OrderTable from "../components/order-management";
import TableManagement from "../components/orderNewTable";
import OrderNewTable from "../components/order-managements";
import InvoiceDashboard from "../components/invoice-dashboard";
import BlogList from "../components/BlogList";
import { Avatar } from "@/components/ui/avatar";
const fetchProductsData = () => {
  const [todos, setTodos] = useState([]);
  const [products, setProducts] = useState([]);
  const [todo, setTodo] = useState({ title: "", content: "" });
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchTodos();
    fetchProducts();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get("http://localhost:8000/todos");
    setTodos(response.data);
  };

  const fetchProducts = async () => {
    const response = await axios.get("http://localhost:8000/api/products");
    setProducts(response.data);
  };

  const fetchTodo = async (id) => {
    const response = await axios.get(`http://localhost:8000/todos/${id}`);
    setSelectedTodo(response.data);
    setTodo({ title: response.data.title, content: response.data.content });
  };

  const fetchProduct = async (id) => {
    const response = await axios.get(
      `http://localhost:8000/api/products/${id}`
    );
    setSelectedProduct(response.data);
    setProduct({
      name: response.data.name,
      description: response.data.description,
      price: response.data.price,
      quantity: response.data.quantity,
    });
  };

  const handleTodoChange = (e) => {
    const { name, value } = e.target;
    setTodo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTodoSubmit = async (e) => {
    e.preventDefault();
    if (selectedTodo) {
      await axios.put(`http://localhost:8000/todos/${selectedTodo._id}`, todo);
    } else {
      await axios.post("http://localhost:8000/todos", todo);
    }
    fetchTodos();
    setTodo({ title: "", content: "" });
    setSelectedTodo(null);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (selectedProduct) {
      await axios.put(
        `http://localhost:8000/api/products/${selectedProduct._id}`,
        product
      );
    } else {
      await axios.post("http://localhost:8000/api/products", product);
    }
    fetchProducts();
    setProduct({ name: "", description: "", price: "", quantity: "" });
    setSelectedProduct(null);
  };

  const handleTodoDelete = async (id) => {
    await axios.delete(`http://localhost:8000/${id}`);
    fetchTodos();
  };

  const handleProductDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/products/${id}`);
    fetchProducts();
  };

  return (
    <>
    <div>
      <h1>Notes</h1>
      <form onSubmit={handleTodoSubmit}>
        <input
          name="title"
          value={todo.title}
          onChange={handleTodoChange}
          placeholder="Title"
        />
        <textarea
          name="content"
          value={todo.content}
          onChange={handleTodoChange}
          placeholder="Content"
        />
        <button type="submit">
          {selectedTodo ? "Update todo" : "Add todo"}
        </button>
      </form>

      {/* {todos && todos.map((todo) => <div className=""></div>)} */}

      <ul>
        {todos &&
          todos.map((todo) => (
            <li key={todo._id}>
              {todo.title}: {todo.content}
              <button onClick={() => fetchTodo(todo._id)}>Edit</button>
              <button onClick={() => handleTodoDelete(todo._id)}>Delete</button>
            </li>
          ))}
      </ul>

      <h1>Products</h1>
      <form onSubmit={handleProductSubmit}>
        <input
          name="name"
          value={product.name}
          onChange={handleProductChange}
          placeholder="Name"
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleProductChange}
          placeholder="Description"
        />
        <input
          name="price"
          type="number"
          value={product.price}
          onChange={handleProductChange}
          placeholder="Price"
        />
        <input
          name="quantity"
          type="number"
          value={product.quantity}
          onChange={handleProductChange}
          placeholder="quantity"
        />
        <button type="submit">
          {selectedProduct ? "Update Product" : "Add Product"}
        </button>
      </form>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name}: {product.description} - ${product.price}
            <button onClick={() => fetchProduct(product._id)}>Edit</button>
            <button onClick={() => handleProductDelete(product._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
    <OrderTable/>
    <TableManagement/>
    <InvoiceDashboard/>
    <BlogList/>

   
    </>
  );
};

export default fetchProductsData;
