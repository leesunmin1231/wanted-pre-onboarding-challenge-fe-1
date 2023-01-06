import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { MiddleButton } from '../../styles/common';
import { AuthInput, AuthBox, Header, AuthForm, FieldName, ErrorMessage } from '../../styles/auth';
import useModal from '../../hooks/useModal';
import { httpPost } from '../../util/http';

const schema = yup
  .object({
    email: yup.string().required('이메일을 입력하세요.').email('이메일 형식에 맞지 않습니다.'),
    password: yup.string().required('비밀번호를 입력하세요.'),
  })
  .required();

export default function Login() {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });
  const { setContent, closeModal } = useModal();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  useEffect(() => {
    if (formValues.email !== '' && formValues.password !== '') {
      setButtonDisabled(false);
    }
  }, [formValues]);
  const onChangeFields = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };
  const loginAction = (token: string) => {
    localStorage.setItem('token', token);
    closeModal();
    navigate('/');
  };
  const submitSignup = async () => {
    try {
      const response = await httpPost('/users/login', { email: formValues.email, password: formValues.password });
      loginAction(response.data.token);
    } catch (e: any) {
      setContent(`${e.response.statusText}.`, [{ name: '확인', handler: closeModal }]);
    }
  };
  return (
    <AuthBox>
      <Header>로그인</Header>
      <AuthForm onSubmit={handleSubmit(submitSignup)}>
        <FieldName>이메일</FieldName>
        <AuthInput type="text" {...register('email')} placeholder="이메일" onChange={onChangeFields} />
        <ErrorMessage>{errors.email && <div>{errors.email.message as string}</div>}</ErrorMessage>
        <FieldName>비밀번호</FieldName>
        <AuthInput type="password" {...register('password')} placeholder="비밀번호" onChange={onChangeFields} />
        <ErrorMessage>{errors.password && <div>{errors.password.message as string}</div>}</ErrorMessage>
        <MiddleButton type="submit" disabled={buttonDisabled}>
          로그인
        </MiddleButton>
      </AuthForm>
    </AuthBox>
  );
}
