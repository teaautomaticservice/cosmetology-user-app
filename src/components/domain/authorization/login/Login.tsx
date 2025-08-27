import { useAppConfigStore } from '@stores/appConfig';
import { UserDataApiError } from '@typings/errors';
import { Button, Checkbox, Form, Input, Typography } from 'antd';

import { AuthFormWrapper } from '../formWrapper/AuthFormWrapper';

import { LoginForm } from './types';

import s from './login.module.css';

const { Text } = Typography;

export const Login: React.FC = () => {
  const [formInstance] = Form.useForm<LoginForm>();
  const { login, isAuthLoading } = useAppConfigStore()

  formInstance.setFieldsValue({ isRemember: false });

  const submit = async (form: LoginForm) => {
    try {
      await login(form);
    } catch (e) {
      const { statusCode, message } = e as UserDataApiError;

      if (statusCode === 400) {
        if (message) {
          formInstance.setFields([{
            name: 'email',
            errors: [message],
          }])
        }
      } else {
      // eslint-disable-next-line no-console
        console.error(e);
      }
    }
  };

  return (
    <AuthFormWrapper className={s.root}>
      <Form
        layout="vertical"
        name="login"
        labelCol={{ span: 8 }}
        autoComplete="off"
        onFinish={submit}
        disabled={isAuthLoading}
        form={formInstance}
      >
        <Text strong>Login</Text>

        <Form.Item<LoginForm>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<LoginForm>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<LoginForm>
          name="isRemember"
          valuePropName="checked"
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={s.button}
            loading={isAuthLoading}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </AuthFormWrapper>
  )
}