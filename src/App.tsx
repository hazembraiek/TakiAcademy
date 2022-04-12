import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Components/Layout/Header";
import LoginPage from "./Components/Login/LoginPage";
import FormData from "./Components/PageComponents/FormData";
import { RootState } from "./Store";
import Logout from "./Utils/LogoutUser";
import Page from "./View/Page/Page";

function App() {
  const ShowForm = useSelector<RootState, boolean>(
    (state) => state.Toggle.ToggleModal
  );
  const navigate = useNavigate();
  const idParent = useSelector<RootState, string>(
    (state) => state.Data.ParentId
  );
  const DateLogin = useSelector<RootState, string>(
    (state) => state.Data.DateLogin
  );

  useEffect(() => {
    let Timer;
    if (!idParent) {
      navigate("/login");
    } else {
      const TimeWait = Date.now() - +DateLogin;
      const TimeToLogout = 3 * 60 * 60 * 1000 - TimeWait;
      Timer = setTimeout(() => {
        Logout();
      }, TimeToLogout);
    }
    return () => clearTimeout(Timer);
  }, [navigate, idParent, DateLogin]);
  return (
    <div className="App">
      {ShowForm && <FormData />}
      {!idParent && (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      )}
      {idParent && (
        <>
          <Header />
          <Page />
        </>
      )}
    </div>
  );
}

export default App;
