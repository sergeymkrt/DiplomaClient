import z from 'zod';

const envSchema = z.object({
  VITE_BACKEND_ENDPOINT: z.string(),
});

export const ENV = envSchema.parse(import.meta.env);
