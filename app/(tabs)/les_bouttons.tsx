

import { useContext, useState } from "react";
import LesBouttons from "../../components/les_bouttons";
import { CirclesContext } from "./_layout";

export default function LesBouttonsScreen() {
  const { circles } = useContext(CirclesContext);
  const [text, setText] = useState("");
  return <LesBouttons circles={circles} text={text} setText={setText} />;
}