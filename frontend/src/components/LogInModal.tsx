import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { User } from "../models/users";
import * as ToDosApi from "../network/toDo_api";
import { LoginCredentials } from "../network/toDo_api";
import styleUtils from "../styles/utils.module.css";
import TextInputField from "./form/TextInputField";
import { useState } from "react";
import { UnauthorizedError } from "../errors/http_errors";

interface LogInModalProps {
  onDismiss: () => void;
  onLoginSuccessful: (user: User) => void;
}

const LogInModal = ({ onDismiss, onLoginSuccessful }: LogInModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  async function onSubmit(credentials: LoginCredentials) {
    try {
      const user = await ToDosApi.login(credentials);
      onLoginSuccessful(user);
    } catch (error) {
      if(error instanceof UnauthorizedError) {
        setErrorText(error.message);
      } else{
        alert(error);
      }
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {errorText &&
        <Alert variant="dander">
          {errorText}
        </Alert>
        }
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />
          <TextInputField
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className={styleUtils.width100}
          >
            Log In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LogInModal;
