import React, { useEffect } from "react";
import './App.css';
import NavBar from './components/NavBar';
import AddUser from './components/AddUser';
import AllUsers from './components/AllUsers';
import EditUser from './components/EditUser';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers } from "./utils/reducer/app.reducer";

function App() {
  const { isLoading } = useSelector(state => state.app);
  const dispatch = useDispatch();
  
  useEffect(() => {
        dispatch(fetchAllUsers());
  }, []);
  
  return (
    <BrowserRouter>
      {
        isLoading ? <div className='loader'>
        <div>Loading...</div>
    </div> : null
    }
       <NavBar />
            <Routes>
                <Route path='/add' element={<AddUser />} />
                <Route path='/all' element={<AllUsers />} /> 
                <Route path='/edit/:id' element={<EditUser />} /> 
            </Routes>
    </BrowserRouter>
  );
}

export default App;
