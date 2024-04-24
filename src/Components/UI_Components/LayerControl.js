import { ToggleGoogleSource } from "Components/Functions/ToggleSource";
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
                <div className="card-body card-compact p-6 w-full">
					<div className="text-center">Layers</div>
                    <div className="card-actions justify-center mt-4 grid grid-col-2 grid-row-3">
                        <button
							className="p-2 border-2 col-start-1 col-end-1 row-start-1 row-end-1"
                            onClick={() => {
                            ToggleGoogleSource('surfaces', props.mapRef, slope, activeLayer);
                            setActiveLayer(prevState => prevState === "surfaces" ? "none" : "surfaces");
                            }}>
                            Surfaces
                        </button>
                        <button
							className="p-2 border-2 col-start-2 col-end-2 row-start-1 row-end-1"
                            onClick={() => {
                            ToggleGoogleSource('incline', props.mapRef, slope, activeLayer);
                            setActiveLayer(prevState => prevState === "incline" ? "none" : "incline");
                            }}>
                            Incline
                        </button>
						<label 
							htmlFor="InclineSlider" 
							className="Slider-Text col-start-1 col-span-2 row-start-3 row-end-3"
						>
							{`Incline Limit: ${slope}`}
						</label>
						<input
							id="InclineSlider"
							className="Slider col-start-1 col-span-2 row-start-2 row-end-2"
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
                    </div>
                </div>
            </div>
        </>
    );
}

export default LayerControl;