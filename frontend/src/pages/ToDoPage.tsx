import { Container } from "react-bootstrap";
import ToDosPageLoggedInView from "../components/ToDosPageLoggedInView";
import ToDosPageLoggedOutView from "../components/ToDosPageLoggedOutView";
import styles from "../styles/ToDoPages.module.css";
import { User } from "../models/users";

interface ToDoPageProps {
    loggedInUser: User | null,
}

const ToDoPage = ({loggedInUser}: ToDoPageProps) => {
    return ( 
        <Container className={styles.toDoPage}>
        <>
          {loggedInUser ? (
            <ToDosPageLoggedInView />
          ) : (
            <ToDosPageLoggedOutView />
          )}
        </>
      </Container>
     );
}
 
export default ToDoPage;