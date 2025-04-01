import React, { useEffect, useState } from 'react';
import { Table, Spin, Input, Button } from 'antd';
import { deleteInquiry, getInquiry } from '../../../api/contact';
import { toast } from 'react-toastify';

const InquiryTable = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchInquiries = async () => {
            try {
                const data = await getInquiry();
                setInquiries(data);
            } catch (error) {
                console.error('Error fetching inquiries:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInquiries();
    }, []);

    const handleSearch = (value) => {
        setSearchText(value);
    };
    
    const handleDelete = async (id) => {
        try {
            await deleteInquiry(id);
            toast.success('Inquiry deleted successfully');
            setInquiries((prev) => prev.filter((inquiry) => inquiry._id !== id));
        } catch (error) {
            toast.error('Error deleting inquiry:', error);
        }
    };
    const filteredInquiries = inquiries.filter(inquiry => {
        return Object.keys(inquiry).some(key =>
            String(inquiry[key]).toLowerCase().includes(searchText.toLowerCase())
        );
    });

    const columns = [
        { title: 'ID', dataIndex: '_id', key: '_id', width: 100, sorter: (a, b) => a._id - b._id },
        { title: 'Name', dataIndex: 'name', key: 'name', width: 150, sorter: (a, b) => a.name.localeCompare(b.name) },
        { title: 'Email', dataIndex: 'email', key: 'email', width: 200 },
        { title: 'Phone', dataIndex: 'phone', key: 'phone', width: 200 },
        { title: 'Subject', dataIndex: 'subject', key: 'subject', width: 200 },
        { title: 'Message', dataIndex: 'message', key: 'message', width: 300 },
        { 
            title: 'Date', 
            dataIndex: 'createdAt', 
            key: 'createdAt', 
            width: 300,
            render: (text) => new Date(text).toLocaleString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
            })
        },
        {
            title: 'Action',
            key: 'action',
            width: 150,
            render: (_, record) => (
                <Button
                    type="primary"
                    danger
                    onClick={() => handleDelete(record._id)}
                >
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <div className='w-[80rem] mt-4'>
            <Input.Search
                placeholder="Search inquiries"
                onSearch={handleSearch}
                style={{ marginBottom: 16 }}
                allowClear
            />
            {loading ? (
                <Spin tip="Loading..." />
            ) : (
                <Table
                    dataSource={filteredInquiries}
                    columns={columns}
                    rowKey="_id"
                    scroll={{ x: 'max-content' }}
                />
            )}
        </div>
    );
};

export default InquiryTable;