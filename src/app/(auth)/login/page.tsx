'use client';

import {
  CardDescription,
  CardContent,
  CardHeader,
  Card,
} from '@/components/ui/card';

import { PasswordInput } from '@/components/shared/form/PasswordInput';
import { TextInput } from '@/components/shared/form/TextInput';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/shared/Logo';
import { Form } from '@/components/ui/form';
import { useLogin } from './_lib/useLogin';
import Link from 'next/link';

export default function LoginPage() {
  const { form, handleLogin, isLoading } = useLogin();

  return (
    <PageTitle title='Signup'>
      <main className='flex min-h-screen items-center justify-center'>
        <Card className='mx-auto w-full max-w-md'>
          <CardHeader className='text-center'>
            <Logo className='mx-auto mb-3' />
            <CardDescription>
              Please, provide your credentials below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className='flex flex-col gap-6' onSubmit={handleLogin}>
                <TextInput
                  name='email'
                  control={form.control}
                  placeholder='Email'
                />
                <PasswordInput
                  name='password'
                  control={form.control}
                  placeholder='Password'
                />
                <Button
                  disabled={isLoading}
                  className='mx-auto mt-2 w-2/3'
                  type='submit'
                >
                  Login
                </Button>
                <p className='text-center text-sm text-muted-foreground'>
                  New Here?{' '}
                  <Link className='text-blue-500' href='/signup'>
                    Signup
                  </Link>
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </PageTitle>
  );
}
