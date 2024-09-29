import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// schemas
const singupFormSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(4, { message: 'Password is required' }),
    confirmPassword: z
      .string()
      .min(4, { message: 'Confirm password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
  });

export const useSignup = () => {
  const form = useForm<z.infer<typeof singupFormSchema>>({
    resolver: zodResolver(singupFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // handlers function
  const handleSignup = form.handleSubmit(async (formData) => {
    console.log(formData);
  });

  return { form, handleSignup };
};
