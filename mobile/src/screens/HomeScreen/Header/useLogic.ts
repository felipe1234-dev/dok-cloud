import { useState, useMemo } from "react";
import { useAuth } from "@providers";
import { useInterval } from "@hooks";

function useLogic() {
    const [timePeriod, setTimePeriod] = useState("");
    const { user } = useAuth();

    useInterval(() => {
        const hours = new Date().getHours();
        if (hours < 5) return setTimePeriod("night");
        if (hours >= 5 && hours < 12) return setTimePeriod("morning");
        if (hours <= 17) return setTimePeriod("afternoon");
        if (hours <= 22) return setTimePeriod("evening");
        if (hours === 23) return setTimePeriod("night");
    }, "1m");

    const greetings = useMemo(() => {
        return timePeriod === "dawn"
            ? `Hello, $name!`
            : `Good ${timePeriod}, $name!`;
    }, [timePeriod, user]);

    return {
        greetings,
    };
}

export default useLogic;
