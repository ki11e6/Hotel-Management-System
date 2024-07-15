import { useMutation, useQueryClient } from '@tanstack/react-query';
import { emailLogin } from '../../services/apiAuth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoging } = useMutation({
    mutationFn: ({ email, password }) => emailLogin({ email, password }),
    onSuccess: (data) => {
      //below can be used to fetch user details later
      queryClient.setQueryData(['user'], data.user);
      toast.success('Login successful');
      navigate('/dashboard', { replace: true });
    },
    onError: (error) => {
      toast.warn(error.message);
    },
  });
  return { login, isLoging };
};

export default useLogin;
