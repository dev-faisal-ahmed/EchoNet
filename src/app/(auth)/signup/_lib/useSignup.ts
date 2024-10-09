import { zodResolver } from '@hookform/resolvers/zod';
import { singupAction } from './signupAction';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { catchAsync } from '@/helpers';
import { useState } from 'react';
import { toast } from 'sonner';
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

  // states
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // handlers function
  const handleSignup = form.handleSubmit(async (formData) => {
    const id = toast.loading('Signing up...!');

    catchAsync({
      id,
      tryFn: async () => {
        setIsLoading(true);
        const response = await singupAction(formData);

        if (!response?.success) throw new Error(response?.message);
        toast.success(response?.message, { id });
        router.push('/login');
      },
      finallyFn: () => {
        setIsLoading(false);
      },
    });
  });

  return { form, handleSignup, isLoading };
};
