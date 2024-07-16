import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import { toast } from 'react-toastify';

const useSignup = () => {
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      console.log(data);
      toast.success('Signup successful');
    },
    onError: (error) => {
      console.log(error);
      toast.warn(error.message);
    },
  });
  return { signup, isLoading };
};

export default useSignup;
