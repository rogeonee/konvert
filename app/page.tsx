'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import ImageCard from '@/components/image-card';
import { Form } from '@/components/ui/form';
import Header from '@/components/header';

const formSchema = z.object({
  quality: z.enum(['low', 'medium', 'high']),
  images: z.array(
    z.object({
      file: z.any(), // For server-side rendering
      format: z.string().min(1, 'Format is required'),
    }),
  ),
});

export type FormData = z.infer<typeof formSchema>;

const Home = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quality: 'high',
      images: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'images',
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newImages = acceptedFiles.map((file) => ({
        file,
        format: '',
      }));
      append(newImages);
    },
    [append],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.gif', '.webp'],
    },
    maxSize: 100 * 1024 * 1024, // 100MB
    noClick: true,
  });

  const handleAddMore = () => {
    (document.getElementById('fileInput') as HTMLInputElement)!.click();
  };

  const onSubmit = (data: FormData) => {
    console.log('submit pressed');

    // Runtime check for File objects
    const isValid = data.images.every((image) => image.file instanceof File);
    if (isValid) {
      console.log(data);
    } else {
      console.error('Invalid file data');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-6rem)] flex-col gap-4 lg:gap-6 lg:p-6">
          {/* Header */}
          <Header
            fields={fields}
            handleAddMore={handleAddMore}
            control={form.control}
          />

          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={`flex flex-1 bg-muted/50 rounded-lg border-2 border-dashed shadow-sm p-2 md:p-4 ${
              isDragActive ? 'border-primary' : 'border-muted'
            }`}
          >
            <input {...getInputProps()} id="fileInput" />
            {fields.length === 0 ? (
              <div className="flex flex-1 items-center justify-center">
                <div className="flex flex-col items-center gap-1 text-center">
                  <h3 className="text-2xl font-bold tracking-tight">
                    {isDragActive
                      ? 'Drop the files here'
                      : 'Drop files or pick manually'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Max size 100MB
                  </p>
                  <Button
                    variant="default"
                    className="mt-4"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddMore();
                    }}
                    type="button"
                  >
                    Choose files
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2 w-full">
                {fields.map((field, index) => (
                  <ImageCard
                    key={field.id}
                    filename={field.file.name}
                    filesize={field.file.size}
                    onRemove={() => remove(index)}
                    control={form.control}
                    name={`images.${index}.format`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Submit button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={fields.length === 0}
              className="w-60"
            >
              {fields.length > 1 ? 'Konvert all' : 'Konvert'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default Home;
