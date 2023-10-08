/**
 * @param a Array of anything
 * @param size The size of each chunk
 */
function getChunks(a: any[], size: number) {
    return Array.from(new Array(Math.ceil(a.length / size)), (_, i) =>
        a.slice(i * size, i * size + size)
    );
}

export { getChunks };
