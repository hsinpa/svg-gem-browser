import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror';
import { xml } from '@codemirror/lang-xml';
import { useSVGDataStore } from "~/zustand/svg_data_store";
import './svg_editor_style.css'

export function SVG_Editor_Viewer() {
    const svg_store = useSVGDataStore();
    const mirrorRef = useRef(null);

    const onChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
      svg_store.set_svg_code(value)
    }, []);

    const set_container_full_height = function() {
        const outerContainer = (mirrorRef as MutableRefObject<any>).current.editor;
        const innerContainer = outerContainer.children[0];

        if (outerContainer != null)
            outerContainer.style.height = '100%';

        if (innerContainer != null)
            innerContainer.style.height = '100%';
    }
  
    useEffect(() => {
        set_container_full_height();

        const timeout = setTimeout(() => {
            set_container_full_height();
        }, 100);
        return () => clearTimeout(timeout);
      }, []);
    

    return (
        <CodeMirror

            ref={mirrorRef}
            value={svg_store.svg_code}
            height="100%"
            extensions={[xml({ })]}
            onChange={onChange}
            basicSetup={{
                foldGutter: false,
                dropCursor: false,
                allowMultipleSelections: false,
                indentOnInput: false,
            }}
        />
    );
}
