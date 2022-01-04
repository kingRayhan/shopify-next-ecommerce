import AppForm from "@/components/Form/AppForm";
import AppInput from "@/components/Form/AppInput";
import SplitScreenLayout from "@/components/layouts/SplitScreenLayout";
import Link from "next/link";
import * as Yup from "yup";

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().min(6).max(30).required("Password is required"),
});

export default function LoginPage() {
  return (
    <SplitScreenLayout>
      <div className="w-full max-w-sm mx-auto lg:w-96">
        <div>
          <img
            className="w-auto h-12"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8">
          <div className="mt-6">
            <AppForm
              onSubmit={(e) => console.log(e)}
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
            >
              <AppInput name="email" label="Email address" />
              <AppInput name="password" label="Password" type="password" />
              <div>
                <button
                  type="submit"
                  className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </AppForm>
            {/* Form Footer start */}
            <div className="flex flex-col items-start justify-between gap-4 mt-10">
              <div className="text-sm">
                <Link href="/auth/forgot-password">
                  <a className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </Link>
              </div>
              <div className="text-sm">
                <Link href="/auth/register">
                  <a className="font-medium text-indigo-600 hover:text-indigo-500">
                    Register
                  </a>
                </Link>
              </div>
              <div className="text-sm">
                <Link href="/">
                  <a className="font-medium text-indigo-600 hover:text-indigo-500">
                    Back to home
                  </a>
                </Link>
              </div>
            </div>
            {/* Form Footer end */}
          </div>
        </div>
      </div>
    </SplitScreenLayout>
  );
}
