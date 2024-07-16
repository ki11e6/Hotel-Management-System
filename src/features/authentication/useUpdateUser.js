import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '../../services/apiAuth';
import { toast } from 'react-toastify';

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (data) => {
      toast.success('User updated successfully');
      queryClient.setQueryData(['user'], data?.user);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => toast.warn(error.message),
  });
  return { updateUser, isUpdating };
};

export default useUpdateUser;
