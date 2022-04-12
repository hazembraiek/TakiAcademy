import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Chat from "../../Components/Chat/Chat";
import SideBar from "../../Components/Layout/SideBar";
import { RootState } from "../../Store";
import { MessageAction } from "../../Store/Slices/Messages";
import DispatchData from "../../Utils/DispatchData";
import ChildGallery from "./ChildGallery";
import Menu from "./MenuChilds/Menu";

function Page() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const id = useSelector<RootState, string>((state) => state.Child.id);

  DispatchData(id, pathname);
  const ShowChat = useSelector<RootState, boolean>(
    (state) => state.Messages.ShowChat
  );

  return (
    <main>
      <Chat className={`${ShowChat ? "Show" : ""}`} />
      <div
        className={`page__message ${!ShowChat ? "" : "Hide"}`}
        onClick={() => dispatch(MessageAction.ToggleChat())}
      >
        <span></span>
      </div>
      <SideBar />
      <div className="page">
        {!pathname.startsWith("/porte-monnaie") && <Menu />}
        <ChildGallery IdChildSelect={id} />
      </div>
    </main>
  );
}

export default Page;
