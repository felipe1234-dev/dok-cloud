function createSnapshotListener<T>(
    runOnInit: boolean,
    callback: (snapshot: T) => void
) {
    let initialLoad = true;

    return (snapshot: T) => {
        if (initialLoad) {
            initialLoad = false;
            if (!runOnInit) return;
        }

        callback(snapshot);
    };
}

export { createSnapshotListener };
