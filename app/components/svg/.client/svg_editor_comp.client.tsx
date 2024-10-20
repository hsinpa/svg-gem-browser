import React, { useCallback, useState } from "react";
import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror';
import { xml } from '@codemirror/lang-xml';
import { useSVGDataStore } from "~/zustand/svg_data_store";

export function SVG_Editor_Viewer() {
    const svg_store = useSVGDataStore();

    const onChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
      svg_store.set_svg_code(value)
    }, []);
  
    return (
        <CodeMirror
            value={svg_store.svg_code}
            height="200px"
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
