import { useEffect, useState } from "react";
import { useDispatch } from "@reduxjs/toolkit";
import { AuthService } from "./appwrite/auth.js";
import {login, logout} from "./store/authSlice.js"
import { Footer } from "./components/index.js";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    AuthService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }

    })
    .finally(() => setLoading(false))
  }, []);

return !loading ? (
  <div >
    <Header />
    <Footer />
  </div>
) : null;
  
}

export default App
