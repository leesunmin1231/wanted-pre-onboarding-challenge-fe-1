import { atom } from 'recoil';
import todoType from '../types/TodoList';
import modalType from '../types/Modal';

export const todoList = atom<todoType[]>({
  key: 'todoList',
  default: [],
});

export const completeList = atom<todoType[]>({
  key: 'completeList',
  default: [],
});

export const modalContent = atom<modalType>({
  key: 'modal',
  default: { display: false, message: '', buttons: [] },
});
