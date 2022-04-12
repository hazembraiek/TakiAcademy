import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import Modal from "../Modal/Modal";
import AddChildForm from "../ToggleForms/AddChildForm";
import AddPoints from "../ToggleForms/AddPoints";
import CalendarModal from "../ToggleForms/CalendarModal";
import TransPointsForm from "../ToggleForms/TransPointsForm";

function FormData() {
  const TypeModal = useSelector<RootState, string>(
    (state) => state.Toggle.TypeModal
  );
  let content;
  if (TypeModal === "child") {
    content = <AddChildForm />;
  } else if (TypeModal === "trans") {
    content = <TransPointsForm />;
  } else if (TypeModal === "Add") {
    content = <AddPoints />;
  } else if (TypeModal === "Calendar") {
    content = <CalendarModal />;
  }
  return (
    <Modal>
      <div className="forms">{content}</div>
    </Modal>
  );
}
export default FormData;
