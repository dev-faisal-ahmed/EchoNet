/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

import { Textarea } from '@/components/ui/textarea';
import { TextareaHTMLAttributes } from 'react';

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  control: any;
}

export function CustomTextArea({ name, control, ...props }: IProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Textarea {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
