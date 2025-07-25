import { useState } from "react";

const ProductForms = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    type: "",
    sku: "",
    description: "",
    image_url: "",
    quantity: 0,
    price: 0,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      name: "",
      type: "",
      sku: "",
      description: "",
      image_url: "",
      quantity: 0,
      price: 0,
    });
  };

  return (
    <form
      onSubmit={submit}
      className="grid gap-4 bg-white p-6 rounded-xl shadow-lg"
    >
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="input"
        />
        <input
          type="text"
          name="type"
          value={form.type}
          onChange={handleChange}
          placeholder="Type"
          required
          className="input"
        />
        <input
          type="text"
          name="sku"
          value={form.sku}
          onChange={handleChange}
          placeholder="SKU"
          required
          className="input"
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="input"
        />
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="input"
        />
        <input
          type="text"
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          placeholder="Image URL (optional)"
          className="input"
        />
      </div>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description (optional)"
        className="input h-20"
      />
      <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-md">
        Add Product
      </button>
    </form>
  );
};

export default ProductForms;
