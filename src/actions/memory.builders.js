const getBuilder = {
  pending: (state) => {
    state.loading = true;
    state.memoryItem = null;
  },
  fulfilled: (state, { payload }) => {
    state.loading = false;
    state.memoryItem = payload;
  },
  rejected: (state, { payload }) => {
    state.loading = false;
    state.memoryItem = null;
  },
};

const getRecommendBuilder = {
  pending: (state) => {
    state.loading = true;
    state.recommendItems = [];
  },
  fulfilled: (state, { payload }) => {
    state.loading = false;
    state.recommendItems = payload;
  },
  rejected: (state, { payload }) => {
    state.loading = false;
    state.recommendItems = [];
  },
};

const builders = {
  get: getBuilder,
  getRecommend: getRecommendBuilder,
};

export default builders;
