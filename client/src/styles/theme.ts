import { Theme } from '@emotion/react';

const sideBarMaxSize = 256;
const maxFrameSize = 1295;
// const mainSectionSize = maxFrameSize - sideBarMaxSize - 1;

const theme: Theme = {
  colors: {
    PRIMARY: '#AC92ED',
    PRIMARY_DARK: '#7B52E1',
    PRIMARY_LIGHT: '#E0D7F8',
    OFF_WHITE: '#F7F4FD',
    WHITE: '#FFFFFF',
    BLACK: '#333333',
    GRAY1: '#888888',
    GRAY2: '#BBBBBB',
    GRAY3: '#D7D7D7',
    GRAY4: '#EEEEEE',
    GRAY5: '#F5F5F5',
    RED: '#C83A68',
    BLUE: '#6468FF',
    LIGHT_BLACK: '#464646',
    POINT_COLOR: '#C75DE0',
    BACKGROUND: '#f8f9f9',
  },
  frameMinWidth: `1000px`,
  frameMaxWidth: `${maxFrameSize}px`,
  sideBarMinWidth: `82px`,
  sideBarMaxWidth: `${sideBarMaxSize}px`,
};

export default theme;
