import { ClientOnly } from "remix-utils/client-only"
import { SVG_Editor_Viewer } from "./svg/.client/svg_editor_comp.client"
import SVG_Render_Viewer from "./svg/svg_viewer_comp"

export const SVG_WorkStation_Comp = function() {

    return (
    <div className="h-full flex flex-col">

        <h1>SVG Side bar</h1>

        <div className="flex flex-row grow h-full">
          <div className="relative w-6/12 min-w-72">
            <ClientOnly fallback={<p>Loading...</p>}>
              {() => <SVG_Editor_Viewer></SVG_Editor_Viewer> }
            </ClientOnly>
          </div>

          <div className="w-6/12"> 
            <SVG_Render_Viewer></SVG_Render_Viewer>
          </div>
        </div>
      </div>
    )
}