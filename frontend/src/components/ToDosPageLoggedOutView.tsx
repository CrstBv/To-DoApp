import { Container } from "react-bootstrap"
import styles from "../styles/utils.module.css"

const ToDosPageLoggedOutView = () => {
    return ( 
        <Container>
            <p className={styles.textJustify}>
            Manage your daily tasks efficiently with our intuitive and user-friendly application. 
            Create customized lists, organize your activities, and mark your completed tasks with a simple click. 
            With robust features and a clean design, the To Do App helps you stay in control of your responsibilities and maintain a productive lifestyle. 
            Start planning your day with us today!
            </p>
        </Container>
     );
}
 
export default ToDosPageLoggedOutView;