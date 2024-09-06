'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import SelectQuality from '@/components/select-quality';
import ImageCard from '@/components/image-card';
import { Form } from '@/components/ui/form';

// for testing
const sampleImages = [
  { name: 'image1.jpg', size: 204800 },
  { name: 'image2.png', size: 512000 },
  { name: 'image3.gif', size: 1048576 },
  { name: 'image44.webp', size: 256000 },
];

const formSchema = z.object({
  quality: z.enum(['low', 'medium', 'high']),
  images: z.array(
    z.object({
      file: z.any(), // For server-side rendering
      format: z.string().min(1, 'Format is required'),
    }),
  ),
});

type FormData = z.infer<typeof formSchema>;

export default function Home() {
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
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />
      <main className="flex-1 p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-6rem)] flex-col gap-4 lg:gap-6 lg:p-6">
              <div className="flex flex-col gap-2 md:flex-row justify-between sm:items-center sm:gap-4">
                <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                  <div className="flex w-full md:w-auto items-center justify-start gap-2">
                    <h1 className="text-lg font-semibold md:text-2xl">
                      Convert in
                    </h1>
                    <SelectQuality control={form.control} name="quality" />
                  </div>
                </div>
                {fields.length > 0 && (
                  <div className="flex mt-2 md:justify-end md:mt-0">
                    <Button
                      variant="default"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddMore();
                      }}
                      type="button"
                    >
                      Add more...
                    </Button>
                  </div>
                )}
              </div>

              {/* Drop files section */}
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
      </main>
    </div>
  );
}
