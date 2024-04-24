import { ToggleGoogleSource, surfaceColor } from "Components/Functions/ToggleSource";
import { useState, useEffect } from "react";

const LayerControl = (props) => {

    useEffect(() => {
        if (props.mapRef === null) return;
        ToggleGoogleSource('initialize', props.mapRef, slope, activeLayer);
    }, [props.mapRef]);

    const DEFAULT_SLOPE = 2.0;
    const SLOPE_STEP = 0.5;
    const SLOPE_MIN = 0.0;
    const SLOPE_MAX = 6.0;

    const [activeLayer, setActiveLayer] = useState("none");
    const [slope, setSlope] = useState(DEFAULT_SLOPE);

    return(
        <>
            <div className="absolute top-20 right-4 card font-mono bg-slate-500 max-w-md z-10">
                <div className="card-body card-compact px-6 pb-6 pt-2 w-full">
                    <div className="card-actions justify-center mt-4 grid grid-cols-2">
                        <button
							className={"p-2 border-2 col-start-1 col-end-1 row-start-1 row-end-1"
                                        + (activeLayer === "surfaces" ? " border-teal-400 text-teal-400" : "")}
                            onClick={() => {
                            ToggleGoogleSource('surfaces', props.mapRef, slope, activeLayer);
                            setActiveLayer(prevState => prevState === "surfaces" ? "none" : "surfaces");
                            }}>
                            Surface Map
                        </button>
                        <button
							className={"p-2 border-2 col-start-2 col-end-2 row-start-1 row-end-1"
                                        + (activeLayer === "incline" ? " border-teal-400 text-teal-400" : "")}
                            onClick={() => {
                            ToggleGoogleSource('incline', props.mapRef, slope, activeLayer);
                            setActiveLayer(prevState => prevState === "incline" ? "none" : "incline");
                            }}>
                            Incline Map
                        </button>
						<label 
							htmlFor="InclineSlider" 
							className={"Slider-Text justify-center col-start-1 col-span-2 row-start-3 row-end-3"
                                        + (activeLayer === "incline" ? "" : " hidden")}
						>
							{`Incline Limit: ${slope}`}
						</label>
						<input
							id="InclineSlider"
							className={"Slider col-start-1 col-span-2 row-start-2 row-end-2"
                                        + (activeLayer === "incline" ? "" : " hidden")}
							type="range"
							min={SLOPE_MIN}
							max={SLOPE_MAX}
							value={slope}
							step={SLOPE_STEP}
							onChange={(e) => {
								setSlope(e.target.value);
								ToggleGoogleSource('slopeChange', props.mapRef, slope, activeLayer);
							}}
						/>

                        <ul
                            id="surface-legends"
                            className={`col-start-1 col-span-2 row-start-2 row-end-3
                             grid grid-rows${Object.keys(surfaceColor).length}`
                            + (activeLayer === "surfaces" ? "" : " hidden")}
                        >
                            {
                                Object.entries(surfaceColor).map(([key, value], index) => {
                                    return (
                                        <li key={index} 
                                            className={`row-start-${index + 1} row-span-1`}
                                            // style={{
                                            //     color: value,
                                            // }}
                                        >
                                            <div className="grid grid-cols-4">
                                                <div 
                                                    className="col-start-1 col-span-1 my-0.5 w-10 "
                                                    style={{
                                                        backgroundColor: value,
                                                    }}
                                                >

                                                </div>
                                                <div className="col-start-2 col-span-3 text-left">
                                                    {key}
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LayerControl;