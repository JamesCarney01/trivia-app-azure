import React from 'react';
import { z, ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type FormData = {
  userName: string;
};

/**
 * LoginForm component renders a login form and handles form validation.
 * @param onSubmit - Function to handle form submission with the form data.
 */

const schema: ZodType<FormData> = z.object({
  userName: z.string().min(1).max(20),
});

const LoginForm: React.FC<{
  onSubmit: (formData: FormData) => void;
}> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form className="flex flex-col items-center justify-center bg-black text-white border border-white rounded-lg p-6 mt-4" onSubmit={handleSubmit(onSubmit)}>
      <label className="text-xl mb-4 pr-4">
        Username:
        <input type="text" {...register("userName")} className="bg-black text-white border border-white rounded px-2 py-1 mt-2" />
        {errors.userName && <span className="text-red-500">{errors.userName.message}</span>}
      </label>
      <button type="submit" className="bg-white text-black rounded px-4 py-2 transition-colors duration-300 hover:bg-orange-500 font-bold">Submit</button>
    </form>
  );
};

export default LoginForm;
