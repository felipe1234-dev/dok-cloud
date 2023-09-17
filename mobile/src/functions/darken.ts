import { lighten } from "./lighten";

function darken(color: string, darkness: number): string {
    return lighten(color, -darkness);
}

export { darken };
