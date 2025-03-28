const { validationResult } = require('express-validator');
const Contact = require('../models/contact.model');

const createContact = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, subject, message } = req.body;
    try {
        const newContact = new Contact({ name, email, phone, subject, message });
        await newContact.save();
        res.status(201).json({ message: 'Inquiry submitted successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Contact.find(); 
        res.status(200).json(inquiries); 
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const deleteContact = async (req, res) => {
    const { id } = req.params;

    try {
        const contact = await Contact.findByIdAndDelete(id);

        if (!contact) {
            return res.status(200).json({ error: 'Contact not found' });
        }

        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { createContact, getAllInquiries,deleteContact };