import { motion } from 'framer-motion';
import { AiFillStar } from 'react-icons/ai';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ReviewModal from './ReviewModal';
import DeleteModal from './DeleteModal';
import EditReviewModal from './EditReviewModal';

export const ReviewSection = ({
  product,
  userId,
  openReviewModal,
  setOpenReviewModal,
  deleteModalOpen,
  setDeleteModalOpen,
  editModalOpen,
  setEditModalOpen,
  rating,
  setRating,
  comment,
  setComment,
  editRating,
  setEditRating,
  editComment,
  setEditComment,
  handleAddReview,
  handleEditReview,
  handleDeleteReview,
  handleEditClick,
  handleDeleteClick,
}) => {
  return (
    <motion.div
      className="mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

      {/* Reviews List */}
      <div className="space-y-6">
        {product.reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, index) => (
                    <AiFillStar
                      key={index}
                      className={`w-5 h-5 ${
                        index < review.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-2">{review.comment}</p>
                <p className="text-sm text-gray-500">
                  By {review.user.name} on {new Date(review.date).toLocaleDateString()}
                </p>
              </div>

              {/* Edit/Delete buttons for user's own reviews */}
              {userId === review.user._id && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditClick(review)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(review._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {product.reviews.length === 0 && (
          <p className="text-gray-500 text-center">No reviews yet.</p>
        )}
      </div>

      {/* Modals */}
      <ReviewModal
        isOpen={openReviewModal}
        onClose={() => setOpenReviewModal(false)}
        rating={rating}
        setRating={setRating}
        comment={comment}
        setComment={setComment}
        onSubmit={handleAddReview}
      />

      <EditReviewModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        rating={editRating}
        setRating={setEditRating}
        comment={editComment}
        setComment={setEditComment}
        onSubmit={handleEditReview}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteReview}
      />
    </motion.div>
  );
}; 