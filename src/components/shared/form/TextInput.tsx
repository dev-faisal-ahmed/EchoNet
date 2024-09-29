/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  FormMessage,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: any;
}

export function TextInput({ name, control, ...props }: TextInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
