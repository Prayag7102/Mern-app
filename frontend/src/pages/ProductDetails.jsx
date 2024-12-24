import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProduct } from '../hooks/useProduct';
import { useReview } from '../hooks/useReview';
import { ProductImages } from '../components/product/ProductImages';
import { ProductInfo } from '../components/product/ProductInfo';
import { ReviewSection } from '../components/product/ReviewSection';
import Loading from '../components/LoaderSpinner';

const ProductDetail = () => {
  const { id } = useParams();
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
      
      <div className=" mt-2">
        <h2 className="mb-2  text-2xl product-details">Product Details</h2>
        <div dangerouslySetInnerHTML={{ __html: product.details }}></div>
      </div>

      <ReviewSection
        product={product}
        userId={reviewHook.userId}
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
      
    </div>
  );
};

export default ProductDetail;
