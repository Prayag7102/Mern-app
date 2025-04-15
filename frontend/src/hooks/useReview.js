import { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axios';
import { deleteReview, editReview } from '../api/review';
import { useUser } from '../context/user.context';

export const useReview = (productId, setProduct) => {
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState('');


  const {user} = useUser();

  const User = user?.id;

  const handleAddReview = async () => {
    if (!user) {
      toast.error('You need to be logged in to add a review.');
      return;
    }
    try {
      await axiosInstance.post(`/products/${productId}/review`, { rating, comment }, {
        withCredentials:true
      });
      toast.success('Review added successfully!');
      resetAndRefresh();
    } catch (error) {
      toast.error('Failed to add review.');
    }
  };

  const handleEditClick = (review) => {
    setSelectedReviewId(review._id);
    setEditRating(review.rating);
    setEditComment(review.comment);
    setEditModalOpen(true);
  };

  const handleEditReview = async () => {
    try {
      await editReview(productId, selectedReviewId, editRating, editComment);
      toast.success('Review edited successfully!', { theme: 'dark' });
      resetAndRefresh();
    } catch (error) {
      toast.error('Error editing review');
    }
  };

  const handleDeleteClick = (reviewId) => {
    setSelectedReviewId(reviewId);
    setDeleteModalOpen(true);
  };

  const handleDeleteReview = async () => {
    try {
      
      await deleteReview(productId, selectedReviewId);
      toast.success('Review deleted successfully!', { theme: 'dark' });
      resetAndRefresh();
    } catch (error) {
      toast.error('Error deleting review');
    }
  };

  const resetAndRefresh = async () => {
    setOpenReviewModal(false);
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setRating(0);
    setComment('');
    const response = await axiosInstance.get(`/products/${productId}`);
    setProduct(response.data);
  };

  return {
    openReviewModal,
    User,
    setOpenReviewModal,
    deleteModalOpen,
    setDeleteModalOpen,
    editModalOpen,
    setEditModalOpen,
    selectedReviewId,
    rating,
    setRating,
    comment,
    setComment,
    editRating,
    setEditRating,
    editComment,
    setEditComment,
    handleAddReview,
    handleEditClick,
    handleEditReview,
    handleDeleteClick,
    handleDeleteReview,
  };
}; 