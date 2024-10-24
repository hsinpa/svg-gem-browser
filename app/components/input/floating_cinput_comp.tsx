import { useRef, useState } from 'react';
import angle_down_svg from '../../assets/sprite/angle-down.svg';
import { Chat_Input_Comp } from './chat_Input_comp';
import { MessageInterface } from '~/types/chatbot_types';


export let Floating_CInput_Comp = function() {
    const [is_floating_expand, set_floating_expand] = useState<boolean>(false);
    const expand_button_ref = useRef<HTMLImageElement>(null);
    const shrink_chat_input_ref = useRef<HTMLDivElement>(null);

    let on_arrow_click = function(e: React.MouseEvent<HTMLImageElement>) {
        let floating_expand = !is_floating_expand;

        if (expand_button_ref.current == null || shrink_chat_input_ref.current == null) return;

        if (floating_expand) {
            expand_button_ref.current.style.display = 'none';
            shrink_chat_input_ref.current.style.display = 'block';
        } else {
            expand_button_ref.current.style.display = 'block';
            shrink_chat_input_ref.current.style.display = 'none';
        }

        set_floating_expand(floating_expand);
    }

    const on_input_submit = function(message: MessageInterface) {
        console.log(message);
    }

    return (<div>
        <img className='w-8 origin-center rotate-180 absolute top-[95%] left-1/2 -translate-x-1/2
        hover:w-10 hover:cursor-pointer'
        onClick={on_arrow_click}
        src={angle_down_svg} ref={expand_button_ref}></img>

        <div className='absolute w-8/12 left-1/2 top-3/4 -translate-x-1/2 hidden'
            ref={shrink_chat_input_ref}>

            <img className='w-8 origin-center absolute -top-10 left-1/2 -translate-x-1/2
            hover:w-10 hover:cursor-pointer'
            onClick={on_arrow_click}
            src={angle_down_svg}></img>

            <Chat_Input_Comp submit_callback={on_input_submit}></Chat_Input_Comp>
        </div>
    </div>)
}