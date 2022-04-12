import { ErrorMessage, useField } from "formik";
import { InputType } from "../models/ComponentsTypes";

function Input({ label, ...props }: InputType) {
  const [field, meta] = useField(props);
  return (
    <div className="divInput">
      <input
        autoComplete="off"
        {...props}
        {...field}
        className={`${meta.touched && meta.error && "is-invalid"}`}
        placeholder={props.placeholder}
        list={props.list}
        // onChange={props.onChange}
      />
      <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  );
}

export default Input;
