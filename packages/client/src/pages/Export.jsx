import { useEffect, useRef, useState } from "react";

import React from 'react';
import { useStorageState } from "../hooks/useStorageState";

export const Export = () => {
    const [products] = useStorageState('products', []);
    const userDataEl = useRef(null);

    const base64Data = btoa(JSON.stringify(products))

    const doCopy = () => {
        userDataEl.current.select();
        document.execCommand("copy");
    }

    return <div>
        <span>Estes são os dados que foram gravados no telemóvel. Copie e cole para lugar seguro</span>
        <br/>
        <button onClick={() => doCopy()}>Copiar</button>
        <div>
            <textarea ref={userDataEl} className="export-code" readOnly value={base64Data}></textarea>
        </div>
    </div>
}