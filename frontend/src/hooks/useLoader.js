import React from "react";
import { SET_LOADING } from "../actions/Health";
import { useHealth } from "../context/health";

function useLoader() {
  const { dispatch, loading } = useHealth();
  const setLoader = (bool) => dispatch({ type: SET_LOADING, data: bool });
  return [loading, setLoader];
}

export default useLoader;
