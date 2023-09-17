import { Operator } from "dok-fortress-globals";

interface Filters<T> {
    where?: Array<[key: keyof T, operator: Operator, value: any]>;
    or?: Array<[key: keyof T, operator: Operator, value: any]>;
    limit?: number;
    startAfter?: string;
    orderBy?: [field: string, direction: "desc" | "asc"];
}

export type { Filters };
