import { pt_BR } from "./pt_BR";
import { en_US } from "./en_US";

const languages = {
    en_US,
    pt_BR,
};

type Language = keyof typeof languages;

export { languages };
export type { Language };
export default languages;
