import { Card, ListGroup } from "react-bootstrap";
import { ToDo as ToDoModel } from "../models/toDo";
import styles from "../styles/ToDo.module.css";
import { formatDate } from "../util/formatDate";
import {MdDelete} from "react-icons/md";
import styleUtils from "../styles/utils.module.css";

interface ToDoProps {
  toDo: ToDoModel,
  onToDoCLicked: (toDo: ToDoModel) => void,
  onDeleteToDoClick: (toDo: ToDoModel) => void,
  className?: string,
}

const ToDo = ({ toDo, onToDoCLicked, onDeleteToDoClick, className }: ToDoProps) => {
  const { title, text, note, completed, createdAt, updatedAt } = toDo;

  let createupdatedText: String;
  if(updatedAt > createdAt) {
    createupdatedText = "Updated: " + formatDate(updatedAt);
  } else {
    createupdatedText = "Created: " + formatDate(createdAt);
  }

  let completedTodo: String;
  if(!completed) {
    completedTodo = "Pending" 
  } else {
    completedTodo = "Completed"
  }

  return (
    <Card className={`${styles.toDoCard} ${className}`} onClick={() => onToDoCLicked(toDo)}>
      <Card.Body className={styles.toDoBody}>
        <Card.Title className={styleUtils.flexCenter}>{title}
        <MdDelete 
        className="text-muted ms-auto"
        onClick={(e) => {
          onDeleteToDoClick(toDo);
          e.stopPropagation();
        }}/>
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
        <ListGroup className={`${styleUtils.flexCenter} ${styles.cardNote}`}>
          <ListGroup.Item variant="primary">{note}</ListGroup.Item>
          <ListGroup.Item variant="info">To Do status: {completedTodo}</ListGroup.Item>
        </ListGroup>
      </Card.Body>
      <Card.Footer className="text-muted">
        {createupdatedText}
      </Card.Footer>
    </Card>
  );
};

export default ToDo;
