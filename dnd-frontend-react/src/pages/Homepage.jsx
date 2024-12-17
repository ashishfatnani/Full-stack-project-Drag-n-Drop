import { useState, useEffect } from "react";
import FormList from "../components/FormList";
import FormCreator from "../components/FormCreator";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  Radio,
  Checkbox,
  // DatePicker,
  message,
} from "antd";
import apiService from "../api/apiService";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingForm, setEditingForm] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = useForm();
  const user = apiService.getCurrentUser();
  console.log("✌️user --->", user);
  const navigate = useNavigate();

  useEffect(() => {
    fetchForms();
    setIsModalVisible(false);
    setEditingForm(null);
  }, []);

  const handleLogout = () => {
    apiService.logout();
    navigate("/login");
  };

  const fetchForms = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getForms();
      console.log("✌️response --->", response);
      setForms(response || []);
    } catch (error) {
      console.error("Error fetching forms:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditComplete = () => {
    fetchForms(); // Refresh forms
    setEditingForm(null); // Exit edit mode
  };

  // Show Modal to Edit Form
  const handleEditForm = (formValues) => {
    console.log("✌️formValues --->", formValues);
    setEditingForm(formValues); // Set the form data for editing
    setIsModalVisible(true); // Show the modal
    form.setFieldsValue({
      fields: formValues, // Prefill the form fields with the current data
    });
  };

  // Handle modal close
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Handle form submit
  const handleSubmit = async (values) => {
    try {
      const updatedFormData = convertToDesiredFormat(values);
      console.log("✌️updatedFormData --->", updatedFormData);

      await apiService.updateForm(editingForm._id, updatedFormData); // Update the form via API
      message.success("Form updated successfully!");
      fetchForms(); // Refresh the list of forms
      setIsModalVisible(false); // Close the modal after saving
      setIsModalVisible(false);
      setEditingForm(null);
      form.resetFields();
    } catch (error) {
      message.error(error);
    }
  };

  const convertToDesiredFormat = (data) => {
    // Extract the form name
    const form_name = data.form_name;

    // Remove form_name from data to leave only the field data
    const fieldsData = Object.keys(data)
      .filter((key) => key !== "form_name") // Exclude form_name from the fields
      .map((key) => {
        return {
          type: key, // Use the key as the field type (text, email, etc.)
          label: key, // Use the key as the label
          value: data[key], // Use the value for the corresponding key
        };
      });

    return {
      form_name,
      form_data: {
        fields: fieldsData,
      },
    };
  };

  return (
    <div>
      <div>
        <h2>Welcome, {user?.username || "User"}!</h2>

        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="home">
        <FormCreator
          onFormCreated={setForms}
          editingForm={editingForm}
          onEditComplete={handleEditComplete}
        ></FormCreator>
        <FormList
          forms={forms}
          setForms={setForms}
          onEditForm={handleEditForm}
          isLoading={isLoading}
          setIsModalVisible={setIsModalVisible}
          modalForm={form}
        ></FormList>
      </div>
      <Modal
        title="Edit Form"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          onFinish={handleSubmit} // On submit, call handleSubmit
        >
          <Form.Item
            label={"Form name"}
            name={"form_name"}
            initialValue={editingForm?.form_name}
            style={{ marginBottom: "10px" }}
          >
            <Input />
          </Form.Item>
          <div>
            {editingForm?.form_data?.fields.map((field) => (
              <div key={field._id} style={styles.formField}>
                <Form.Item
                  label={field.label}
                  name={field.type} // Nested structure for dynamic fields
                  initialValue={field.value}
                  style={{ marginBottom: "10px" }}
                >
                  {(field.type === "text" || field.type === "email") && (
                    <Input />
                  )}
                  {field.type === "textarea" && <Input type="textarea" />}
                  {field.type === "number" && <Input type="number" />}
                  {field.type === "select" && (
                    <Select>
                      <Select.Option value="Option 1">Option 1</Select.Option>
                      <Select.Option value="Option 2">Option 2</Select.Option>
                    </Select>
                  )}
                  {field.type === "radio" && (
                    <Radio.Group>
                      <Radio value="Option 1">Option 1</Radio>
                      <Radio value="Option 2">Option 2</Radio>
                    </Radio.Group>
                  )}
                  {field.type === "checkbox" && <Checkbox />}
                  {field.type === "date" && <input type="date"></input>}
                </Form.Item>
              </div>
            ))}
          </div>

          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  formField: {
    marginBottom: "10px",
  },
};

export default Homepage;
