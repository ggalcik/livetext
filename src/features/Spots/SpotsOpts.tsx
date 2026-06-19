import clsx from "clsx";
import { dateStr } from "../../components/util";

export default function SpotsOpts() {
  return (
    <div>
      <div className="flex gap-4">
        <div className={clsx("gap-2 inline-flex", {})}>
          <div>[[d]]</div>
          <div>{dateStr()}</div>
        </div>
      </div>
    </div>
  );
}
