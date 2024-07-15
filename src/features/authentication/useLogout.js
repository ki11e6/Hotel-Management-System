import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      toast.success('Successfull Logout');
      //using replace history is cleared and going back is not possible
      navigate('/login', { replace: true });
    },
  });
  return { logout, isLoading };
};

export default useLogout;
