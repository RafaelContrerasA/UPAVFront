import { FC } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

interface ErrorPageProps {
  error: string;
}

const ErrorPage: FC<ErrorPageProps> = ({ error }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 text-red-500">
            <FiAlertCircle />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 font-gibson">
            Ha ocurrido un error
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 font-gibson">
            {error}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
