import { z } from "zod";

export const ZBaseTypes = z.object({
    message: z.string().optional()
})