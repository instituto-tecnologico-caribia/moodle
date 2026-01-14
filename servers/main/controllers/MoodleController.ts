import z from "zod"
import axios from "axios";
import { MoodleZodSchemas } from "../schemas"
import { MOODLE_TOKEN, MOODLE_API_URL } from "../constants";
import { GraphQLError } from "graphql";
import { createUserTransformer, safeJsonStringify } from "@/helpers";


class MoodleController {
    static createUser = async (_: any, { data }: { data: z.infer<typeof MoodleZodSchemas.users.CoreUserCreateUsers> }, { __, req }: { __: any, req: any }, { fieldNodes }: { fieldNodes: any }) => {
        try {
            return await MoodleZodSchemas.users.CoreUserCreateUsers.parseAsync(data).then(async (body) => {
                const bodyData = createUserTransformer(body)
                console.log({ bodyData });

                const params = new URLSearchParams(Object.assign({}, bodyData, {
                    "wsfunction": "core_user_create_users",
                    "wstoken": MOODLE_TOKEN,
                    "moodlewsrestformat": "json"
                }))

                const response = await axios.post(MOODLE_API_URL, params, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                const user = await MoodleZodSchemas.users.CoreUserCreateUserResponse.safeParseAsync(response.data)
                if (user.success)
                    return user.data

                throw safeJsonStringify(response.data)
            })
        } catch (error) {
            throw new GraphQLError(error)
        }
    }

    static async searchUsers(data: z.infer<typeof MoodleZodSchemas.users.CoreUserGetUsers>) {
        try {
            return await MoodleZodSchemas.users.CoreUserGetUsers.parseAsync(data).then(async () => {
                const params = new URLSearchParams(Object.assign({}, data, {
                    "wsfunction": "core_user_get_users",
                    "wstoken": MOODLE_TOKEN,
                    "moodlewsrestformat": "json"
                }))

                const response = await axios.post(MOODLE_API_URL, params, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                return response.data
            })
        } catch (error) {
            throw error
        }
    }
}

export { MoodleController }