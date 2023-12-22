import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";

const loginUser = async (payload: TLoginUser) => {

    const user = await User.findOne({ id: payload?.id });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    return {}
};


export const AuthServices = {
    loginUser,
};