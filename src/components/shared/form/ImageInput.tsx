import * as React from 'react';
import Image from 'next/image';

import { Input } from '@/components/ui/input';
import { XIcon } from 'lucide-react';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onImageRemove: () => void;
  defaultValue?: string;
}

export const ImageInput = React.forwardRef<HTMLInputElement, IProps>(
  ({ onImageRemove, defaultValue, ...props }, ref) => {
    const [imagePreview, setImagePreview] = React.useState<
      string | null | undefined
    >(defaultValue);

    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const render = new FileReader();
        render.onloadend = () => {
          setImagePreview(render.result as string);
        };
        render.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    };

    const handleRemoveImage = () => {
      onImageRemove();
      setImagePreview(null);
    };

    return (
      <div>
        <Input
          ref={ref}
          type='file'
          accept='image/*'
          onChange={onImageChange}
          {...props}
        />
        {imagePreview && (
          <div className='relative mt-2'>
            <Image
              className='rounded-lg'
              src={imagePreview}
              alt='image'
              sizes='100%'
              width={500}
              height={500}
            />
            <span
              className='absolute right-2 top-2 block cursor-pointer rounded-md bg-red-500 p-1 text-white'
              onClick={handleRemoveImage}
            >
              <XIcon size={20} />
            </span>
          </div>
        )}
      </div>
    );
  },
);

ImageInput.displayName = 'Input';
