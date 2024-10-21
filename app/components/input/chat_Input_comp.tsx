import { useCallback, useContext, useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { MessageInterface } from "~/types/chatbot_types";
import { KeyboardEventCode } from "~/utility/static_text";
import { useChatInputStore } from "~/zustand/chat_input_store";
import { useMessageStore } from "~/zustand/message_store";

type KeyValuePairType = {
    [key: string]: number;
};

let keyboad_pair_tables: KeyValuePairType = {};

export const Chat_Input_Comp = function( {submit_callback}: {submit_callback: (message: MessageInterface) => void } ) {
    const push_message_callback = useMessageStore(s=>s.push_message);
    const [is_focus, set_focus] = useState(false);
    const [textarea_value, set_textarea] = useState('');
    let set_input_block = useChatInputStore(state => state.set_input_block)
    let input_block_flag = useChatInputStore(state => state.input_block_flag)

    let set_textarea_height = function() {
        let lineBreaks = textarea_value.match(/\n/g);
        let line_break_lens = (lineBreaks == undefined) ? 0 : lineBreaks.length;

        let textarea_dom = document.querySelector<HTMLTextAreaElement>('.user_input_textarea textarea');
        if (line_break_lens == undefined) line_break_lens = 0;
        
        let base = 3.5;
        let step = 1.8;
        if (textarea_dom != null)
            textarea_dom.style.height = ( (base) + (line_break_lens * step) )+ "em";
    }

    let fire_submit_event = function() {
        let message: MessageInterface = {
            _id: uuidv4(), content: textarea_value, type: 'human', version: 1
        }

        push_message_callback(message);
        
        submit_callback(message);
        set_textarea('');
    }
    
    let on_textarea_change = function(e: React.FormEvent<HTMLTextAreaElement>) {
        set_textarea(e.currentTarget.value);
    }

    const on_keyboard_down = function (event: KeyboardEvent) {
        keyboad_pair_tables[event.key] = 1

        if (event.key == KeyboardEventCode.Enter && !(KeyboardEventCode.Shift in keyboad_pair_tables)
        && !event.isComposing && !input_block_flag) {
            event.preventDefault();
            fire_submit_event();
        }
    }

    const on_keyboard_up = function (event: KeyboardEvent) {
        if (event.key in keyboad_pair_tables) {
            delete keyboad_pair_tables[event.key];
        }
    }

    useEffect(() => {
        set_textarea_height();
        let user_textarea_dom = document.querySelector<HTMLTextAreaElement>('.user_input_textarea textarea');
        if (user_textarea_dom != null) user_textarea_dom.focus();


        window.addEventListener("keydown", on_keyboard_down);
        window.addEventListener("keyup", on_keyboard_up);

        return () => {
            window.removeEventListener("keydown", on_keyboard_down);
            window.removeEventListener("keyup", on_keyboard_up);    
        }  
    }, [textarea_value]);

    return (
        <div className="flex row-auto user_input_textarea">
            <textarea placeholder="Ask me a SVG shape"
                onChange={on_textarea_change}
                onFocus={(x) => set_focus(true) }
                onBlur={(x) => {
                    set_focus(false) 
                    set_textarea_height()
                }}
                value={textarea_value}
                className="bg-slate-50 w-full resize-none rounded p-4 max-h-40 focus:outline-none">
            </textarea>
            <button className="bg-slate-300 px-2" disabled={input_block_flag} onClick={fire_submit_event}>Send</button>
        </div>
    )
}