import { useNavigate } from 'react-router-dom';
import useModal from './useModal';

export default function useTokenError() {
  const { setContent, closeModal } = useModal();
  const navigate = useNavigate();
  const tokenError = () => {
    setContent('토큰 형식이 올바르지 못합니다. 다시 로그인해주세요.', [
      {
        name: '확인',
        handler: () => {
          navigate('/login');
          closeModal();
        },
      },
    ]);
  };
  return { tokenError };
}
