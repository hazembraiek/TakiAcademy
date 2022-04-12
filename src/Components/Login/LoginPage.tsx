import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import Input from "../../UI/Input";
import logo from "./../../Assets/Images/logo.b742634d.svg";
import Eye from "./../../Assets/Icons/eye-solid.svg";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";
import { ParentType } from "../../models/ComponentsTypes";
import Popup from "../Popup/Popup";
import { PopupAction } from "../../Store/Slices/Popup";
import { DataAction } from "../../Store/Slices/Data";
import { ChildAction } from "../../Store/Slices/SelectedChild";
import generate_token from "../../Utils/GenerateToken";

function LoginPage() {
  const [show, setShow] = useState<boolean>(false);
  const [ShowIcon, setIcon] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const validate = Yup.object().shape({
    Email: Yup.string().email("Email is invalid").required("Email is required"),
    Password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
  });
  const ShowIconHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const Value = e.target.value.trim();
    if (Value === "") {
      setIcon(false);
    } else {
      setIcon(true);
    }
  };
  const Parents = useSelector<RootState, ParentType[]>(
    (state) => state.Data.Parents
  );
  const Login = ({ Email, Password }) => {
    const parent = Parents.find((parent) => parent.email === Email);

    if (!parent) {
      dispatch(
        PopupAction.setPopup({ msg: "Invalid credentials", status: false })
      );
      setIsOpen(true);
      return;
    }
    if (parent?.password !== Password) {
      dispatch(
        PopupAction.setPopup({ msg: "Invalid mot de passe", status: false })
      );
      setIsOpen(true);
      return;
    }
    dispatch(
      PopupAction.setPopup({ msg: "authentication success", status: true })
    );
    setIsOpen(true);
    dispatch(ChildAction.setChildSelected(parent.children[0]));
    setTimeout(() => {
      dispatch(DataAction.setParents(parent.id));
      dispatch(DataAction.setDate(Date.now()));
      const FakeId1 = generate_token(10);
      const FakeId2 = generate_token(10);
      const Data: string = `${FakeId1}-${parent.id}-${
        parent.children[0]
      }-${Date.now()}-${FakeId2}`;
      localStorage.setItem("Token", Data);
    }, 1000);
  };
  useEffect(() => {
    const TimerPopup = setTimeout(() => {
      setIsOpen(false);
    }, 2000);
    return () => clearTimeout(TimerPopup);
  }, [isOpen]);
  return (
    <div className="designe">
      <Popup className={isOpen ? "active" : ""} />
      <Card className="login">
        <div className="logo">
          <img src={logo} alt="logo" className="resizeImg" />
        </div>
        <div className="form__title-desc">
          <p>Se connecter</p>
          <p>Utilisez votre e-mail pour connecter:</p>
        </div>
        <div className="form">
          <Formik
            initialValues={{
              Email: "",
              Password: "",
            }}
            validationSchema={validate}
            onSubmit={(values) => {
              return Login(values);
            }}
          >
            {(formik) => {
              return (
                <Form>
                  <Input
                    name="Email"
                    type="text"
                    placeholder="Enter Votre Email"
                  />
                  <div className="password">
                    <Input
                      name="Password"
                      type={show ? "text" : "password"}
                      placeholder="Mot de passe (minimum 6 caractères)"
                      onChange={ShowIconHandler}
                    />
                    {ShowIcon && (
                      <span onClick={() => setShow(!show)}>
                        <img src={Eye} alt="" className="mediumSizeImg" />
                      </span>
                    )}
                  </div>
                  <Button type="submit">Se Connecter</Button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </Card>
    </div>
  );
}

export default LoginPage;
