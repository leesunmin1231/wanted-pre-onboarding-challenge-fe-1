import React from 'react';
import styled from '@emotion/styled';

export default function WriteDetail() {
  return <Write placeholder="상세 내용을 입력하세요" />;
}

const Write = styled.textarea`
  width: 100%;
  height: 200px;
  resize: none;
  border: 0px;
  border-top: 1px solid ${({ theme }) => theme.colors.GRAY3};
  font-size: 16px;
  padding: 10px 15px;
  &:focus {
    outline-style: none;
  }
  &::placeholder {
    user-select: none;
    color: ${({ theme }) => theme.colors.GRAY3};
  }
`;
