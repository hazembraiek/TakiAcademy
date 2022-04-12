import setting from "./../Assets/Icons/list-ul-solid.svg";
import Check from "./../Assets/Icons/check-solid.svg";

import { useSelector } from "react-redux";
import { RootState } from "../Store";

export const AllSesionsCol = [
  { heading: "Date", value: "date" },
  { heading: "Nom", value: "title" },
  { heading: "Durée", value: "time" },
];

export const AllSesionsColLive = [
  { heading: "Date", value: "date" },
  { heading: "Nom", value: "title" },
  { heading: "Durée", value: "time" },
  { heading: "Actions", value: setting },
];

export const ExamensCol = [
  { heading: "Date", value: "date" },
  { heading: "Nom", value: "title" },
  { heading: "Matiére", value: "subject" },
  { heading: "Note", value: "note" },
];

export const HistoryPointsCol = [
  { heading: "Code", value: "code" },
  { heading: "Mode de paiement", value: "mode" },
  { heading: "Montant en dinars", value: "Prix" },
  { heading: "Description", value: "Description" },
  { heading: "Date", value: "Date" },
  { heading: "Status", value: Check },
];

export const HistoryTransPointsCol = [
  { heading: "ID éxpéditeur", value: "idSender" },
  { heading: "ID destinataire", value: "idReceiving" },
  { heading: "Points", value: "Points" },
  { heading: "Envoyé le", value: "DateSend" },
  { heading: "Status", value: Check },
];
