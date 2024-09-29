'use client';

import {
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
  Card,
} from '@/components/ui/card';

import { PasswordInput } from '@/components/shared/form/PasswordInput';
import { TextInput } from '@/components/shared/form/TextInput';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { useSignup } from './(lib)/useSignup';
import { Form } from '@/components/ui/form';

export default function SignUpPage() {
  const { form, handleSignup } = useSignup();

  return (
    <PageTitle title='Signup'>
      <main className='flex min-h-screen items-center justify-center'>
        <Card className='mx-auto w-full max-w-md'>
          <CardHeader>
            <CardTitle className='mb-2'>Hi There 👋!</CardTitle>
            <CardDescription>Provide your information below</CardDescription>
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
                <Button type='submit'>Signup</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </PageTitle>
  );
}
