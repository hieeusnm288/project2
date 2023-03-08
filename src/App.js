import "./App.css";
import Login from "./Component/Login/login";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import TrangChu from "./Component/TrangChu/TrangChu";
import HomePage from "./Component/HomePage/HomePage";
import LichCoQuan from "./Component/LichCoQuan/LichCoQuan";
import { publicRoutes } from "./router";
import { Fragment } from "react";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = TrangChu;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}

          {/* <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/company-work-schedule" element={<TrangChu />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
