import React from "react";
import { useSelector } from "react-redux";
import CompsHeader from "../../Components/PageComponents/CompsHeader";
import Table from "../../Components/PageComponents/Table";
import Pagination from "../../Components/pagination/Pagination";
import { sessionsType } from "../../models/ComponentsTypes";
import { RootState } from "../../Store";
import Card from "../../UI/Card";
import { AllSesionsColLive } from "../../Utils/ColumnsTable";

function LiveSessions() {
  let ArraySessions: sessionsType[] = useSelector<RootState, sessionsType[]>(
    (state) => state.Sessions.Sessions
  );
  return (
    <Card className="live">
      <CompsHeader text="Séances en direct" />
      <Table columns={AllSesionsColLive} ArrayData={ArraySessions} />
      <Pagination PagginationMax={ArraySessions.length} />
    </Card>
  );
}

export default LiveSessions;
