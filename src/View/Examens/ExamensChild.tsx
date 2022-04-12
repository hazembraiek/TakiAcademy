import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CompsHeader from "../../Components/PageComponents/CompsHeader";
import Examen from "../../Components/PageComponents/Examen";
import ExamenDetail from "../../Components/PageComponents/ExamenDetail";
import { examensType } from "../../models/ComponentsTypes";
import { RootState } from "../../Store";
import Card from "../../UI/Card";

function ExamensChild() {
  const ArrayExame = useSelector<RootState, examensType[]>(
    (state) => state.Examens.Examens
  );
  const DetailIsOpen = useSelector<RootState, boolean>(
    (state) => state.Toggle.ExameDetails
  );
  const Exame = useSelector<RootState, examensType>(
    (state) => state.Toggle.exame
  );
  const idBorder = DetailIsOpen ? "border" : "";
  return (
    <Card className="examens">
      <CompsHeader
        text={DetailIsOpen ? "Détails de l'examen" : "Examens"}
        isOpen={DetailIsOpen}
      />
      <div className="examens__Child" id={idBorder}>
        {DetailIsOpen ? (
          <ExamenDetail
            title={Exame.title}
            subject={Exame.subject}
            prof={Exame.prof}
            date={Exame.date}
          />
        ) : (
          ArrayExame.map((exam) => {
            return (
              <Examen
                key={exam.id}
                title={exam.title}
                subject={exam.subject}
                prof={exam.prof}
                date={exam.date}
              />
            );
          })
        )}
      </div>
    </Card>
  );
}

export default ExamensChild;
