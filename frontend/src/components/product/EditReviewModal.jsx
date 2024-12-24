import { Fragment } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { motion } from 'framer-motion';

const EditReviewModal = ({
  isOpen,
  onClose,
  rating,
  setRating,
  comment,
  setComment,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="min-h-screen px-4 text-center">
        <div className="fixed inset-0 bg-black opacity-30" />
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Edit Your Review
          </h2>

          <div className="mt-4">
            <div className="flex items-center space-x-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setRating(star)}
                >
                  <AiFillStar
                    className={`w-8 h-8 ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                </motion.button>
              ))}
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border rounded-md"
              rows="4"
              placeholder="Edit your review..."
            />
          </div>

          <div className="mt-4 flex justify-end space-x-2">
            <button
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              onClick={onSubmit}
              disabled={!rating || !comment}
            >
              Update Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReviewModal;