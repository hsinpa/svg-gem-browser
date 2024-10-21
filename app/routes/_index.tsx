import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { SVG_Editor_Viewer } from "~/components/svg/.client/svg_editor_comp.client";
import { ClientOnly } from "remix-utils/client-only";
import SVG_Render_Viewer from "~/components/svg/svg_viewer_comp";
import { redirect, useFetcher } from "@remix-run/react";
import { v4 as uuidv4 } from 'uuid';
import { remix_uni_fetch } from "~/utility/utility_method";
import { Chat_Input_Comp } from "~/components/input/chat_Input_comp";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const action = async ({request}: ActionFunctionArgs) => {
  return redirect('/svg_workstation/'+uuidv4());
}

export default function Index() {
  const fetcher = useFetcher({ key: "home_page_fetcher" });

  let on_input_submit = function() {
    remix_uni_fetch({
      fetcher: fetcher, data: null
    });
  }

  return (
    <div className="h-screen flex items-center justify-center">

      <div className="
      absolute top-1/2 z-10 flex min-h-[285px] w-full max-w-[49rem] 
      -translate-y-1/2 flex-col items-stretch justify-start px-6 sm:min-h-[270px] gap-4">
        <h1 className="text-center text-4xl font-semibold">How can you help you render</h1>
        <Chat_Input_Comp></Chat_Input_Comp>
      </div>
    </div>
  );
}

// absolute top-1/2 z-10 flex w-full max-w-[49rem]
// -translate-y-1/2 flex-col items-stretch px-6 gap-4 justify-start
