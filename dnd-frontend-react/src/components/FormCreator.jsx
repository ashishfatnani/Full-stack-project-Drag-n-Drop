import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableForm from "./DraggableForm";
import PreField from "./PreField";
import apiService from "../api/apiService";
import { message } from "antd";

const FormCreator = ({ onFormCreated, editingForm }) => {
  const [formName, setFormName] = useState("");
  const [formFields, setFormFields] = useState([]);

  /**
   * Method to create a form
   */
  const handleSaveForm = async () => {
    if (!formName || formFields.length === 0) {
      alert("Please provide a form name and add at least one field.");
      return;
    }

    //aligning the data in this specific format for api call to BE
    const formData = {
      form_name: formName,
      form_data: { fields: formFields },
    };

    try {
      await apiService.saveForm(formData);
      message.success("Form saved successfully!");
      const updatedForms = await apiService.getForms();
      onFormCreated(updatedForms || []);
      setFormName("");
      setFormFields([]);
    } catch (error) {
      message.error(error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={styles.formCreator}>
        <input
          type="text"
          placeholder="Form Name"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          style={styles.formNameInput}
        />
        <div style={styles.canvasContainer}>
          <PreField />
          <DraggableForm
            formFields={formFields}
            setFormFields={setFormFields}
          />
        </div>
        <button onClick={handleSaveForm}>
          {editingForm ? "Update Form" : "Submit Form"}
        </button>
      </div>
    </DndProvider>
  );
};

const styles = {
  formCreator: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formNameInput: {
    marginBottom: "20px",
    padding: "10px",
    width: "250px",
    fontSize: "16px",
  },
  canvasContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
};
export default FormCreator;
