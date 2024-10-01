import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { catchAsync } from '@/helpers';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(4, { message: 'Password is required' }),
});

export const useLogin = () => {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = form.handleSubmit(async (formData) => {
    const id = toast.loading('Logging in...!');
    catchAsync({
      id,
      tryFn: async () => {
        const { email, password } = formData;
        const response = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        if (response?.error) throw new Error(response.error);
        toast.success('Login Successful!', { id });
        router.push('/');
      },
    });
    //
    setIsLoading(false);
  });

  return { form, handleLogin, isLoading };
};
