const ProductCards = ({ product, onQuantityUpdate }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border p-4 flex flex-col">
      <div className="w-full h-48 rounded-xl overflow-hidden mb-4">
        <img
          src={product.image_url || "https://via.placeholder.com/300x200?text=No+Image"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
      <p className="text-sm text-gray-500 mb-1">
        {product.description || "No description provided."}
      </p>

      <div className="text-sm text-gray-600 space-y-1 my-2">
        <p>Type: <span className="font-medium text-gray-700">{product.type}</span></p>
        <p>Price: <span className="font-medium text-green-700">₹{product.price}</span></p>
        <p>Available: <span className="font-medium">{product.quantity}</span></p>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <input
          type="number"
          min="0"
          placeholder="Update Qty.."
          className="px-4 py-1.5 border border-gray-300 rounded-lg w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onBlur={(e) => onQuantityUpdate(product._id, e.target.value)}
        />
      </div>
    </div>
  );
};

export default ProductCards;
