import Details from "./pages/detailsPage";
import HomePage from "./pages/homePage";
import Login from "./pages/loginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import { UserContextProvider } from "./store/userTokenContext";
import RepoList from "./pages/repoPage";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="" exact element={<Login />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/home" exact element={<HomePage />} />
            <Route path="/repolist/" exact element={<RepoList/>} />
            <Route path="/details/:id" exact element={<Details />} />
          </Routes>
        </Router>
      </UserContextProvider>
    </div>
  );
}

export default App;
