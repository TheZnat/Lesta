import { useDispatch } from "react-redux";
import "./App.css";
import HomePage from "../Pages/HomePage/HomePage";
import { AppDispatch } from "./Store/store";
import { useEffect } from "react";
import { fetchItems } from "./Store/slices/data/dataSlice";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);
  // можно добавить другие страници через react-router-dom или как минмум 404

  return (
    <>
      <HomePage />
    </>
  );
}

export default App;
