import { useState } from 'react';
import { setupNewPassword } from '@apiMethods/authorizationApi';
import { useAppConfigStore } from '@stores/appConfig';
import { Button, Form, Input, Typography } from 'antd';
import Title from 'antd/es/typography/Title';

import { CompleteRegistrationForm } from './types';

import s from './completeRegistration.module.css';

import banner from '@assets/png/tea-on-sunrise.png';

export const CompleteRegistration: React.FC = () => {
  const { currentUser, logOut } = useAppConfigStore();
  const [formInstance] = Form.useForm<CompleteRegistrationForm>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (form: CompleteRegistrationForm) => {
    if (form.password !== form.repeatPassword) {
      formInstance.setFields([{
        name: 'repeatPassword',
        errors: ['Passwords didn\'t match'],
      }]);

      return undefined;
    }

    setIsLoading(true);

    try {
      await setupNewPassword(form);
      window.location.reload();
    } finally {
      setIsLoading(false);
    }
  };

  const interruptRegistration = () => {
    logOut();
  };

  return (
    <div className={s.root}>
      <Title level={3}>Hello, {currentUser?.displayName}!</Title>
      {currentUser && (
        <div className={s.contentContainer}>

          <div className={s.leftSection}>
            <Typography>For complete registration setup password for you account</Typography>
            <Form
              layout="vertical"
              name="completeRegistration"
              labelCol={{ span: 8 }}
              autoComplete="off"
              onFinish={onSubmit}
              disabled={isLoading}
              form={formInstance}
            >
              <Form.Item<CompleteRegistrationForm>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item<CompleteRegistrationForm>
                label="Repeat password"
                name="repeatPassword"
                rules={[{ required: true, message: 'Please repeat your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={s.button}
                  loading={isLoading}
                >
                  Complete registration
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div className={s.rightSection}>
            <img src={banner} alt="auth-banner" className={s.bannerImg} />
            <div className={s.rightBottomSection}>
              <Typography>Or
                <Button type="link" onClick={interruptRegistration}>LogOut</Button>
              </Typography>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
