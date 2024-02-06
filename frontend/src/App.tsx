import { useEffect, useState } from "react";
import LogInModal from "./components/LogInModal";
import SignUpModal from "./components/SignUpModal";
import NavBar from "./components/navbar/NavBar";
import { User } from "./models/users";
import * as ToDoApi from "./network/toDo_api";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import ToDoPage from "./pages/ToDoPage";
import styles from "./styles/App.module.css";
import PrivacyPage from "./pages/PrivacyPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await ToDoApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <BrowserRouter>
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onLogInClicked={() => setShowLoginModal(true)}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      />
      <Container className={styles.pageContainer}>
        <Routes>
          <Route path='/'
          element={<ToDoPage loggedInUser={loggedInUser}/>}
          />
          <Route path='/privacy'
          element={<PrivacyPage />}
          />
          <Route path='/*'
          element={<NotFoundPage />}
          />
        </Routes>
      </Container>
      {showSignUpModal && (
          <SignUpModal onDismiss={() => setShowSignUpModal(false)} onSignUpSuccessful={(user) => {
              setLoggedInUser(user);
              setShowSignUpModal(false);
          }} />
        )}
        {showLoginModal && (
          <LogInModal onDismiss={() => setShowLoginModal(false)} onLoginSuccessful={(user) => {
            setLoggedInUser(user);
            setShowLoginModal(false);
          }} />
        )}
    </div>
    </BrowserRouter>
    
  );
}

export default App;
