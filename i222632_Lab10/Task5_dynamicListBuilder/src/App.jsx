import "./App.css";

function App() {
  const handleAddItem = () => {
    const input = document.getElementById("itemInput");
    const value = input.value.trim();
    if (!value) return;

    const li = document.createElement("li");
    li.textContent = value;

    document.getElementById("itemList").appendChild(li);
    input.value = "";
  };

  const handleRemoveLastItem = () => {
    const list = document.getElementById("itemList");
    if (list.lastChild) list.removeChild(list.lastChild);
  };

  return (
    <>
      <h1>My Favorite Items</h1>
      <div className="input-row">
        <input id="itemInput" type="text" placeholder="Type an item..." />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      <button className="btn-remove" onClick={handleRemoveLastItem}>
        Remove Last Item
      </button>
      <ul id="itemList"></ul>
    </>
  );
}

export default App;
