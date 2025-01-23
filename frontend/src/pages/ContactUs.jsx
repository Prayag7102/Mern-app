import React from 'react'
import { Form, Input, Button } from 'antd'

const ContactUs = () => {
    const [form] = Form.useForm()

    const onFinish = (values) => {
        console.log('Success:', values)
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
                <Form
                    form={form}
                    name="contact"
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'The input is not valid E-mail!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Subject"
                        name="subject"
                        rules={[{ required: true, message: 'What is your inquiry about?' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Message"
                        name="message"
                        rules={[{ required: true, message: 'Please input your message!' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default ContactUs