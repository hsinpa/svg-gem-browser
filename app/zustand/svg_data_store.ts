import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const DEFAULT_SVG_CODE = `<svg width="600" height="600">
    <text x="50" y="50">Hello World!</text>
</svg>
`;

type SVGDataState = {
    svg_code: string,
    set_svg_code: (code: string) => void,
}

export const useSVGDataStore = create<SVGDataState>()(
    immer((set) => ({
        svg_code: DEFAULT_SVG_CODE,
        set_svg_code: (code: string) => set((state) => {
            state.svg_code = code;
        }),
    })),
)
