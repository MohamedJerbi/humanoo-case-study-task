import WrapperContainer from "./components/Wrappers/WrapperContainer";
import ActivityList from "./pages/ActivityList/ActivityList";
import ActivityForm from "./components/ActivityForm/ActivityForm";
import UpdateActivity from "./pages/UpdateActivity/UpdateActivity";
import { Route, Routes } from "react-router";
import { Navigation } from "./components/Navigation/Navigation";

function App() {
  return (
    <WrapperContainer>
      <Navigation />
      <Routes>
        <Route path="/" element={<ActivityList />} />
        <Route path="/create" element={<ActivityForm mode="create" />} />
        <Route path="/update/:id" element={<UpdateActivity />} />
      </Routes>
    </WrapperContainer>
  );
}

export default App;
