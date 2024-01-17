import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Homepage from "./components/Homepage/Homepage";
import AdaugaNote from "./components/AdaugaNote/AdaugaNote";
import LivrabilePartiale from "./components/Livrabile/LivrabilePartiale";
import Students from "./components/Students/Students";
import AllGrades from "./components/AllGrades/AllGrades";
import MyProjects from "./components/MyProjects/MyProjects";
import AddProject from "./components/MyProjects/AddProject";
import EditProject from "./components/MyProjects/EditProject";
import EditLivrabil from "./components/Livrabile/EditLivrabil";
import AddLivrabil from "./components/Livrabile/AddLivrabil";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar></NavigationBar>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/homepage" element={<Homepage></Homepage>}></Route>
        <Route path="/AdaugaNote" element={<AdaugaNote></AdaugaNote>}></Route>
        <Route path="/students" element={<Students></Students>}></Route>
        <Route
          path="/allGrades/:proiectId"
          element={<AllGrades></AllGrades>}
        ></Route>
        <Route path="/myProjects" element={<MyProjects></MyProjects>}></Route>
        <Route path="/addProject" element={<AddProject></AddProject>}></Route>
        <Route
          path="/editProject/:proiectId"
          element={<EditProject></EditProject>}
        ></Route>
        <Route
          path="/livrabilePartiale/:proiectId"
          element={<LivrabilePartiale></LivrabilePartiale>}
        ></Route>
        <Route
          path="/addLivrabil/:proiectId"
          element={<AddLivrabil></AddLivrabil>}
        ></Route>
        <Route
          path="/editLivrabil/:livrabilId/:proiectId"
          element={<EditLivrabil></EditLivrabil>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
