import { useRef, useEffect } from "react";

type ChatMessagesProps = {
    message: string;
    sender: string;
    time: number;
    id: string;
}[];

// 自制 hook
export function useAutoScroll(dependencies: ChatMessagesProps) {
    // console.log("dependencies:", dependencies);

    // const chatMessageRef = useRef(null);
    const chatMessagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const containerElem = chatMessagesRef.current;
        if (containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight;
        }
    }, [dependencies]);

    return chatMessagesRef;
}
