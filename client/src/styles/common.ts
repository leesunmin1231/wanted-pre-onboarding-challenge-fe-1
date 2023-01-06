import styled from '@emotion/styled';

export const MiddleButton = styled.button`
  width: 110px;
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

export const SmallButton = styled.button<{ isDelete: boolean }>`
  width: 50px;
  height: 30px;
  cursor: pointer;
  color: ${({ isDelete }) => (isDelete ? ({ theme }) => theme.colors.RED : ({ theme }) => theme.colors.PRIMARY_DARK)};
  border: 0px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border-radius: 5px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY4};
  }
  &:active {
    filter: brightness(0.7);
  }
`;
