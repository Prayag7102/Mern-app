import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../api/cart";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";
import { BsCart } from "react-icons/bs";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axiosInstance from "../api/axios";
import { MdRateReview } from "react-icons/md";
import { CiEdit, CiCircleRemove } from "react-icons/ci";
import { decodeToken, deleteReview, editReview } from "../api/review";
import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom, Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion"; // Import Framer Motion
import gsap from "gsap"; // Import GSAP
import { ScrollTrigger } from "gsap/ScrollTrigger"; 
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/zoom";
import Loading from '../components/LoaderSpinner'

gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger plugin

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const token = localStorage.getItem("token");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        toast.error("Error fetching product details.");
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!token) {
      toast.error("You need to be logged in to add items to the cart.");
      return;
    }
    try {
      await addToCart(product._id, 1);
      toast.success("Product added to cart successfully!", { theme: "dark" });
    } catch (error) {
      toast.error("Failed to add product to cart.");
    }
  };

  const handleAddReview = async () => {
    if (!token) {
      toast.error("You need to be logged in to add a review.");
      return;
    }
    try {
      await axiosInstance.post(`/products/${id}/review`, { rating, comment });
      toast.success("Review added successfully!");
      setOpenReviewModal(false);
      setRating(0);
      setComment("");
      const response = await axiosInstance.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      toast.error("Failed to add review.");
    }
  };

  const decodedToken = decodeToken(token);
  const userId = decodedToken?.id;

  const handleEditClick = (review) => {
    setSelectedReviewId(review._id);
    setEditRating(review.rating);
    setEditComment(review.comment);
    setEditModalOpen(true);
  };

  const handleEditReview = async () => {
    try {
      const updatedReview = await editReview(
        product._id,
        selectedReviewId,
        editRating,
        editComment
      );
      toast.success("Review Edited successfully!", {
        theme: "dark",
        draggable: true,
      });
      setEditModalOpen(false);
      const updatedProduct = await axiosInstance.get(`/products/${product._id}`);
      setProduct(updatedProduct.data);
    } catch (error) {
      toast.error("Error editing review:", error);
    }
  };

  const handleDeleteClick = (reviewId) => {
    setSelectedReviewId(reviewId);
    setDeleteModalOpen(true);
  };

  const handleDeleteReview = async () => {
    try {
      await deleteReview(product._id, selectedReviewId);
      toast.success("Review deleted successfully!", {
        theme: "dark",
        draggable: true,
      });
      setDeleteModalOpen(false);
      const updatedProduct = await axiosInstance.get(`/products/${product._id}`);
      setProduct(updatedProduct.data);
    } catch (error) {
      toast.error("Error deleting review:", error);
    }
  };

  if (!product) return <Loading />;

  return (
    <div className="container mx-auto lg:p-6 xs:p-0">
      <motion.div
        className="lg:grid sm:block xs:block lg:grid-cols-2 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center">
        <Swiper
            loop={product.otherImages.length > 1} // Enable loop only if more than 1 slide
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            grabCursor={true}
            zoom={true}
            navigation={true}
            pagination={{ clickable: true }}
            modules={[Zoom, Navigation, Pagination, Autoplay]}
            className="w-full max-w-xl"
            spaceBetween={10}
            slidesPerView={1}
          >
            <SwiperSlide>
              <img
                src={`http://localhost:5000/uploads/${product.image}`}
                alt={product.name}
                className="rounded-lg shadow-md object-contain"
              />
            </SwiperSlide>
            {product.otherImages.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={`http://localhost:5000/uploads/${img}`}
                  alt={product.name}
                  className="max-w-full object-cover"
                />
              </SwiperSlide>
            ))}
        </Swiper>
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
          <motion.p
            className="text-lg text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Brand: <span className="font-semibold">{product.brand}</span>
          </motion.p>
          <div className="flex items-center space-x-4">
            <motion.p
              className="text-2xl font-bold text-red-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Rs. {product.discountedPrice}
            </motion.p>
            <motion.p
              className="text-lg text-gray-400 line-through"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Rs. {product.price}
            </motion.p>
          </div>
          <motion.p
            className="text-gray-700 product-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {product.description}
          </motion.p>

          <div>
            <h3 className="font-semibold text-lg mb-2">Features:</h3>
            <ul className="list-disc list-inside text-gray-600">
              {product.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Sizes:</h3>
            <ul className="list-disc list-inside text-gray-600">
              {product.sizes.map((size, idx) => (
                <li key={idx}>{size}</li>
              ))}
            </ul>
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

          <div className="space-y-4">
            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
            <div className="flex gap-5">
              <motion.button
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                onClick={handleAddToCart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
        </div>
      </motion.div>

      <div className=" mt-2">
        <h2 className="mb-2  text-2xl product-details">Product Details</h2>
        <div dangerouslySetInnerHTML={{ __html: product.details }}></div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Reviews: {product.reviews.length}</h2>
        {product.reviews.length > 0 ? (
          product.reviews.map((review) => (
            <div key={review._id} className="border-b py-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">{review.user?.name || "Anonymous"}</p>
                <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
              </div>
              <p className="text-gray-700 mt-1">{review.comment}</p>
              <div className="flex items-center mt-1">
                {"★".repeat(review.rating)
                  .padEnd(5, "☆")
                  .split("")
                  .map((star, idx) => (
                    <span key={idx} className={star === "★" ? "text-yellow-500" : "text-gray-400"}>
                      {star}
                    </span>
                  ))}
              </div>
              {review.user?._id === userId && (
                <div className="mt-2 flex space-x-4">
                  <motion.button
                    onClick={() => handleEditClick(review)}
                    className="text-blue-600 hover:text-blue-800"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <CiEdit className="text-2xl" />
                  </motion.button>
                  <motion.button
                    onClick={() => handleDeleteClick(review._id)}
                    className="text-red-600 hover:text-red-800"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <CiCircleRemove className="text-2xl" />
                  </motion.button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}

        <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
          <div className="bg-white p-6 rounded-lg max-w-md mx-auto mt-24 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-gray-600 mb-4">Are you sure you want to delete this review?</p>
            <div className="mt-4 flex gap-2 justify-end">
              <Button onClick={() => setDeleteModalOpen(false)} variant="outlined">
                Cancel
              </Button>
              <Button onClick={handleDeleteReview} variant="contained" color="primary">
                Delete
              </Button>
            </div>
          </div>
        </Modal>

        {/* Add Review Modal */}
        <Modal open={openReviewModal} onClose={() => setOpenReviewModal(false)}>
          <div className="bg-white p-6 rounded-lg max-w-md mx-auto mt-24 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add a Review</h2>
            <Rating value={rating} onChange={(e, newValue) => setRating(newValue)} size="large" />
            <TextField
              label="Comment"
              fullWidth
              multiline
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              margin="normal"
            />
            <div className="mt-4 flex gap-2 justify-end">
              <Button onClick={() => setOpenReviewModal(false)} variant="outlined">
                Cancel
              </Button>
              <Button onClick={handleAddReview} variant="contained" color="primary">
                Submit Review
              </Button>
            </div>
          </div>
        </Modal>

        {/* Edit Review Modal */}
        {editModalOpen && (
          <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
            <div className="bg-white p-6 rounded-lg max-w-md mx-auto mt-24 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Edit Review</h2>
              <Rating value={editRating} onChange={(e, newValue) => setEditRating(newValue)} size="large" />
              <TextField
                label="Comment"
                fullWidth
                multiline
                rows={4}
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
                margin="normal"
              />
              <div className="mt-4 flex gap-2 justify-end">
                <Button onClick={() => setEditModalOpen(false)} variant="outlined">
                  Cancel
                </Button>
                <Button onClick={handleEditReview} variant="contained" color="primary">
                  Save Changes
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
