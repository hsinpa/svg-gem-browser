import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import { WebsocketManager } from "./websocket/websocket";
import { GetWSS } from "./utility/api_static";
import { createContext, useEffect } from "react";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}



const websocket_manager = new WebsocketManager(GetWSS());
export let wsContext = createContext<WebsocketManager | undefined>(undefined);

export default function App() {

  useEffect(() => {
    websocket_manager.connect();
    console.log('Root Socket ' + websocket_manager.id)

    return () => {
    };
  }, []);

  return (<wsContext.Provider value={websocket_manager}>
    <Outlet />
  </wsContext.Provider>);
}
