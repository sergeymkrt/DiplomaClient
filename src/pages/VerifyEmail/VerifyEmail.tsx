import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { VerifyEmailPost } from '@/api/Auth/AuthFunctions';
import useNotifications from '@/store/notifications';

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [, notificationActions] = useNotifications();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  // Call the API to verify the email
  const verifyEmailQuery = useMutation({
    mutationFn: () => VerifyEmailPost(email ?? '', token ?? ''),
    onSuccess: () => {
      notificationActions.push({
        message: 'Email verified successfully',
        options: { variant: 'success' },
      });
      // Redirect to login page
      navigate('/login');
    },
    onError: () => {
      notificationActions.push({
        message: 'Failed to verify email',
        options: { variant: 'error' },
      });
    },
  });

  if (token && email) {
    verifyEmailQuery
      .mutateAsync()
      .then((r) => r)
      .catch((e) => e);
  }

  return (
    <div>
      {!token ? (
        <div className="bg-gray-100 flex items-center justify-center h-screen">
          <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
            <h1 className="text-2xl font-bold mb-4">Check Your Email</h1>
            <p className="mb-4">
              We&apos;ve sent you an email with a link to verify your account. Please check your
              email inbox and click the verification link.
            </p>
            <p className="text-gray-600 text-sm mb-4">
              Didn&apos;t receive the email?{' '}
              <a href="#" className="text-blue-500">
                Resend email
              </a>
            </p>
            <p className="text-gray-600 text-sm">
              Already verified?{' '}
              <a href="#" className="text-blue-500">
                Login
              </a>
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 flex items-center justify-center h-screen"></div>
      )}
    </div>
  );
}

export default VerifyEmail;
