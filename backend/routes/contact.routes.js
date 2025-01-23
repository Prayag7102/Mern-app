const express = require('express');
const { body } = require('express-validator');
const { createContact, getAllInquiries } = require('../controllers/contactController');
const { verifyToken, protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/inquiry', [
    body('name')
        .isLength({ min: 3, max: 20 }).withMessage('Name must be between 3 and 20 characters long'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone')
        .isLength({ min: 10, max: 10 }).withMessage('Phone number must be 10 digits')
        .isNumeric().withMessage('Phone number must be numeric'),
    body('subject').notEmpty().withMessage('Subject is required'),
    body('message').notEmpty().withMessage('Message is required'),
],verifyToken, createContact);

router.get('/get-inquiry',protect,getAllInquiries)

module.exports = router; 