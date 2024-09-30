// libraries
import { FC, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// components
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";

// styles
import styles from "./forgot-password.module.css";

// urls 
import { 
  LOGIN_PAGE_ABSOLUTE_PATH,
  SET_NEW_PASSWORD_PAGE_ABSOLUTE_PATH
} from "../../utils/urls";

// actions
import { resetPassword } from "../../services/user/user-thunks";

// hooks
import useForm from "../../hooks/use-form";
import { useAppDispatch } from "../../services/store";



const ForgotPasswordPage: FC = () => {
  
  const [email, setEmail] = useState("");  
  const [isEmailValid, setIsEmailValid] = useState(false);
  const { onChange } = useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  function onSubmit(event: FormEvent) {
    event.preventDefault();
    dispatch(
      resetPassword({ email })
    ).then(
      () => {
        navigate(SET_NEW_PASSWORD_PAGE_ABSOLUTE_PATH);
      }
    );
  };
  
  return (
    <>
      <h1 className={styles.heading}>
        Password recovery
      </h1>            
      <form className={styles.form} onSubmit={onSubmit}>   
        <EmailInput
          name="email"
          value={email}
          onChange={onChange(setEmail, setIsEmailValid)}
          placeholder="Provide your email"
        />        
        <Button 
          size="medium" 
          type="primary" 
          htmlType="submit" 
          disabled={!isEmailValid}
          children="Restore password"
        />           
      </form>
      <div className={styles.tips}>
        <p className={styles.tip}>
          Recalled your password?&nbsp;
          <Link 
            to={LOGIN_PAGE_ABSOLUTE_PATH} 
            className={styles.link}
            children="Sign In"
          />
        </p>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
