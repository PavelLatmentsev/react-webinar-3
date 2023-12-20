// Начальное состояние
export const initialState = {
  data: {},
  waiting: false, // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {

  switch (action.type) {
    case "comment/load-start":
      return { ...state, data: {}, waiting: true };

    case "comment/load-success":
      return { ...state, data: action.payload.data, waiting: false };

    case "comment/load-error":
      return { ...state, data: {}, waiting: false }; //@todo текст ошибки сохранять?
    case "comment/create-start":
      return { ...state, waiting: true };

    case "comment/create-success":
      return { ...state, data: { ...data, items: [...data.items, action.payload.data], count: count + 1 || 0 }, waiting: false };

    case "comment/view-authinfo":

      return { ...state, data: action.payload.data, waiting: false }
    // return { ...state, data: { ...data, items: [...data.items, action.payload.data] }, waiting: false };
    case "comment/close-authinfo":
      return { ...state, data: { ...state.data, items: [...state.data.items, action.payload.data] }, waiting: false };
    case "comment/create-error":
      return { ...state, data: {}, waiting: false }; //@todo текст ошибки сохранять?
    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
