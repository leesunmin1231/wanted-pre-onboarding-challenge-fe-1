import React from 'react';
import styled from '@emotion/styled';

export default function WriteDetail() {
  return <Write placeholder="상세 내용을 입력하세요" />;
}

const Write = styled.textarea`
  width: 100%;
  height: 200px;
`;
