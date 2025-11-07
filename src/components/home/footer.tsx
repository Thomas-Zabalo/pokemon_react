import { useTheme } from "../provider/themeProvider.tsx";
import {useMemo} from "react";

export function Footer() {
    const { theme } = useTheme();

    const textColor = useMemo(() =>
            theme === "dark" ? "text-white" : "text-black"
        , [theme]);

    const borderColor = useMemo(() =>
            theme === "dark" ? "dark:border-white/10" : "border-black/10"
        , [theme]);

    return (
        <>
            <footer className='container'>
                <div className='w-full px-5 pb-10 overflow-hidden relative shadow-none'>
                    <div className={`w-full pt-10 flex items-center justify-center text-surface-0 border-t border-dashed  ${borderColor} ${textColor}`}>© {new Date().getFullYear()} ReactJS – Théorie et pratique intégrées</div>
                </div>
            </footer>
        </>
    )
}