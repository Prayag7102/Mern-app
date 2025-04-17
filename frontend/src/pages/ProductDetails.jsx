import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useProduct } from "../hooks/useProduct";
import { useReview } from "../hooks/useReview";
import { ProductImages } from "../components/product/ProductImages";
import { ProductInfo } from "../components/product/ProductInfo";
import { ReviewSection } from "../components/product/ReviewSection";
import Loading from "../components/LoaderSpinner";
import { useUser } from "../context/user.context";

const ProductDetail = () => {
  const { id } = useParams();
  const {user} = useUser();
  const [activeTab, setActiveTab] = useState("details");
  const {
    product,
    setProduct,
    selectedColor,
    selectedSize,
    quantity,
    loading,
    handleColorSelect,
    handleSizeSelect,
    handleQuantityChange,
    handleAddToCart,
  } = useProduct(id);

  const reviewHook = useReview(id, setProduct);

  if (loading || !product) return <Loading />;

  return (
    <div className="container mx-auto lg:p-6 xs:p-0">
      <motion.div
        className="lg:grid sm:block xs:block lg:grid-cols-2 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ProductImages product={product} />
        <ProductInfo
          product={product}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          quantity={quantity}
          handleColorSelect={handleColorSelect}
          handleSizeSelect={handleSizeSelect}
          handleQuantityChange={handleQuantityChange}
          handleAddToCart={handleAddToCart}
          setOpenReviewModal={reviewHook.setOpenReviewModal}
        />
      </motion.div>

      <div className="mt-4">
        
        <div className="flex border-b border-gray-300 mb-4">
          <button
            onClick={() => setActiveTab("details")}
            className={`px-4 py-2 text-sm font-semibold ${
              activeTab === "details"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600"
            }`}
          >
            Product Details
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-4 py-2 text-sm font-semibold ml-4 ${
              activeTab === "reviews"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600"
            }`}
          >
            Reviews
          </button>
        </div>

        {activeTab === "details" && (
          <div className="text-base text-gray-800">
            <h2 className="mb-2 text-2xl font-semibold">Product Details</h2>
            <div
              dangerouslySetInnerHTML={{ __html: product.details }}
              className="prose max-w-none"
            />
          </div>
        )}

        {activeTab === "reviews" && (
          <ReviewSection
            product={product}
            userId={user?._id}
            openReviewModal={reviewHook.openReviewModal}
            setOpenReviewModal={reviewHook.setOpenReviewModal}
            deleteModalOpen={reviewHook.deleteModalOpen}
            setDeleteModalOpen={reviewHook.setDeleteModalOpen}
            editModalOpen={reviewHook.editModalOpen}
            setEditModalOpen={reviewHook.setEditModalOpen}
            rating={reviewHook.rating}
            setRating={reviewHook.setRating}
            comment={reviewHook.comment}
            setComment={reviewHook.setComment}
            editRating={reviewHook.editRating}
            setEditRating={reviewHook.setEditRating}
            editComment={reviewHook.editComment}
            setEditComment={reviewHook.setEditComment}
            handleAddReview={reviewHook.handleAddReview}
            handleEditReview={reviewHook.handleEditReview}
            handleDeleteReview={reviewHook.handleDeleteReview}
            handleEditClick={reviewHook.handleEditClick}
            handleDeleteClick={reviewHook.handleDeleteClick}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
