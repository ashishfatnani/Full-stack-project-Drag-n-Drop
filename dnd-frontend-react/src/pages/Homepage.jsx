import { useState, useEffect } from "react";
import FormList from "../components/FormList";
import FormCreator from "../components/FormCreator";
import apiService from "../api/apiService";
const Homepage = () => {
  const [forms, setForms] = useState([]);
  const [editingForm, setEditingForm] = useState(null);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await apiService.getForms();
      console.log("✌️response --->", response);
      setForms(response || []);
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  const handleEditComplete = () => {
    fetchForms(); // Refresh forms
    setEditingForm(null); // Exit edit mode
  };
  return (
    <div>
      <div className="home">
        <FormCreator
          onFormCreated={setForms}
          editingForm={editingForm}
          onEditComplete={handleEditComplete}
        ></FormCreator>
        <FormList
          forms={forms}
          setForms={setForms}
          onEditForm={setEditingForm}
        ></FormList>
      </div>
    </div>
  );
};

export default Homepage;
