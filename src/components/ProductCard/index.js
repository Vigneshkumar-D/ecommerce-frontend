import { Link } from 'react-router-dom'
import { RiDeleteBin3Line, RiEdit2Line } from "react-icons/ri";
import Cookies from 'js-cookie'
import './index.css'
import {
  Button,
  Col,
  Form,
  message,
  Input,
  InputNumber,
  Modal,
  Row,
} from "antd";
import { useEffect, useState } from 'react';

const ProductCard = props => {
  const currentUser = localStorage.getItem('currentUser');
  const { productData } = props;
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { title, rating, imageUrl, description, price, id, stockQuantity } = productData;

  useEffect(() => {
    if (isModalOpen) {
      form.setFieldsValue({
        name: title,
        imageUrl: imageUrl,
        description: description,
        price: price,
        stockQuantity: stockQuantity,
      });
    }
  }, [isModalOpen, form, title, imageUrl, description, price, stockQuantity]);

  const onClickDelete = async () => {
    const jwtToken = Cookies.get('jwt_token');
    const url = `https://ecommerce-backend-bb2o.onrender.com/api/products/${id}`;
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        message.success("Product Deleted Successfully");
      } else {
        message.error(data.error_msg);
      }
    } catch (error) {
      console.error('Failed:', error);
      message.error('An unexpected error occurred.');
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (values) => {
    const jwtToken = Cookies.get('jwt_token');
    const url = `https://ecommerce-backend-bb2o.onrender.com/api/products/${id}`;

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(values),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        message.success("Product Updated Successfully");
        handleCancel();
      } else {
        message.error(data.error_msg);
      }
    } catch (error) {
      console.error('Failed:', error);
      message.error('An unexpected error occurred.');
    }
  };

  return (
    <li className="product-item">
      {currentUser === 'admin' && (
        <div style={{ alignSelf: 'flex-end', fontSize: '20px', color: '#000000' }}>
          <RiEdit2Line style={{ marginRight: '10px', cursor: 'pointer' }} onClick={showModal} />
          <RiDeleteBin3Line style={{ cursor: 'pointer' }} onClick={onClickDelete} />
        </div>
      )}
      <Link to={`/products/${id}`} className='link-item'>
        <img src={imageUrl} alt="product" className="thumbnail" />
        <h1 className="title">{title}</h1>
        <div className="product-details">
          <p className="price">Rs {price}/-</p>
          <div className="rating-container">
            <p className="rating">{rating}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="star"
            />
          </div>
        </div>
      </Link>

      <Modal
        title="Product"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={onSubmit} initialValues={productData}>
          <Row gutter={[10, 10]}>
            <Col xs={24} sm={12} md={12} lg={12}>
              <Form.Item label="Name" name="name">
                <Input
                  style={{ width: "100%" }}
                  placeholder="Enter Product Name"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
              <Form.Item label="Image Url" name="imageUrl">
                <Input
                  style={{ width: "100%" }}
                  placeholder="Enter Image Url"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
              <Form.Item label="Description" name="description">
                <Input
                  style={{ width: "100%" }}
                  placeholder="Enter Description"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
              <Form.Item label="Price" name="price">
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  placeholder="Enter Price"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
              <Form.Item label="Quantity" name="stockQuantity">
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  placeholder="Enter"
                />
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item style={{ alignSelf: 'flex-start' }}>
            <Button style={{ alignSelf: 'flex-start' }} htmlType="submit" type="primary">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </li>
  );
};

export default ProductCard
