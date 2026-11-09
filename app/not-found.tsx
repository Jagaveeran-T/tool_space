import Link from 'next/link';
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-main flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-7xl font-bold text-indigo-600">
        404
      </h1>

      <h2 className="mt-5 text-2xl font-bold">
        Page Not Found
      </h2>

      <p className="mt-3 max-w-md text-slate-500">
        Sorry, the page you are looking for does not exist
        or may have been moved.
      </p>

      <Link
        href="/"
        className={buttonVariants({ className: "mt-7" })}
        >
        Go Home
      </Link>
    </div>
  );
}

