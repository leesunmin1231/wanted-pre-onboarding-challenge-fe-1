import { atom } from 'recoil';
import todoResponseType from '../types/TodoResponse';
import modalType from '../types/Modal';

export const todoList = atom<todoResponseType[]>({
  key: 'todoList',
  default: [],
});

export const modalContent = atom<modalType>({
  key: 'modal',
  default: { display: false, message: '', buttons: [] },
});
