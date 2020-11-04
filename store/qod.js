function store() {
  const state = {
    qod: "",
  };

  const mutations = {
    CHANGE_QOD: (data) => {
      state.qod = data;
    },
  };

  const actions = {
    update: (quote) => {
      mutations.CHANGE_QOD(quote);
    },
  };

  const getters = {
    getState: () => {
      return state;
    },
  };

  return {
    actions,
    getters,
  };
}

module.exports = store();
