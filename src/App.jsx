import { useEffect, useState } from "react";
import { useDispatch } from "@reduxjs/toolkit";
import { AuthService } from "./appwrite/auth.service.js";
import {login, logout} from "./appwrite/store/authSlice.js"

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
  }, [])

 if(loading) {
  return (
    <>
      <h1>Hello there...</h1>
    </>
  )
 }
}

export default App
