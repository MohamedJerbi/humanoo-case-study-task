import WrapperContainer from "./components/Wrappers/WrapperContainer";
import { ActivityList } from "./pages/ActivityList/ActivityList";
import { Route, Routes } from "react-router";
import CreateActivity from "./pages/CreateActivity/CreateActivity";
import UpdateActivity from "./pages/UpdateActivity/UpdateActivity";
import { Navigation } from "./components/Navigation/Navigation";

function App() {
  return (
    <WrapperContainer>
      <Navigation />
      <Routes>
        <Route path="/" element={<ActivityList />} />
        <Route path="/create" element={<CreateActivity />} />
        <Route path="/update/:id" element={<UpdateActivity />} />
      </Routes>
    </WrapperContainer>
  );
}

export default App;
