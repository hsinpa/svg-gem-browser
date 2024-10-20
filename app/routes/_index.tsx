import type { MetaFunction } from "@remix-run/node";
import { SVG_Editor_Viewer } from "~/components/svg/.client/svg_editor_comp.client";
import { ClientOnly } from "remix-utils/client-only";
import SVG_Render_Viewer from "~/components/svg/svg_viewer_comp";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  
  return (
    <div>
      <h1>SVG Viewer</h1>

      <div className="flex flex-row content-center	justify-center	">

        <div className="chatbot_container w-96">
          Chatbot
        </div>

        <div className="basis-4/6">
          <SVG_Render_Viewer></SVG_Render_Viewer>
          <ClientOnly fallback={<p>Loading...</p>}>
            {() => <SVG_Editor_Viewer></SVG_Editor_Viewer> }
          </ClientOnly>
        </div>
      </div>

    </div>
  );
}
