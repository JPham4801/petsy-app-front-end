import { useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from '../src/services/authService'; // import the authservice
import './App.css';
import Marketplace from './components/Marketplace/Marketplace';
export const AuthedUserContext = createContext(null);
import ListingForm from './components/ListingForm/ListingForm';

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? <Route path="/" element={<Dashboard user={user} />} /> : <Route path="/" element={<Landing />} />}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
          <Route path ='/new' element={<ListingForm />} />
          <Route path ='/update/:listingId' element={<ListingForm /> } />
          <Route path ='/Marketplace' element={<Marketplace/>}/>
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
