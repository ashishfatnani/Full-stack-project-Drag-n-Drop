import { useDrag } from "react-dnd";

const PreField = () => {
    const fieldTypes = [
        { type: "text", label: "Text Field" },
        { type: "email", label: "Email Field" },
        { type: "number", label: "Number Field" },
        { type: "select", label: "Select Field" },
        { type: "radio", label: "Radio Buttons" },
        { type: "checkbox", label: "Checkbox" },
        { type: "date", label: "Date Picker" },
      ];
    

  return (
    <div style={styles.fieldPalette}>
      {fieldTypes.map((field, index) => (
        <DraggableField key={index} field={field} />
      ))}
    </div>
  );
};

const DraggableField = ({ field }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FIELD",
    item: field,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`field-item ${isDragging ? "dragging" : ""}`}
      style={{ ...styles.fieldItem, opacity: isDragging ? 0.5 : 1 }}
    >
      {field.label}
    </div>
  );
};
const styles = {
    fieldPalette: {
      padding: "10px",
      width: "250px",
      border: "1px solid #ddd",
      marginTop: "20px",
    },
    fieldItem: {
      padding: "8px",
      backgroundColor: "#f4f4f4",
      border: "1px solid #ccc",
      marginBottom: "10px",
      cursor: "move",
    },
  };
  

export default PreField;
