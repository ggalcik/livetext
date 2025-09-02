import { useLiveData } from "../../context/LiveData";


export function GlobalOpts() {
    const { state, dispatch } = useLiveData();

    return (
        <div className="flex items-center gap-4">
            master viewport:

            <div className="grid gap-2">

                <input
                    type="number"
                    className="border border-gray-400 px-2 w-8"
                    value={state.masterViewport?.paddingTop ?? ""}
                    onChange={(e) =>
                        dispatch({
                            type: "masterViewport/paddingTop",
                            payload: { padding: e.target.value },
                        })
                    }
                /> %


            </div>
        </div>
    );
};
