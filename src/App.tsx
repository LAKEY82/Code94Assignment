import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Tasks from "./components/Tasks";
import Home from "./components/Home";


const App = () => {
  return (
    <div className="flex">
      <Navigation />
      <div className="flex-1 bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          {/* <Route path="/report" element={<Report />} />
          <Route path="/insights" element={<Insights />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
