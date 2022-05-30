const getAllBuilder = {
  pending: (state) => {
    state.loading = true;
    state.isSearched = false;
  },
  fulfilled: (state, { payload }) => {
    const { data, isSearched, totalCounted } = payload;
    state.loading = false;
    state.list = data;
    state.isSearched = isSearched;
    state.totalCounted = totalCounted;
  },
  rejected: (state, { payload }) => {
    state.loading = false;
    state.error = payload;
    state.isSearched = false;
  },
};

const createBuilder = {
  pending: (state, { payload }) => {
    state.loading = true;
    // add skeleton ele in last
    state.list.push({ ...payload, _id: Math.random() });
  },
  fulfilled: (state, { payload }) => {
    state.loading = false;
    // remove last ele
    state.list.pop();
    if (payload) {
      state.list = [...state.list, payload];
    }
  },
  rejected: (state) => {
    state.loading = false;
    state.list.pop();
  },
};

const removeBuilder = {
  pending: (state) => {
    state.loading = true;
  },
  fulfilled: (state, { payload }) => {
    state.loading = false;
    state.list = state.list.filter((memory) => memory._id !== payload);
  },
  rejected: (state) => {
    state.loading = false;
  },
};

const updateBuilder = {
  pending: (state) => {
    state.loading = true;
  },
  fulfilled: (state, { payload }) => {
    state.loading = false;
    state.list = state.list.map((memory) => {
      if (memory._id === payload._id) {
        return payload;
      }
      return memory;
    });
  },
  rejected: (state) => {
    state.loading = false;
  },
};

const builders = {
  get: getAllBuilder,
  create: createBuilder,
  remove: removeBuilder,
  update: updateBuilder,
};

export default builders;
