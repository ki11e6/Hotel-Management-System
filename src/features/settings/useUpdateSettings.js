import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateSetting as updateSettingApi } from '../../services/apiSettings';

const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  const { mutate: updateSetting, isPending: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success('Settings updated successfully');
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      });
    },
    onError: (error) => toast.warn(error.message),
  });
  return { isUpdating, updateSetting };
};

export default useUpdateSettings;
