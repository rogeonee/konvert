'use client';

import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Download, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import Options from '@/components/options';
import ImageCard from '@/components/image-card';
import { filterHeicFiles } from '@/lib/utils';
import { useHeicConversion } from '@/hooks/useHeicConversion';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from './ui/toast';

const formSchema = z.object({
  quality: z.enum(['low', 'medium', 'high']),
  format: z.string().min(1, 'Format is required'),
  images: z.array(
    z.object({
      file: z.any(),
    }),
  ),
});

export type FormData = z.infer<typeof formSchema>;

const Home = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quality: 'high',
      format: 'jpg', // Default format
      images: [],
    },
  });

  const watchFormat = form.watch('format');

  useEffect(() => {
    if (watchFormat === 'png') {
      form.setValue('quality', 'high');
    }
  }, [watchFormat, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'images',
  });

  const { toast } = useToast();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const validFiles = filterHeicFiles(acceptedFiles);

      if (acceptedFiles.length !== validFiles.length) {
        toast({
          title: 'Non-HEIC files were skipped.',
          description: 'It is a HEIC converter after all.',
          className: 'border-[#A80115]',
        });
      }

      const newImages = validFiles.map((file) => ({
        file,
      }));

      append(newImages);
    },
    [append, toast],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected: (rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        const largeFiles = rejectedFiles.filter((file) =>
          file.errors.some((err) => err.code === 'file-too-large'),
        );

        const length = largeFiles.length;
        console.log('largeFiles length', length);
        if (length > 0) {
          toast({
            title: 'Some files are too large.',
            description: `Files must be smaller than 50MB. ${length} file${
              length >= 2 ? 's' : ''
            } skipped.`,
            className: 'border-[#A80115]',
          });
        }
      }
    },
    accept: {
      'image/*': ['.heic'],
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    noClick: true,
  });

  const {
    convertHeicToFormat,
    isConverting,
    progressMap,
    convertedFiles,
    downloadAll,
    downloadFile,
    removeConvertedFile,
    clearConvertedFiles,
  } = useHeicConversion();

  const onSubmit = async (data: FormData) => {
    const qualityMap = { low: 0.4, medium: 0.7, high: 0.9 };

    try {
      // Clear any previously converted files
      clearConvertedFiles();

      for (const image of data.images) {
        await convertHeicToFormat(
          image.file,
          data.format,
          qualityMap[data.quality],
        );
      }
    } catch (error) {
      console.error('Error during conversion:', error);
      toast({
        title: 'Uh oh! Something went wrong.',
        description:
          'There was a problem during conversion, refresh the page and try again.',
        action: (
          <ToastAction
            altText="Refresh"
            onClick={() => window.location.reload()}
            className="bg-destructive text-destructive-foreground"
          >
            Refresh
          </ToastAction>
        ),
        duration: Infinity,
        className: 'border-[#A80115]',
      });
    }
  };

  const handleAddMore = () => {
    const input = document.getElementById('fileInput') as HTMLInputElement;

    input.onchange = (event: Event) => {
      const files = Array.from(input.files || []);
      const validFiles = filterHeicFiles(files);
      if (files.length !== validFiles.length) {
        toast({
          title: 'Non-HEIC files were skipped.',
          description: 'Only HEIC files are supported.',
          className: 'bg-white',
        });
      }

      const newImages = validFiles.map((file) => ({
        file,
      }));

      append(newImages);

      // Clear the file input value to prevent duplicates
      input.value = '';
    };

    input.click();
  };

  const handleDownloadAll = () => {
    downloadAll();
    // reset form after downloading
    form.reset({
      quality: 'high',
      images: [],
    });
    clearConvertedFiles();
  };

  const handleRemoveFile = (index: number, filename: string) => {
    // remove from fields array (ImageCards rendered)
    remove(index);
    // remove from converted files if it exists
    removeConvertedFile(filename);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    form.reset({
      quality: 'high',
      format: 'jpg', // Reset to default
      images: [],
    });
    clearConvertedFiles();
  };

  const getCurrentState = () => {
    if (fields.length === 0) {
      return 'start-emp';
    } else if (!isConverting && convertedFiles.length === 0) {
      return 'start-add';
    } else if (isConverting) {
      return 'converse';
    } else if (!isConverting && convertedFiles.length === fields.length) {
      return 'end';
    }

    return 'impossible';
  };
  const currentState = getCurrentState();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-6rem)] flex-col gap-4 lg:gap-6 lg:p-6">
          {/* Options */}
          <Options
            fields={fields}
            handleAddMore={handleAddMore}
            handleReset={handleReset}
            control={form.control}
            currentState={currentState}
            isPng={watchFormat === 'png'}
          />

          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={`flex flex-1 bg-muted/50 rounded-lg border-2 border-dashed shadow-sm ${
              isDragActive ? 'border-primary' : 'border-muted'
            }`}
          >
            <input {...getInputProps()} id="fileInput" accept=".heic" />
            {fields.length === 0 ? (
              // Empty dropzone
              <div className="flex flex-1 items-center justify-center p-2 sm:p-4 h-empty-base sm:h-empty-base-sm md:h-empty-base-md lg:h-empty-base-lg">
                <div className="flex flex-col items-center gap-1 text-center">
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                    {isDragActive
                      ? 'Drop the files here'
                      : 'Drop HEIC files or pick manually'}
                  </h2>
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
              <div
                className="dropzone flex flex-col gap-2 w-full overflow-y-auto p-2 
                  sm:p-4 h-filled-base sm:h-filled-base-sm md:h-filled-base-md lg:h-filled-base-lg"
                style={{
                  boxSizing: 'content-box',
                }}
              >
                {fields.map((field, index) => {
                  // match converted file by original filename
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
                      progress={progressMap[field.file.name] || 0}
                      isConverting={isConverting}
                      isConverted={!!convertedFile}
                      currentState={currentState}
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

          {/* Buttons */}
          <div className="flex justify-center">
            {/* Konvert button */}
            {['start-emp', 'start-add', 'converse'].includes(currentState) && (
              <Button
                type="submit"
                disabled={['start-emp', 'converse'].includes(currentState)}
                className="w-60 gap-2"
              >
                {isConverting ? (
                  <>
                    Konverting...
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : fields.length > 1 ? (
                  'Konvert all'
                ) : (
                  'Konvert'
                )}
              </Button>
            )}

            {/* Download button */}
            {['end'].includes(currentState) && (
              <Button
                type="button"
                onClick={handleDownloadAll}
                className="w-60 gap-2"
              >
                Save{fields.length > 1 ? ' All' : ''}
                <Download className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default Home;
