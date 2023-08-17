import * as z from 'zod';
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
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '@/store/user/types';
import { useMutation } from 'react-query';
import { RegisterUser } from '@/api/Auth/AuthFunctions';

const registerSchema = z
  .object({
    name: z.string().min(2, {
      message: 'Name must be at least 2 characters.',
    }),
    surName: z.string().min(2, {
      message: 'Surname must be at least 2 characters.',
    }),
    email: z.string().email({
      message: 'Please enter a valid email.',
    }),
    userName: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
    repeatPassword: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
    phoneNumber: z.string().min(8, {
      message: 'Phone number must be at least 8 characters.',
    }),
  })
  .superRefine(({ password, repeatPassword }, ctx) => {
    if (password !== repeatPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords must match.',
        path: ['repeatPassword'],
      });
    }
  });

function RegisterForm() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      surName: '',
      email: '',
      phoneNumber: '',
      userName: '',
      password: '',
      repeatPassword: '',
    },
  });

  const mutation = useMutation({
    mutationFn: RegisterUser,
    onSuccess: () => {
      navigate('/login');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { repeatPassword, ...userData } = values;
    const user: User = { ...userData };
    mutation.mutate(user);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-1/3 p-6 border-2 shadow-2xl rounded-md grid grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="your name.." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="surName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Surname</FormLabel>
              <FormControl>
                <Input placeholder="your surname.." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="your username.." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your email.." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>PhoneNumber</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="your phone number.." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="your password.." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="repeatPassword"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Repeat Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="repeat your password.." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-center  col-span-2">
          <Button className="m-2" type="submit" onSubmit={form.handleSubmit(onSubmit)}>
            Sign Up
          </Button>
        </div>
        <p className="flex items-center justify-center col-span-2 text-sm text-center text-primary">
          Already registered?&nbsp;
          <Link to="/login" className="text-cyan-600 hover:underline">
            Go to Login
          </Link>
        </p>
      </form>
    </Form>
  );
}

export { RegisterForm, registerSchema };
