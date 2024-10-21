import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type ChatInputStoreState = {
    input_block_flag: boolean,
    set_input_block(enable: boolean): void,
}

export const useChatInputStore = create<ChatInputStoreState>()(
    immer((set, get) => ({
        input_block_flag: false,

        set_input_block(enable: boolean) {
            set(state => {
                state.input_block_flag = enable;
            })
        }
    })
    )
)
