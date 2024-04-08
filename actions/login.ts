'use server';
import { LoginSchema } from '@/schemas';
import * as z from 'zod';

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }
  const { email, password, code } = validatedFields.data;
  console.log(values);
  return { success: 'Confirmation email sent!' };
};
