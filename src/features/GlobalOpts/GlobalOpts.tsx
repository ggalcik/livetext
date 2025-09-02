import { useLiveData } from "../../context/LiveData";


export function GlobalOpts() {
    const { state, dispatch } = useLiveData();

    return (
        <div className="flex items-center gap-2">
            master viewport padding:
            <input
                type="text"
                className="border border-gray-400 w-12 px-2 w-30"
                value={state.masterViewportCSS?.padding ?? ""}
                onChange={(e) =>
                    dispatch({
                        type: "masterViewportCSS/padding",
                        payload: { padding: e.target.value },
                    })
                }
            />
        </div>
    );
};
