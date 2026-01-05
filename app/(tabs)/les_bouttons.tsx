
import { useContext } from "react";
import LesBouttons from "../../components/les_bouttons";
import { CirclesContext } from "./_layout";

export default function LesBouttonsScreen() {
  const { circles } = useContext(CirclesContext);
  return <LesBouttons circles={circles} />;
}