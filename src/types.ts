import { z } from "zod";

export const TitleSchema = z.object({
  title: z.string().min(3),
});

export type TitleSchemaType = z.infer<typeof TitleSchema>;
