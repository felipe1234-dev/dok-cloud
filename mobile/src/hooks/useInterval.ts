import { useRef, useEffect, useMemo } from "react";

function useInterval(
    callback: (id: NodeJS.Timeout) => void | Promise<void>,
    cronExpression: `${number}${"h" | "m" | "s" | "ms"}` | null,
    triggers: any[] = []
) {
    const savedCallback = useRef((id: NodeJS.Timeout) => {
        clearInterval(id);
    });

    const delay = useMemo(() => {
        if (cronExpression === null) return null;

        const amount = Number(cronExpression.replace(/[a-zA-Z]+/g, ""));
        const timeUnit = cronExpression.replace(String(amount), "");

        const ms = 1;
        const s = 1000 * ms;
        const m = 60 * s;
        const h = 60 * m;

        if (timeUnit === "h") return amount * h;
        if (timeUnit === "m") return amount * m;
        if (timeUnit === "s") return amount * s;
        if (timeUnit === "ms") return amount * ms;
        return amount;
    }, [cronExpression]);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delay === null) {
            return;
        }

        const id = setInterval(() => {
            savedCallback.current(id);
        }, delay);

        return () => clearInterval(id);
    }, [delay, ...triggers]);
}

export { useInterval };
