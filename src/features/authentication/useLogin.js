import { useMutation } from '@tanstack/react-query';
import { emailLogin } from '../../services/apiAuth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const useLogin = () => {
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoging } = useMutation({
    mutationFn: ({ email, password }) => emailLogin({ email, password }),
    onSuccess: (userData) => {
      console.log(userData);
      toast.success('Login successful');
      navigate('/dashboard');
    },
    onError: (error) => {
      console.log(error.message);
      toast.warn(error.message);
    },
  });
  return { login, isLoging };
};

export default useLogin;
