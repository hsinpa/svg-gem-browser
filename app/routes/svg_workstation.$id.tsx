import { Floating_CInput_Comp } from "~/components/input/floating_cinput_comp";
import { SVG_WorkStation_Comp } from "~/components/svg_workstation_comp";


export default function Svg_WorkStation_Index() {
    return (
      <div className="h-screen">
        <SVG_WorkStation_Comp></SVG_WorkStation_Comp>
        <Floating_CInput_Comp></Floating_CInput_Comp>
      </div>
    );
}