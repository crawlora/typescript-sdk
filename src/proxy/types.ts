import { ZBaseTypes } from "../main/types";
import { z } from "zod";

export const ZProxyResponse = ZBaseTypes.extend({
    data: z.object({
        protocol: z.string(),
        host: z.string(),
        username: z.string(),
        password: z.string(),
        port: z.string().transform(Number)
    })
})