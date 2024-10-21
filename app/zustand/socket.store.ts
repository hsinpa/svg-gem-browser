import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { WebsocketManager } from "~/websocket/websocket";

type SocketStoreState = {
    socket: WebsocketManager | undefined,
    set_socket(p_socket: WebsocketManager): void,
}

export const useSocketInputStore = create<SocketStoreState>()(
    immer((set, get) => ({
        socket: undefined,

        set_socket(p_socket: WebsocketManager) {
            set(state => {
                state.socket = p_socket;
            })
        }
    })
    )
)
