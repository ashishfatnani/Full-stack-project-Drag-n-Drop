
import { useDrop } from "react-dnd";
import InputField from "./InputField";
import { FaTrash } from "react-icons/fa";

const DraggableForm = ({ formFields, setFormFields }) => {
  const [, drop] = useDrop(() => ({
    accept: "FIELD",
    drop: (item) => addFieldToForm(item),
  }));

  const addFieldToForm = (field) => {
    setFormFields((prevFields) => [
      ...prevFields,
      { ...field, id: Date.now() },
    ]);
  };

  const handleInputChange = (id, value) => {
    const updatedFields = formFields.map((field) =>
      field.id === id ? { ...field, value } : field
    );
    setFormFields(updatedFields);
  };

  const handleDeleteField = (id) => {
    const updatedFields = formFields.filter((field) => field.id !== id);
    setFormFields(updatedFields);
  };

  return (
    <div ref={drop} style={styles.formContainer}>
      {formFields.length > 0 ? (
        formFields.map((field) => (
          <div key={field.id} style={styles.fieldContainer}>
            <InputField
              field={field}
              onChange={(value) => handleInputChange(field.id, value)}
            />
            <button
              style={styles.deleteButton}
              onClick={() => handleDeleteField(field.id)}
            >
              <FaTrash />
            </button>
          </div>
        ))
      ) : (
        <p>Drag fields here to create your form</p>
      )}
    </div>
  );
};

const styles = {
  formContainer: {
    padding: "10px",
    border: "1px solid #ccc",
    minHeight: "300px",
    width: "400px",
    marginTop: "20px",
  },
  fieldContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  deleteButton: {
    marginLeft: "10px",
    backgroundColor: "red",
    border: "none",
    padding: "5px",
    cursor: "pointer",
  },
};




export default DraggableForm;
