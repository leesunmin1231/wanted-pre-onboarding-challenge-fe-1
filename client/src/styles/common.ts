import styled from '@emotion/styled';

export const MiddleButton = styled.button`
  width: 130px;
  height: 32px;
  border-radius: 5px;
  border: 0px solid;
  background-color: ${({ theme }) => theme.colors.PRIMARY};
  color: ${({ theme }) => theme.colors.WHITE};
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  padding: 7px 10px;
  font-size: 14px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.PRIMARY_DARK};
  }
  &:active:enabled {
    filter: brightness(0.7);
  }
  &:disabled {
    background-color: ${({ theme }) => theme.colors.GRAY2};
  }
`;
