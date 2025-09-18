
import { useParams } from "react-router-dom";
import { MasterViewport } from "./MasterViewport";

export default function Popup() {
  const { name } = useParams<{ name?: string }>();
  const viewportName = name ?? "sample"

  return (
    <div className="absolute w-full h-full bg-gray-300 p-4 space-y-4">

      <MasterViewport name={viewportName}>
        <div className="w-full h-full bg-white">nothing in viewport</div>
      </MasterViewport>
    </div>
  );
}
