import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import { toast } from 'react-toastify';
import FormRow from '../../ui/FormRow';

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('New Cabin has been created');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      reset();
    },
    onError: (error) => {
      toast.warn(error.message);
    },
  });

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Existing cabin successfully updated');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      reset();
    },
    onError: (error) => {
      toast.warn(error.message);
    },
  });

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    if (isEditSession) {
      editCabin({ newCabinData: { ...data, image }, id: editId });
    } else createCabin({ ...data, image });
  }

  const isLoading = isEditing || isCreating;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow id="name" label="Cabin name" error={errors?.name?.message}>
        <Input
          disabled={isLoading}
          type="text"
          id="name"
          {...register('name', { required: 'this field is required' })}
        />
      </FormRow>

      <FormRow
        id="maxCapacity"
        label="capacity"
        error={errors?.maxCapacity?.message}
      >
        <Input
          disabled={isLoading}
          type="number"
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'this field is required',
            min: {
              value: 1,
              message: 'Capacity must be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow
        id="regularPrice"
        label="Regular price"
        error={errors?.regularPrice?.message}
      >
        <Input
          disabled={isLoading}
          type="number"
          id="regularPrice"
          {...register('regularPrice', { required: 'this field is required' })}
        />
      </FormRow>

      <FormRow id="discount" label="Discount" error={errors?.discount?.message}>
        <Input
          disabled={isLoading}
          type="number"
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: 'this field is required',
            validate: (value) =>
              value <= Number(getValues().regularPrice) ||
              'value must be within the regular price',
          })}
        />
      </FormRow>

      <FormRow
        id="description"
        label="Description"
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isLoading}
          type="number"
          id="description"
          defaultValue=""
          {...register('description', { required: 'this field is required' })}
        />
      </FormRow>

      <FormRow id="image" label="Cabin photo" error={false}>
        <FileInput
          disabled={isLoading}
          id="image"
          accept="image/*"
          // type="file"
          {...register('image', {
            required: isEditSession ? false : 'this field is required',
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          disabled={isLoading}
          $variation="secondary"
          type="reset"
          onClick={() => reset()}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isEditSession ? 'Edit Cabin' : 'Create Cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
