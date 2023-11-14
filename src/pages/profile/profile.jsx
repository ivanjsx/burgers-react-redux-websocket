// libraries
import { useState } from "react";
import { useSelector } from "react-redux";

// components
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

// styles
import styles from "./profile.module.css";

// actions 
import { updateUser } from "../../services/user/user-thunks";

// hooks
import useForm from "../../hooks/use-form";

// selectors
import { defaultUserSelector } from "../../services/selectors";



function ProfilePage() {
  
  const { currentUser } = useSelector(defaultUserSelector);
  
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState(currentUser.password);
  
  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  
  const { onChange } = useForm();
  
  function onSubmit(event) {
    event.preventDefault();
    updateUser({ name, email, password });
  };
  
  function onReset(event) {
    event.preventDefault();
    setName(currentUser.name);
    setEmail(currentUser.email);
    setPassword(currentUser.password);
  };
  
  return (
    <>
      <p className={styles.description}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
      <div className={styles.content}>
        <form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
          <Input
            type="text"
            placeholder="Имя"
            name="name"
            value={name}
            onChange={onChange(setName, setIsNameValid)}
            icon="EditIcon"
          />        
          <EmailInput
            name="email"
            value={email}
            onChange={onChange(setEmail, setIsEmailValid)}
            isIcon={true}
          />        
          <PasswordInput
            name="password"
            value={password}
            onChange={onChange(setPassword, setIsPasswordValid)}
            icon="EditIcon"
          />
          <Button
            size="medium" 
            type="primary" 
            htmlType="submit" 
            disabled={!isNameValid || !isEmailValid || !isPasswordValid}
            extraClass={styles.button}
            children="Сохранить"
          />           
          <Button
            size="medium" 
            type="secondary" 
            htmlType="reset" 
            extraClass={styles.button}
            children="Отменить"
          />                
        </form>      
      </div>
    </>
  );
};

export default ProfilePage;
