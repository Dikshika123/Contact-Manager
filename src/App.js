import React from 'react'
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';

import NavBar from './Components/NavCompo/NavBar';
import ContactList from './Components/Contacts/ContactList/ContactList';
import Addcontact from './Components/Contacts/AddContact/Addcontact';
import ViewContact from './Components/Contacts/ViewContact/ViewContact';
import EditContact from './Components/Contacts/Editcontact/EditContact';
import Spinner2 from './Components/Spinner/Spinner2';

function App() {
  return (
    <div>
      <NavBar/>
      <React.Fragment>
      <Routes>
        <Route path='/' element={<Navigate to={'Contacts/list'}/>}/>
        <Route path='/Contacts/list'  element={<ContactList/>}/>
        <Route path='/Contacts/Edit/:contactid' element={<EditContact/>}/>
        <Route path='/Contacts/Add' element={<Addcontact/>}/>
        <Route path='/Contacts/View/:contactid' element={<ViewContact/>}/>
      </Routes>
      </React.Fragment>
  </div>   
  );
}

export default App;
