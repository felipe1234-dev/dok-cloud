import { Request, RouteController } from "@typings";
import { codes, validateEmail } from "dok-fortress-globals";
import { InvalidParam, MissingBodyParam, ServerError } from "@errors";
import { Hash } from "@services";
import { User } from "dok-fortress-globals";
import { UsersDB, FoldersDB } from "@databases";

const registerUserController: RouteController = async (
    req: Request & {
        body: {
            name?: string;
            email?: string;
            password?: string;
        };
    },
    res
) => {
    try {
        const { name, email, password } = req.body;

        if (!name) throw new MissingBodyParam("name");
        if (!email) throw new MissingBodyParam("email");
        if (!validateEmail(email)) throw new InvalidParam("Invalid email");
        if (!password) throw new MissingBodyParam("password");

        const usersDB = new UsersDB();

        const userAlreadyExists = !!(await usersDB.getByEmail(email));
        if (userAlreadyExists) throw new InvalidParam("Email already taken");

        const salt = await Hash.generateSalt(10);
        const hashedPassword = await Hash.create(password, salt);

        const newUser = new User({
            name,
            email,
            salt,
            password: hashedPassword,
        });

        await usersDB.uid(newUser.uid).create(newUser);

        const foldersDB = new FoldersDB();
        await foldersDB.createRootFolder(newUser);
        await foldersDB.createTrashFolder(newUser);

        return res.sendResponse({
            status: 200,
            code: codes.USER_CREATED,
            message: "User created successfully",
        });
    } catch (err) {
        return res.sendResponse(err as ServerError);
    }
};

export { registerUserController };
