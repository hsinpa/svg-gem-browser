import { Canvg } from "canvg";
import { useCallback, useEffect, useState } from "react"
import { useSVGDataStore } from "~/zustand/svg_data_store";

export default function SVG_Render_Viewer() {
    const svg_store = useSVGDataStore();
    const [div_dom, set_div_dom] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        const img_div: HTMLDivElement = document.querySelector('.svg_field') as HTMLDivElement;
        set_div_dom(img_div);
    }, []);

    useEffect(() => {
        if (div_dom != null)
            div_dom.innerHTML = svg_store.svg_code;
    }, [svg_store.svg_code, div_dom])

    return (
        <div>
            {/* <canvas id='svg_canvas'>
            </canvas> */}

            <div className="svg_field"></div>
        </div>

    )
} 