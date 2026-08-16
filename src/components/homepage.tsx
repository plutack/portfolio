'use client';
import { useCallback, useState } from "react";
import Menu from "@/components/_homepage/options";
import styles from "@/styles/homepage.module.css";


export default function HomePage(props:{
    sections: {[key: string] : JSX.Element}
}) {

    const [bodyJSX, setBodyJSX] = useState<string>("home");

    const isKeyExist = useCallback(
        (keyStr: string) => Object.prototype.hasOwnProperty.call(props.sections, keyStr),
        [props.sections],
    );
    
    const capitalizedKeys = Object.keys(props.sections).map(key => {
        return key.charAt(0).toUpperCase() + key.slice(1);
    });
    
    return <>
    <div className={styles.homedivmain}>
    { bodyJSX? props.sections[bodyJSX] : props.sections["home"]}
    </div>
    <Menu bodyJSX={bodyJSX} setBodyJSX={setBodyJSX} keys={capitalizedKeys} isKeyExist={isKeyExist}/>
    </>

}