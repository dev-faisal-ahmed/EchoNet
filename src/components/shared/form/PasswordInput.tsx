/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  FormControl,
  FormMessage,
  FormField,
  FormItem,
} from '@/components/ui/form';

import { InputHTMLAttributes, useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: any;
}

export function PasswordInput({ name, control, ...props }: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className='relative'>
              <Input
                {...field}
                {...props}
                type={isPasswordVisible ? 'text' : 'password'}
              />
              <div
                onClick={() => setIsPasswordVisible((prev) => !prev)}
                className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'
              >
                {isPasswordVisible ? (
                  <EyeIcon size={16} />
                ) : (
                  <EyeOffIcon size={16} />
                )}
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
