import React, { useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editInput, setEditInput] = useState("");

  const addItem = () => {
    if (input.trim()) {
      setItems([...items, { id: Date.now(), text: input }]);
      setInput("");
    }
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const startEdit = (id, currentText) => {
    setEditId(id);
    setEditInput(currentText);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditInput("");
  };

  const updateItem = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, text: editInput } : item
      )
    );
    setEditId(null);
    setEditInput("");
  };

  return (
    <div className="container mx-auto p-4  w-[40%] border border-gray-200 mt-[5%] mb-[5%] rounded-xl">
      <h1 className="text-2xl font-bold mb-4 text-center">CRUD App </h1>
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Add item"
        />
        <button onClick={addItem} className="bg-blue-500 text-white p-2">
          Add
        </button>
      </div>
      <div>
        <ul>
          {items.map((item) => (
            <li
              key={item.id}
              className="mb-2 border p-2 border-gray-300 rounded-lg flex justify-between items-center"
            >
              {editId === item.id ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                    className="border p-2 mr-2"
                  />
                  <button
                    onClick={() => updateItem(item.id)}
                    className="bg-green-500 text-white p-2 mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-500 text-white p-2"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  {item.text}
                  <div>
                    <button
                      onClick={() => startEdit(item.id, item.text)}
                      className="bg-yellow-500 text-white p-2 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="bg-red-500 text-white p-2"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;