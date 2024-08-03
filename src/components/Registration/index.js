import React from 'react';
import { Form, Input, Button, message } from 'antd';
import './index.css';

const Registration = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log('Received values from form: ', values);
    const url = 'https://ecommerce-backend-bb2o.onrender.com/api/auth/register';
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        message.success('Registration successful!');
        form.resetFields();
      } else {
        message.error(data.error_msg || 'Registration failed!');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      message.error('An unexpected error occurred.');
    }
  };

return (
<div className="login-form-container">
<img
  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
  className="login-website-logo-mobile-image"
  alt="website logo"
/>
<img
  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
  className="login-image"
  alt="website login"
/>
<div className="form-container">
  <img
    src="https://res.cloudinary.com/da7ik4khq/image/upload/v1722589388/ecom2_vvvfyv.png"
    className="login-website-logo-desktop-image"
    alt="website logo"
  />
   <Form
        form={form}
        style={{width:'100%'}}
        layout="vertical"
        name="registration"
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter your password' }]}
          hasFeedback
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
        //   className='input-label '
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm your password" />
        </Form.Item>

        <Form.Item  style={{alignSelf:'center'}} >
          <Button style={{alignSelf:'center'}} type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
  
</div>
</div>
  );
};

export default Registration;
