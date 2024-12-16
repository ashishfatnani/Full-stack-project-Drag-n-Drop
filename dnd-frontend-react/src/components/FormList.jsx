import apiService from "../api/apiService";
import { FaTrash, FaEdit } from "react-icons/fa";

const FormList = ({ forms, setForms, onEditForm }) => {
  // const [forms, setForms] = useState([]);

  // useEffect(() => {
  //   fetchForms();
  // }, []);

  // const fetchForms = async () => {
  //   try {
  //     const response = await apiService.getForms();
  //     console.log("✌️response --->", response);
  //     setForms(response || []);
  //   } catch (error) {
  //     console.error("Error fetching forms:", error);
  //   }
  // };

  const handleDelete = async (id) => {
    console.log("✌️id --->", id);
    if (!window.confirm("Are you sure you want to delete this form?")) {
      return;
    }
    try {
      await apiService.deleteForm(id);
      setForms(forms.filter((form) => form._id !== id));
      alert("Form deleted successfully!");
    } catch (error) {
      console.error("Error deleting form:", error);
      alert("Failed to delete the form. Please try again.");
    }
  };

  const handleEdit = (form) => {
    console.log("✌️form --->", form);
    onEditForm(form);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Saved Forms</h2>
      {forms.length === 0 ? (
        <p>No forms available. Create a new form to see it listed here!</p>
      ) : (
        <ul style={styles.formList}>
          {forms.map((form) => (
            <li key={form._id} style={styles.formItem}>
              <div style={styles.formDetails}>
                <h3 style={styles.formName}>{form.form_name}</h3>
                <p style={styles.createdAt}>
                  Created: {new Date(form.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div style={styles.formData}>
                {form.form_data.fields &&
                  form.form_data.fields.map((field, ind) => (
                    <div key={ind} style={styles.field}>
                      <strong style={styles.label}>{field.label}: </strong>
                      <span style={styles.value}>{field.value || "-"}</span>
                    </div>
                  ))}
              </div>
              <div style={styles.actionButtons}>
                <button
                  style={{ ...styles.button, ...styles.editButton }}
                  onClick={() => handleEdit(form)}
                >
                  <FaEdit />
                </button>
                <button
                  style={{ ...styles.button, ...styles.deleteButton }}
                  onClick={() => handleDelete(form._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    margin: "20px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: "24px",
    marginBottom: "10px",
    textAlign: "center",
  },
  formList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  formItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#fff",
  },
  formDetails: {
    flex: 1,
  },
  formName: {
    margin: 0,
    fontSize: "18px",
  },
  createdAt: {
    margin: 0,
    fontSize: "14px",
    color: "#888",
  },
  formData: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#f1f1f1",
    borderRadius: "5px",
  },
  field: {
    marginBottom: "5px",
  },
  label: {
    color: "#333",
    fontWeight: "bold",
  },
  value: {
    color: "#555",
  },
  actionButtons: {
    display: "flex",
    gap: "10px",
  },
  button: {
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    padding: "5px",
  },
  editButton: {
    color: "blue",
  },
  deleteButton: {
    color: "red",
  },
};

export default FormList;

// import { Button, List, message } from "antd";
// import { FaTrash, FaEdit } from "react-icons/fa";
// import apiService from "../api/apiService";

// const FormList = ({ forms, setForms, onEditForm }) => {
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this form?")) return;

//     try {
//       await apiService.deleteForm(id);
//       const updatedForms = await apiService.getForms(); // Refresh list
//       setForms(updatedForms.data || []);
//       message.success("Form deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting form:", error);
//       message.error("Failed to delete form. Please try again.");
//     }
//   };

//   return (
//     <List
//       bordered
//       dataSource={forms}
//       renderItem={(form) => (
//         <List.Item
//           actions={[
//             <>
//               <Button
//                 icon={<FaEdit />}
//                 onClick={() => onEditForm(form)}
//                 type="link"
//               />
//               ,
//               <Button
//                 icon={<FaTrash />}
//                 onClick={() => handleDelete(form.id)}
//                 type="link"
//                 danger
//               />
//             </>,
//           ]}
//         >
//           <div>
//             <strong>{form.form_name}</strong>
//             <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>
//               Created At: {new Date(form.created_at).toLocaleString()}
//             </p>
//           </div>
//         </List.Item>
//       )}
//     />
//   );
// };

// export default FormList;
