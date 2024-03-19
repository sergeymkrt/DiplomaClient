import Meta from '@/components/Meta';

import FileTable from '@/components/FileTable';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useCurrentDirectory from '@/store/Directory';
import useUser from '@/store/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UploadFile } from '@/api/Business/Files';

const fileUploadFormSchema = z.object({
  file: z.instanceof(FileList).optional(),
});

function Welcome() {
  const fileForm = useForm<z.infer<typeof fileUploadFormSchema>>({
    resolver: zodResolver(fileUploadFormSchema),
  });
  const fileRef = fileForm.register('file');
  const queryClient = useQueryClient();

  const files = [
    {
      id: 1,
      name: 'report.pdf',
      size: '1.2 MB',
      type: 'PDF',
      date: '01/01/2021',
    },
    {
      id: 2,
      name: 'presentation.pdf',
      size: '1.2 MB',
      type: 'PDF',
      date: '01/01/2021',
    },
    {
      id: 3,
      name: 'report.pdf',
      size: '1.2 MB',
      type: 'PDF',
      date: '01/01/2021',
    },
    {
      id: 4,
      name: 'report.pdf',
      size: '1.2 MB',
      type: 'PDF',
      date: '01/01/2021',
    },
  ];
  const [directoryId, directoryActions] = useCurrentDirectory();

  const fileUploadMutation = useMutation({
    mutationFn: (file: File) => UploadFile(file, directoryId),
    onSuccess: () => {
      // await fileForm.handleSubmit(onSubmit);
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'data',
      });
    },
  });
  const onSubmit = (data: z.infer<typeof fileUploadFormSchema>) => {
    if (data.file) {
      fileUploadMutation.mutate(data.file[0]);
    }
  };

  return (
    <div>
      <Meta title="Welcome" />
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-start w-11/12 p-5">
          <Form {...fileForm}>
            <form onSubmit={fileForm.handleSubmit(onSubmit)}>
              <FormField
                control={fileForm.control}
                name="file"
                render={() => {
                  return (
                    <FormItem>
                      <FormLabel>File</FormLabel>
                      <FormControl>
                        <Input type="file" placeholder="shadcn" {...fileRef} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Button type="submit" className="mt-3">
                Submit
              </Button>
            </form>
          </Form>
        </div>
        <FileTable />
      </div>
    </div>
  );
}

export default Welcome;
