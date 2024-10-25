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
import { filterHeicFiles } from '@/lib/utils';
import { useHeicConversion } from '@/lib/useHeicConversion';
import { Download } from 'lucide-react';

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
      const validFiles = filterHeicFiles(acceptedFiles);

      const newImages = validFiles.map((file) => ({
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
      'image/*': ['.heic'],
    },
    maxSize: 100 * 1024 * 1024, // 100MB
    noClick: true,
  });

  const handleAddMore = () => {
    const input = document.getElementById('fileInput') as HTMLInputElement;

    input.onchange = (event: Event) => {
      const files = Array.from(input.files || []);
      const validFiles = filterHeicFiles(files);

      const newImages = validFiles.map((file) => ({
        file,
        format: '',
      }));

      console.log('newImages:', newImages);

      append(newImages);

      // Clear the file input value to prevent duplicates
      input.value = '';
    };

    input.click();
  };

  const {
    convertHeicToFormat,
    isConverting,
    progress,
    convertedFiles,
    downloadAll,
    downloadFile,
    removeConvertedFile,
    clearConvertedFiles,
  } = useHeicConversion();

  const onSubmit = async (data: FormData) => {
    console.log('onSubmit fired');
    const qualityMap = { low: 0.4, medium: 0.7, high: 0.9 };

    try {
      // Clear any previously converted files
      clearConvertedFiles();

      for (const image of data.images) {
        await convertHeicToFormat(
          image.file,
          image.format,
          qualityMap[data.quality],
        );
      }

      // Don't reset the form immediately after conversion
      // Let user download files first
    } catch (error) {
      console.error('Error during conversion:', error);
    }
  };

  const handleDownloadAll = () => {
    downloadAll();
    // Reset form after downloading
    form.reset({
      quality: 'high',
      images: [],
    });
    clearConvertedFiles();
  };

  const handleRemoveFile = (index: number, filename: string) => {
    // Remove from fields array
    remove(index);
    // Remove from converted files if it exists
    removeConvertedFile(filename);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.reset({
      quality: 'high',
      images: [],
    });
    clearConvertedFiles();
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
            <input {...getInputProps()} id="fileInput" accept=".heic" />
            {fields.length === 0 ? (
              // Empty dropzone
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
              // Added ImageCards
              <div className="flex flex-col gap-2 w-full">
                {fields.map((field, index) => {
                  // Find matching converted file by original filename
                  const convertedFile = convertedFiles.find(
                    (cf) => cf.originalName === field.file.name,
                  );

                  return (
                    <ImageCard
                      key={field.id}
                      filename={field.file.name}
                      filesize={field.file.size}
                      onRemove={() => handleRemoveFile(index, field.file.name)}
                      control={form.control}
                      name={`images.${index}.format`}
                      progress={progress}
                      isConverted={!!convertedFile}
                      onDownload={
                        convertedFile
                          ? () => {
                              downloadFile(convertedFile);
                            }
                          : undefined
                      }
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Submit button */}
          <div className="flex justify-center gap-4">
            <Button
              type="submit"
              disabled={
                fields.length === 0 || isConverting || convertedFiles.length > 0
              }
              className="w-60"
            >
              {isConverting
                ? 'Konverting...'
                : fields.length > 1
                ? 'Konvert all'
                : 'Konvert'}
            </Button>

            {/* Download button */}
            {convertedFiles.length > 0 && !isConverting && (
              <Button
                type="button"
                onClick={handleDownloadAll}
                className="w-60 gap-4"
              >
                Download{fields.length > 1 ? ' All' : ''}
              </Button>
            )}

            {/* Reset button */}
            {(fields.length > 0 || convertedFiles.length > 0) && (
              <Button
                type="button"
                variant="outline"
                disabled={isConverting}
                onClick={handleReset}
                className="w-60"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default Home;
