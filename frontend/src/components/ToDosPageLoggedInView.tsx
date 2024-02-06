import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { ToDo as ToDoModel } from "../models/toDo";
import * as ToDoApi from "../network/toDo_api";
import styles from "../styles/ToDoPages.module.css";
import styleUtils from "../styles/utils.module.css";
import AddEditToDoDialog from "./AddEditToDoDialog";
import ToDo from "./ToDo";

const ToDosPageLoggedInView = () => {
  const [toDos, setToDos] = useState<ToDoModel[]>([]);
  const [toDosLoading, setToDosLoading] = useState(true);
  const [showToDoLoadingError, setShowToDoLoadingError] = useState(false);
  const [showAddToDoDialog, setShowAddToDoDialog] = useState(false);
  const [toDoToEdit, setToDoToEdit] = useState<ToDoModel | null>(null);

  useEffect(() => {
    async function loadToDos() {
      try {
        setShowToDoLoadingError(false);
        setToDosLoading(true);
        const toDos = await ToDoApi.fetchToDo();
        setToDos(toDos);
      } catch (error) {
        console.error(error);
        setShowToDoLoadingError(true);
      } finally {
        setToDosLoading(false);
      }
    }
    loadToDos();
  }, []);

  async function deleteToDo(toDo: ToDoModel) {
    try {
      await ToDoApi.deleteToDo(toDo._id);
      setToDos(toDos.filter((existingToDo) => existingToDo._id !== toDo._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }


  const toDosGrid = (
    <Row xs={1} md={2} xl={4} className={`g-4 ${styles.toDosGrid}`}>
      {toDos.map((toDo) => (
        <Col key={toDo._id}>
          <ToDo
            toDo={toDo}
            className={`${styles.toDo}`}
            onToDoCLicked={setToDoToEdit}
            onDeleteToDoClick={deleteToDo}
          />
        </Col>
      ))}
    </Row>
  );

  return (
    <>
      <Button
        className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
        onClick={() => setShowAddToDoDialog(true)}
      >
        <FaPlus />
        Add new To Do
      </Button>
      {toDosLoading && <Spinner animation="border" variant="primary" />}
      {showToDoLoadingError && <p>Something went wrong</p>}
      {!toDosLoading && !showToDoLoadingError && (
        <>
          {toDos.length > 0 ? toDosGrid : <p>You don't have any notes yet</p>}
        </>
      )}
      {showAddToDoDialog && (
        <AddEditToDoDialog
          onDismiss={() => setShowAddToDoDialog(false)}
          onToDoSaved={(newToDo) => {
            setToDos([...toDos, newToDo]);
            setShowAddToDoDialog(false);
          }}
        />
      )}
      {toDoToEdit && (
        <AddEditToDoDialog
          toDoToEdit={toDoToEdit}
          onDismiss={() => setToDoToEdit(null)}
          onToDoSaved={(updatedToDo) => {
            setToDos(
              toDos.map((existingToDo) =>
                existingToDo._id === updatedToDo._id
                  ? updatedToDo
                  : existingToDo
              )
            );
            setToDoToEdit(null);
          }}
        />
      )}
    </>
  );
};

export default ToDosPageLoggedInView;
