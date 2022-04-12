import { Form, Formik } from "formik";
import React from "react";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import HeaderModal from "../PageComponents/HeaderModal";
import * as Yup from "yup";

function TransPointsForm() {
  const validate = Yup.object().shape({
    Id: Yup.string().max(6, "Must be 6 characters").required("Required"),
    Price: Yup.number().required("Required"),
  });
  return (
    <div className="trans moneyForm">
      <HeaderModal title="Tranférer des points" />
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
                <Input
                  name="Id"
                  type="text"
                  placeholder="identifiant du bénéficiaire"
                />
                <Input name="Price" type="number" placeholder="montant" />
                <Button type="submit">Tranférer des points</Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default TransPointsForm;
