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
import { useSignup } from './(lib)/useSignup';
import { Form } from '@/components/ui/form';

export default function SignUpPage() {
  const { form, handleSignup, isLoading } = useSignup();

  return (
    <PageTitle title='Signup'>
      <main className='flex min-h-screen items-center justify-center'>
        <Card className='mx-auto w-full max-w-md'>
          <CardHeader className='text-center'>
            <Logo className='mx-auto mb-3' />
            <CardDescription>
              Please, provide your information below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className='flex flex-col gap-6' onSubmit={handleSignup}>
                <TextInput
                  name='name'
                  control={form.control}
                  placeholder='Name'
                />
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
                <PasswordInput
                  name='confirmPassword'
                  control={form.control}
                  placeholder='Confirm Password'
                />
                <Button
                  disabled={isLoading}
                  className='mx-auto mt-2 w-2/3'
                  type='submit'
                >
                  SignUp
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </PageTitle>
  );
}
