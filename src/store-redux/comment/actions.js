export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: 'comment/load-start' });

      try {
        const res = await services.api.request({
          url: `api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        });
        // Товар загружен успешно
        dispatch({ type: 'comment/load-success', payload: { data: res.data.result } });

      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comment/load-error' });
      }
    }
  },

  create: (data) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: 'comment/create-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments`,
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            "X-Token": localStorage.getItem("token")
          }

        });
        // Товар загружен успешно
        dispatch({ type: 'comment/create-success', payload: { data: res.data.result } });

      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comment/create-error' });
      }
    }
  },



  // setViewCancel: (id) => {
  //   return (dispatch, getState, services) => {
  //     console.log(getState().comment.data.items)
  //     const data = getState().comment.data.items.map(item => {
  //       if (item._id === id) {
  //         return { ...item, cancel: true }
  //       } else {
  //         return { ...item, cancel: false }
  //       }
  //     }
  //     )
  //     console.log(data)
  //     dispatch({ type: 'comment/view-authinfo', payload: { data } });
  //   }
  // },

  // setCloseCancel: () => {
  //   return (dispatch, getState, services) => {
  //     const data = getState().comment.data.items.map(item => {
  //       return { ...item, cancel: false }
  //     }
  //     )
  //     dispatch({ type: 'comment/close-authinfo', payload: { data } });
  //   }
  // },
}
