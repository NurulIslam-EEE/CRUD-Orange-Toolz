
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home/Home';

import AuthProvider from './context/AuthProvider';
import Login from './pages/Login/Login/Login';
import Resister from './pages/Login/Resister/Resister';

import MakeAdmin from './pages/AdminPanel/MakeAdmin/MakeAdmin';
import Header from "./pages/Shared/Header/Header";
import Footer from "./pages/Shared/Footer/Footer";
import PrivateRoute from './pages/Login/PrivateRoute/PrivateRoute';
import Profile from './pages/Profile/Profile';

import List from './pages/AdminPanel/List/List';

import AdminHome from './pages/AdminPanel/AdminHome/AdminHome'

import { useEffect, useState } from 'react';
import Loaders from './pages/Shared/Loaders/Loaders';
import Credits from './pages/AdminPanel/Credits/Credits';
import NotFound from './pages/NotFound/NotFound';
import AdminRoute from './pages/Login/AdminRoute/AdminRoute';
import File from './pages/AdminPanel/MakeAdmin/File';
import FileGroup from './pages/AdminPanel/MakeAdmin/FileGroup';

function App() {
  const [isPreLoader, setIsPreLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsPreLoader(false);
    }, 1000);
  });
  return (
    isPreLoader === true ? <Loaders />
      :
      <div className="App">
        <AuthProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />}>

              </Route>
              <Route path="/home" element={<Home />} />
              <Route path="resister" element={<Resister />}></Route>
              <Route path="login" element={<Login />}></Route>

              <Route path="adminPanel" element={
                <PrivateRoute> <AdminHome /></PrivateRoute>
              } >
                <Route path="makeAdmin" element={<MakeAdmin />} />
                <Route path="addFile" element={<File />} />
                <Route path="data" element={<FileGroup />} />

                <Route path="register" element={<Resister />} />

              </Route>



              <Route path="profile" element={
                <PrivateRoute><Profile /></PrivateRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </AuthProvider>
      </div >
  );
}

export default App;