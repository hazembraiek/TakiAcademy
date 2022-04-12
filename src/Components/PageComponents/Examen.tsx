import { useDispatch } from "react-redux";
import { examensType } from "../../models/ComponentsTypes";
import { ToggleAction } from "../../Store/Slices/TogglinData";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import HeaderExame from "./HeaderExame";

function Examen({ subject, title, prof, date, onClick }: examensType) {
  const dispatch = useDispatch();
  const sendData = () => {
    dispatch(ToggleAction.ShowDetail({ subject, title, prof, date }));
  };
  return (
    <Card className="examen">
      <HeaderExame title={title} subject={subject} prof={prof} date={date} />
      <Button onClick={sendData}>Voir détails</Button>
    </Card>
  );
}

export default Examen;
