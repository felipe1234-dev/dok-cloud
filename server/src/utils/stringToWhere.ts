import { operators, Operator } from "dok-cloud-globals";

function stringToWhere<T>(str: string) {
    if (!str) return undefined;

    const operator = operators.find((operator) => str.includes(operator));
    if (!operator) return undefined;

    const [field, value] = str.split(operator);
    return [field, operator, value] as [
        field: keyof T,
        operator: Operator,
        value: T[keyof T],
    ];
}

export default stringToWhere;
