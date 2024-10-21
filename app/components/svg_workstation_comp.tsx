import { ClientOnly } from "remix-utils/client-only"
import { SVG_Editor_Viewer } from "./svg/.client/svg_editor_comp.client"
import SVG_Render_Viewer from "./svg/svg_viewer_comp"
import { useContext, useEffect } from "react"
import { useSVGDataStore } from "~/zustand/svg_data_store"
import { StreamingUITool } from "~/websocket/streaming_ui_tool"
import { useSocketInputStore } from "~/zustand/socket.store"
import { useParams } from "@remix-run/react"
import { parse_svg } from "~/utility/svg_tool/svg_parser"

export const SVG_WorkStation_Comp = function() {
  const socket = useSocketInputStore(x=>x.socket);
  const set_svg_data = useSVGDataStore(s=>s.set_svg_code);
  const params = useParams();
  let session_id = params['id'];

  const on_socket_callback = function(p_session_id: string, socket_data: string, p_complete: boolean) {
    if (session_id != p_session_id) return;
    const [start_index, end_index] = parse_svg(socket_data);

    if (start_index < 0) return

    let result = socket_data.substring(start_index);

    if (end_index >= start_index) result = socket_data.substring(start_index, end_index);

    set_svg_data(result);
  }

  useEffect(() => {
      set_svg_data('');

      // Socket
      if (socket != null) {
          let streaming_tools = new StreamingUITool(socket);
          streaming_tools.callback = on_socket_callback;          
      }
  }, []);  

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