/**
 * Toast 상수 설정
 */
const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 1000 * 60 * 5;
const TOAST_OPTIONS = {
  title: '',
  description: '',
};

/**
 * Toast 상태 관리
 * 초기 상태: { toasts: [] } 확장성을 고려하여 객체로 관리
 * 
 * toasts: 현재 표시된 Toast 목록
 * 각 Toast는 { id, title, description, visible } 형태로 저장
 */
let memoryState = { toasts: [] };

/**
 * Toast 리스너 관리 (옵저버 패턴)
 * 
 * listeners: 구독자 목록
 * 각 구독자는 상태 변경 시 호출되는 함수
 */
const listeners = [];

/**
 * Toast 아이디 생성
 * 
 * count: Toast 개수 카운터
 * generateId: Toast 아이디 생성 함수
 */
let count = 0;
function generateId() {
  count += 1;
  return count.toString();
}

/**
 * Toast 타임아웃 관리
 * 
 * toastTimeouts: 타임아웃 관리 맵
 * 각 Toast의 id를 키로 사용하여 타임아웃 관리
 */
const toastTimeouts = new Map();

/**
 * Toast 제거 큐 추가
 * 
 * id: Toast 아이디
 * 타임아웃 설정 후 제거 큐에 추가
 */
const addToRemoveQueue = id => {
  if (toastTimeouts.has(id)) return;

  const timeout = setTimeout(() => {
    toastTimeouts.delete(id);

    dispatch({ type: 'REMOVE_TOAST', toastId: id });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(id, timeout);
};

/**
 * Toast 상태 업데이트
 * 
 * state: 현재 상태
 * action: 액션
 * 
 * 액션에 따라 상태 업데이트
 */
const updateToast = (state, action) => {
  switch (action.type) {
    case 'ADD_TOAST': {
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }
    }
    case 'DISMISS_TOAST': {
      const { toastId } = action;

      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach(t => addToRemoveQueue(t.id));
      }

      return {
        ...state,
        toasts: state.toasts.map(t =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                visible: false,
              }
            : t
        ),
      }
    }
    case 'REMOVE_TOAST': {
      if (action.toastId === undefined) {
        return { ...state, toasts: [] };
      }

      return {
        ...state,
        toasts: state.toasts.filter(t => t.id !== action.toastId),
      }
    }
    default: {
      return state;
    }
  }
};

/**
 * Toast 액션 디스패치
 * 
 * action: 액션
 * 
 * 상태 업데이트 후 리스너 호출
 */
const dispatch = (action) => {
  memoryState = updateToast(memoryState, action);
  listeners.forEach(listener => listener(memoryState));
}

/**
 * Toast 상태 조회
 * 
 * 현재 상태 반환
 */
const getState = () => memoryState;

/**
 * Toast 리스너 구독
 * 
 * listener: 구독자 함수
 * 
 * 구독자 추가 후 해제 함수 반환
 */
const subscribe = (listener) => {
  listeners.push(listener);

  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  }
}

/**
 * Toast 생성
 * 
 * options: Toast 옵션
 * 
 * Toast 생성 후 아이디와 제거 함수 반환
 */
const toast = (options) => {
  const id = generateId();

  const dismiss = () => {
    dispatch({ type: 'DISMISS_TOAST', toastId: id });
  }

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...TOAST_OPTIONS,
      ...options,
      id,
      visible: true,
      duration: options.duration || 3000,
    }
  });

  return {
    id,
    dismiss,
  }
}

export { subscribe, getState, dispatch, updateToast, toast }