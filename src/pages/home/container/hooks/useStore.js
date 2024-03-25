// 封装统一导出的store
import { createContext, useContext } from 'react';
import store from '../store';

// 创建一个上下文对象，用于跨级组件通讯
// 如果createContext提供了默认值，不需要Provider
const Context = createContext(store);
// 自定义hook
export default function useStore() {
  return useContext(Context);
}
