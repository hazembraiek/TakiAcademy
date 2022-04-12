import { Form, Formik } from "formik";
import React from "react";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import HeaderModal from "../PageComponents/HeaderModal";
import * as Yup from "yup";

function AddPoints() {
  const validate = Yup.object().shape({
    Id: Yup.string().max(6, "Must be 6 characters").required("Required"),
    Price: Yup.number().required("Required"),
    Desc: Yup.string().required("Required"),
  });
  return (
    <div className="Points moneyForm">
      <HeaderModal title="Ajouter des points" />
      <div className="form">
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
                <Input name="Id" type="text" placeholder="Entrer votre code" />
                <Input
                  name="Price"
                  type="number"
                  placeholder="Montant en dinar"
                />
                <Input name="Desc" type="text" placeholder="Description" />
                <Button type="submit">Ajouter des points</Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default AddPoints;
