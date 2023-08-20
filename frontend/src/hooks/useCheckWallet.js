import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AxiosInstance } from "../AxiosInstance";

function useCheckWallet() {
  const [currentAccount, setCurrentAccount] = useState(null);

  const checkUserIsLoggedIn = async () => {
    const userString = localStorage.getItem("user")
    const userObj = JSON.parse(userString ?? {})
    const { isAuth = false, role = -1, _id, name } = userObj ?? {}
    setCurrentAccount(userString ? { ...userObj } : null)
  };

  const loginHandler = async ({ phone, pin }) => {
    try {
      const { data } = await AxiosInstance.post("user/login", {
        phone, pin
      })
      const { isAuth = false, ref_user, type, _id, name, ...user } = data?.message || { isAuth: false, user: {} }
      const { role } = ref_user ?? {}
      if (isAuth) {
        toast(`Login Success`)
        setCurrentAccount({ ...user })
        localStorage.setItem("user", JSON.stringify({ isAuth, role, type, _id, name }))
      }
      else {
        setCurrentAccount(null)
        throw new Error("Invalid User Credentials")
      }
    }
    catch (e) {
      toast(`User Invalid`)
      setCurrentAccount(false)
    }
  }

  useEffect(() => {
    checkUserIsLoggedIn();
  }, []);

  return [currentAccount, loginHandler];
}

export default useCheckWallet;
