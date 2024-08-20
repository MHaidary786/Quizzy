import "./App.css";
import Home from "./components/Home";
import LoginForm from "./components/login";
import Singup from "./components/signup";
import VerifyOTP from "./components/otpVerify"
import Questions from "./components/create"
import Quizzes from "./components/quizzes";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Switch,
} from "react-router-dom";
import Join from "./components/join";
import JoinQuizPage from "./components/JoinQuizPage";
import Templates from "./components/templates";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Singup/>} />
        <Route path="/verifyotp" element={<VerifyOTP/>} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/create" element={<Questions/>} />
        <Route path="/quizzes" element={<Quizzes/>} />
        <Route path="/quiz/:id" element={<Quizzes/>} />
        <Route path="/join" element={<Join/>} />
        <Route path="/templates" element={<Templates/>} />
        <Route path="/join-quiz/:quizId" element={<JoinQuizPage />} />
        {/* <Route path="/other" element={<OtherComponent />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
