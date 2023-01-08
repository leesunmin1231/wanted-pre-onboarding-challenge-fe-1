import { useNavigate } from 'react-router-dom';
import useModal from './useModal';

export default function useTokenError() {
  const { setContent, closeModal } = useModal();
  const navigate = useNavigate();

  const modalButton = (name: string, url: string) => ({
    name,
    handler: () => {
      navigate(url);
      closeModal();
    },
  });
  const tokenError = () => {
    setContent('로그인이 필요한 페이지 입니다.\n로그인 하시겠습니까?', [
      modalButton('회원가입', '/auth/signup'),
      modalButton('로그인', '/auth/login'),
    ]);
  };
  return { tokenError };
}
