import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToDo } from "../models/toDo";
import * as ToDosApi from "../network/toDo_api";
import { ToDoInput } from "../network/toDo_api";
import TextInputField from "./form/TextInputField";

interface AddEditToDoDialogProps {
  toDoToEdit?: ToDo;
  onDismiss: () => void;
  onToDoSaved: (toDo: ToDo) => void;
}

const AddEditToDoDialog = ({
  toDoToEdit,
  onDismiss,
  onToDoSaved,
}: AddEditToDoDialogProps) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ToDoInput>({
    defaultValues: {
      title: toDoToEdit?.title || "",
      text: toDoToEdit?.text || "",
      note: toDoToEdit?.note || "",
      completed: toDoToEdit?.completed || false,
    },
  });

  async function onSubmit(input: ToDoInput) {
    try {
      let toDoResponse: ToDo;
      if (toDoToEdit) {
        toDoResponse = await ToDosApi.updateToDo(toDoToEdit._id, input);
      } else {
        toDoResponse = await ToDosApi.createToDo(input);
      }
      onToDoSaved(toDoResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{toDoToEdit ? "Edit ToDo" : "Add ToDo"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addEditToDoForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="title"
            label="Title"
            type="text"
            placeholder="Title"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.title}
          />

          <TextInputField
            name="text"
            label="Text"
            as="textarea"
            rows={5}
            placeholder="Text"
            register={register}
          />

          <TextInputField
            name="note"
            label="Note"
            as="textarea"
            rows={3}
            placeholder="Note"
            register={register}
          />
        </Form>

        <Form.Check
        type="switch"
        label="Mark as completed"
        {...register("completed")}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit" form="addEditToDoForm" disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditToDoDialog;
