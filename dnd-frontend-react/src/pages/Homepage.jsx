import FormList from "../components/FormList";
import FormCreator from "../components/FormCreator";
const Homepage = () => {
  return (
    <div>
      <div className="home">
        <h1>Form Builder</h1>
        <FormCreator></FormCreator>
        <FormList></FormList>
      </div>
    </div>
  );
};

export default Homepage;
