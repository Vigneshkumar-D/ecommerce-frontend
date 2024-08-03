import React, {useState } from 'react';
import { BsFilterRight } from 'react-icons/bs';
import Cookies from 'js-cookie'
import './index.css';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
} from "antd";

const ProductsHeader = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [mode, setMode] = useState("Add");
  const [editId, setEditId] = useState(null);
  const currentUser = localStorage.getItem('currentUser');
  console.log("currentUser ", currentUser)

  const showModal = () => {
    setMode("Add");
    setEditId(null);
    setIsModalOpen(true);
    form.resetFields();
  };


  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (value) => {
      const jwtToken = Cookies.get('jwt_token'); 
      const url = 'https://ecommerce-backend-bb2o.onrender.com/api/products';

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(value),
      };
  
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok) {
          message.success("Product Added Successfully")
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
    <div className="products-header">
      <h1 className="products-list-heading">All Products</h1>
      <div type="button" className="sort-by-container">
        {currentUser === "admin" ? (
          <button className="add-desktop-btn"  onClick={showModal}>Add Product</button>
        ) : null}
        <BsFilterRight className="sort-by-icon" />
        <p className="sort-by">Sort by</p>
        <select
          className="sort-by-select"
          value={props.activeOptionId}
          onChange={props.onChangeSortby}
        >
          {props.sortbyOptions.map(eachOption => (
            <option
              key={eachOption.optionId}
              value={eachOption.optionId}
              className="select-option"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>

      <Modal
        title="Product"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Row gutter={[10, 10]}>
            <Col xs={24} sm={12} md={12} lg={12}>
              <Form.Item label="Name" name="name">
                <Input
                  style={{ width: "100%" }}
                  disabled={mode === "View"}
                  placeholder="Enter Product Name"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
              <Form.Item
                label="Image Url"
                name="imageUrl"
              >
                <Input
                  style={{ width: "100%" }}
                  disabled={mode === "View"}
                  placeholder="Enter Image Url"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
              <Form.Item label="Description" name="description">
                <Input
                  style={{ width: "100%" }}
                  disabled={mode === "View"}
                  placeholder="Enter Description"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
              <Form.Item
                label="Price"
                name="price"
              >
                <InputNumber
                  style={{ width: "100%" }}
                  disabled={mode === "View"}
                  min={0}
                  placeholder="Enter Price"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
              <Form.Item
                label="Quantity"
                name="stockQuantity"
              >
                <InputNumber
                  style={{ width: "100%" }}
                  disabled={mode === "View"}
                  min={0}
                  placeholder="Enter"
                />
              </Form.Item>
            </Col>
          </Row>
          {mode !== "View" && (
          <Form.Item>
            <Button style={{alignSelf:'flex-end'}} htmlType="submit" type="primary">
              {mode === "Edit" ? "Update" : "Submit"}
            </Button>
          </Form.Item>
        )}
        </Form>
      </Modal>
    </div>
  );
};

export default ProductsHeader