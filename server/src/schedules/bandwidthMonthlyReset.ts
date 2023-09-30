import { UsersDB } from "@databases";

async function bandwidthMonthlyReset() {
    const usersDB = new UsersDB();

    const users = await usersDB.where("deleted", "==", false).get();

    const promises: Promise<void>[] = [];

    for (const user of users) {
        const promise = new Promise<void>(async (resolve) => {
            const usage = { ...user.usage };
            usage.bandwidth.used = 0;
            usage.updatedAt = new Date();
            await usersDB.uid(user.uid).update({ usage });
            resolve();
        });

        promises.push(promise);

        if (promises.length >= 500) {
            await Promise.all(promises);
            promises.length = 0;
        }
    }

    await Promise.all(promises);
    promises.length = 0;
}

export default bandwidthMonthlyReset;
