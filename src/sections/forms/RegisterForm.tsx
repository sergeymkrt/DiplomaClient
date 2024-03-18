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
import { useMutation } from '@tanstack/react-query';
import { RegisterUser } from '@/api/Auth/AuthFunctions';
import useNotifications from '@/store/notifications';
import { SnackbarMessage } from 'notistack';

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
    password: z
      .string()
      .min(12, {
        message: 'Password must be at least 12 characters.',
      })
      .regex(new RegExp('.*\\d.*'), {
        message: 'Password must contain at least one number.',
      })
      .regex(new RegExp('.*[A-Z].*'), {
        message: 'Password must contain at least one uppercase letter.',
      })
      .regex(new RegExp('.*[a-z].*'), {
        message: 'Password must contain at least one lowercase letter.',
      })
      .regex(new RegExp('.*[!@#$%^&*?].*'), {
        message: 'Password must contain at least one special character.',
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
  const [notifications, notifActions] = useNotifications();
  // const [generatedPassword, setGeneratedPassword] = useState('' as string);

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
      notifActions.push({
        options:{variant: 'error'},
        message: error.message
      })
    },
  });

  // const query = useQuery('generatePassword', {
  //   queryFn: GeneratePassword,
  //   onSuccess: (data) => {
  //     setGeneratedPassword(data.data);
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   },
  // });

  // async function passwordGenerator() {
  //   form.setValue('password', generatedPassword);
  //   form.setValue('repeatPassword', generatedPassword);
  //
  //   await query.refetch();
  // }

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

        {/* Button to generate password*/}

        {/*<div className="flex  col-span-2">*/}
        {/*<Button className="m-2" onClick={passwordGenerator}>*/}
        {/*  Generate Password*/}
        {/*</Button>*/}
        {/*</div>*/}

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
