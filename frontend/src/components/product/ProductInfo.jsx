import { motion } from 'framer-motion';
import { BsCart } from 'react-icons/bs';
import { MdRateReview } from 'react-icons/md';

export const ProductInfo = ({
  product,
  selectedColor,
  selectedSize,
  quantity,
  handleColorSelect,
  handleSizeSelect,
  handleQuantityChange,
  handleAddToCart,
  setOpenReviewModal,
}) => {
  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
      <motion.p
        className="text-lg text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Brand: <span className="font-semibold">{product.brand}</span>
      </motion.p>

      {/* Price */}
      <div className="flex items-center space-x-4">
        <motion.p
          className="text-2xl font-bold text-red-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Rs. {product.discountedPrice}
        </motion.p>
        <motion.p className="text-lg text-gray-400 line-through">
          Rs. {product.price}
        </motion.p>
      </div>

      {/* Description */}
      <motion.p className="text-gray-700">{product.description}</motion.p>

      {/* Features */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Features:</h3>
        <ul className="list-disc list-inside text-gray-600">
          {product.features.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
      </div>

      {/* Size Selection */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Sizes:</h3>
        <div className="flex flex-wrap space-x-2">
          {product.sizes.map((size, idx) => (
            <button
              key={idx}
              className={`px-4 py-2 rounded-md border-2 text-sm ${
                selectedSize === size
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-gray-300 bg-white text-gray-700'
              }`}
              onClick={() => handleSizeSelect(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Colors:</h3>
        <div className="flex flex-wrap space-x-2">
          {product.colors.map((color, idx) => (
            <button
              key={idx}
              className={`w-8 h-8 rounded-full border-2 ${
                selectedColor === color ? 'border-blue-500' : 'border-gray-300'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelect(color)}
              aria-label={`Select ${color}`}
            />
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Quantity:</h3>
        <input
          type="number"
          min="1"
          max={product.stock}
          value={quantity}
          onChange={handleQuantityChange}
          className="w-20 px-2 py-1 border rounded"
        />
      </div>
      <div className="space-y-2">
            <h3 className="font-semibold text-lg">Specifications:</h3>
            <p className="text-sm text-gray-500">Weight: {product.specifications?.weight}</p>
            <p className="text-sm text-gray-500">Dimensions: {product.specifications?.dimensions}</p>
            <p className="text-sm text-gray-500">Material: {product.specifications?.material}</p>
            <p className="text-sm text-gray-500">Other: {product.specifications?.other}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center mt-4">
              <span className="mr-3">Rating: </span>
              {"★".repeat(product.rating)
                .padEnd(5, "☆")
                .split("")
                .map((star, idx) => (
                  <span key={idx} className={star === "★" ? "text-yellow-500" : "text-gray-400"}>
                    {star}
                  </span>
                ))}
              <span className="mx-1">{product.rating}</span>
              <span className="mx-1">and Reviews {product.reviews.length}</span>
            </div>
          </div>

      {/* Action Buttons */}
      <div className="flex gap-5">
        
        <motion.button
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          onClick={handleAddToCart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!selectedColor || !selectedSize}
        >
          <BsCart className="text-2xl" /> Add to Cart
        </motion.button>
        <motion.button
          className="w-full bg-gray-600 flex items-center justify-center gap-2 text-white py-3 rounded-md hover:bg-gray-700"
          onClick={() => setOpenReviewModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MdRateReview className="text-2xl" /> Add Review
        </motion.button>
      </div>
    </div>
  );
}; 