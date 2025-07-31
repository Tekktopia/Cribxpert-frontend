import { Link } from 'react-router-dom';

const NotFound404 = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-white">
        <h1 className="text-6xl font-bold text-gray-800 md:text-8xl">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-600 md:text-3xl">
          Page not found
        </h2>
        <p className="mt-4 text-center text-gray-500 max-w-md">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="px-6 py-3 mt-8 text-white transition-colors duration-300 bg-[#1D5C5C] rounded-md hover:bg-[#a422a2]"
        >
          Go Back Home
        </Link>
      </div>
    </>
  );
};

export default NotFound404;
