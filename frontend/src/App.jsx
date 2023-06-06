import "./App.css";
import Header from "./components/header/Header";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Stackoverflow from "./components/Stackoverflow";
import Question from "./components/Add-Question/Question";
import ViewQuestion from "../src/components/ViewQuestion";
import Auth from "./components/Auth/Index";
import { useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { useDispatch } from "react-redux";

import { useEffect } from "react";
import { auth } from "./firebase";
import QuestionEdit from "./components/Add-Question/QuestionEdit";
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const PrivateRoute = () => {
    return user ? <Outlet /> : <Navigate to="/auth" />;
  };

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            displayName: authUser.displayName,
            email: authUser.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path={user ? "/" : "/"}
            element={user ? <Stackoverflow /> : <Auth />}
          />
          <Route path="/auth" element={<Auth />} />
          <Route element={<PrivateRoute />}>
            <Route path="/add-question" element={<Question />} />
            <Route path="/update-question" element={<QuestionEdit />} />
            <Route path="/" element={<Stackoverflow />} />
            <Route path="/view-question" element={<ViewQuestion />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
