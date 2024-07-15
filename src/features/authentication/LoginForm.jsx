import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import FormRowVertical from '../../ui/FormRowVertical';
import useLogin from './useLogin';
import SpinnerMini from '../../ui/SpinnerMini';
import { useForm } from 'react-hook-form';

function LoginForm() {
  const { login, isLoging } = useLogin();
  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;
  function onSubmit(data) {
    const { email, password } = data;
    login({ email, password });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          disabled={isLoging}
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please enter a valid email',
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical label="Password" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isLoging}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'password needs a minimum of 8 characters',
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button
          size="large"
          disabled={isLoging}
          className="flex items-center justify-center"
        >
          {isLoging ? <SpinnerMini /> : 'Log in'}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
