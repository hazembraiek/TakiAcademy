import React from "react";
import Button from "../../UI/Button";
import HeaderModal from "../PageComponents/HeaderModal";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ToggleAction } from "../../Store/Slices/TogglinData";
import Input from "../../UI/Input";
import * as Yup from "yup";
import { RootState } from "../../Store";
import { SectionType } from "../../models/ComponentsTypes";
import { ChildrenAction } from "../../Store/Slices/Children";
import { nanoid } from "nanoid";
import { DataAction } from "../../Store/Slices/Data";

const Buttons = () => {
  const dispatch = useDispatch();
  const HidePopup = () => {
    dispatch(ToggleAction.ToggleModal("child"));
  };
  return (
    <div className="AddChild__btns">
      <Button type="submit">Ajouter</Button>
      <Button onClick={HidePopup}>Fermer</Button>
    </div>
  );
};

const AddChild = () => {
  const Sections = useSelector<RootState, SectionType[]>(
    (state) => state.Data.sections
  );
  const validate = Yup.object().shape({
    Name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    LastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    Email: Yup.string().email("Email is invalid").required("Email is required"),
    Password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
    ConfirmPassword: Yup.string()
      .oneOf([Yup.ref("Password"), null], "Password must match")
      .required("Confirm password is required"),
    Phone: Yup.string()
      .max(8, "Phone Number must be 8 numbers")
      .required("Required"),
    Niveau: Yup.string().required("Required"),
  });
  const dispatch = useDispatch();
  const AddChild = ({ Name, LastName, Email, Phone, Password, Niveau }) => {
    const id = nanoid(10);
    dispatch(
      ChildrenAction.AddChild({
        id,
        identifier: nanoid(6),
        FirstName: Name,
        LastName,
        email: Email,
        Phone,
        password: Password,
        section: Niveau,
      })
    );
    dispatch(DataAction.AddChild({ id, section: Niveau }));
    dispatch(ToggleAction.ToggleModal(""));
  };
  return (
    <Formik
      initialValues={{
        Name: "",
        LastName: "",
        Email: "",
        Phone: "",
        Password: "",
        ConfirmPassword: "",
        Niveau: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        return AddChild(values);
      }}
    >
      {(formik) => {
        return (
          <Form>
            <div className="name-lastname">
              <Input label="Name" name="Name" type="text" placeholder="Nom" />
              <Input
                label="LastName"
                name="LastName"
                type="text"
                placeholder="Prénom"
              />
            </div>
            <Input
              label="Email"
              name="Email"
              type="email"
              placeholder="Email"
            />
            <Input
              label="Phone"
              name="Phone"
              type="text"
              placeholder="Téleohone"
            />
            <Input
              label="Password"
              name="Password"
              type="password"
              placeholder="Mot de passe"
            />
            <Input
              label="ConfirmPassword"
              name="ConfirmPassword"
              type="password"
              placeholder="Confirmation mot de passe"
            />
            <Input
              placeholder="Classes"
              name="Niveau"
              type="text"
              list="Niveau"
            />
            <datalist id="Niveau">
              {Sections.map((section) => (
                <option key={section.id} value={section.title} />
              ))}
            </datalist>
            <Buttons />
          </Form>
        );
      }}
    </Formik>
  );
};

const AddChildExist = () => {
  const validate = Yup.object().shape({
    Id: Yup.string().max(6, "Must be 6 characters").required("Required"),
  });
  return (
    <Formik
      initialValues={{
        Id: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(formik) => {
        return (
          <Form>
            <Input name="Id" type="text" placeholder="L'identifiant" />
            <Buttons />
          </Form>
        );
      }}
    </Formik>
  );
};

function AddChildForm() {
  const dispatch = useDispatch();
  const ChildExist = useSelector<RootState, boolean>(
    (state) => state.Toggle.ChildExist
  );
  const ChangeAnswer = () => {
    dispatch(ToggleAction.ToggleChildForm());
  };
  return (
    <div className="AddChild">
      <HeaderModal title="Ajouter un enfant" />
      <div className="AddChild__select">
        <p className="question">Votre files est-il inscrit sur le site ?</p>
        <div className="select">
          <span className={ChildExist ? "active" : ""} onClick={ChangeAnswer}>
            Oui
          </span>
          <span className={ChildExist ? "" : "active"} onClick={ChangeAnswer}>
            Non
          </span>
        </div>
      </div>
      <div className="form">
        {ChildExist ? <AddChildExist /> : <AddChild />}
      </div>
    </div>
  );
}

export default AddChildForm;
