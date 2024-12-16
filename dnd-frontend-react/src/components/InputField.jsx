
const InputField = ({ field, onChange }) => {
  switch (field.type) {
    case "select":
      return (
        <div style={styles.inputField}>
          <label>{field.label}</label>
          <select onChange={(e) => onChange(e.target.value)}>
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        </div>
      );
    case "radio":
      return (
        <div style={styles.inputField}>
          <label>{field.label}</label>
          <div>
            <label>
              <input
                type="radio"
                name={field.id}
                value="option1"
                onChange={() => onChange("option1")}
              />{" "}
              Option 1
            </label>
            <label>
              <input
                type="radio"
                name={field.id}
                value="option2"
                onChange={() => onChange("option2")}
              />{" "}
              Option 2
            </label>
          </div>
        </div>
      );
    case "checkbox":
      return (
        <div style={styles.inputField}>
          <label>{field.label}</label>
          <div>
            <label>
              <input
                type="checkbox"
                onChange={(e) => onChange(e.target.checked)}
              />{" "}
              Check me
            </label>
          </div>
        </div>
      );
    case "date":
      return (
        <div style={styles.inputField}>
          <label>{field.label}</label>
          <input
            type="date"
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      );
    default:
      return (
        <div style={styles.inputField}>
          <label>{field.label}</label>
          <input
            type={field.type}
            value={field.value || ""}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      );
  }
};

const styles = {
  inputField: {
    marginBottom: "10px",
  },
};

export default InputField;
