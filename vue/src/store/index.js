import { createStore } from "vuex";
import axiosClient from "../axios";

const tmpSurveys = [
  {
    id: 100,
    title: "The Hapra channel content",
    slug: "the-hapra-channel-content",
    status: "draft",
    image:
      "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
    description:
      "My name is hapra i am a fullstacj engineer with 3+ experience",
    created_at: "2022-01-26 18:00:00",
    updated_at: "2022-01-26 18:00:00",
    expire_date: "2022-01-27 18:00:00",
    questions: [
      {
        id: 1,
        type: "select",
        question: "From wich contry you",
        description: null,
        data: {
          options: [
            { uuid: "90845-q4545q-qqqx34-x34", text: "Indonesia" },
            { uuid: "09j3k-qrejkj-khqjer-ekh", text: "USA" },
            { uuid: "988df-dfadf8-adf8ad-8df", text: "Germany" },
          ],
        },
      },
      {
        id: 2,
        type: "checkbox",
        question: "which language can you use",
        description:
          "apa saja lah yang penting katanya panjang dan bisa buat contoh",
        data: {
          options: [
            { uuid: "90845-adfdf-qqqx34-x34", text: "Javascript" },
            { uuid: "09j3k-qrejkj-adfdf3-ekh", text: "PHP" },
            { uuid: "988df-mladlg-adf8ad-8df", text: "TypeScript" },
            { uuid: "988df-mladlg-dafdfe-8df", text: "Python" },
          ],
        },
      },
      {
        id: 3,
        type: "checkbox",
        question: "which framework can you use",
        description:
          "apa saja lah yang penting katanya panjang dan bisa buat contoh",
        data: {
          options: [
            { uuid: "adf89-adfdf-qqqx34-x34", text: "Codeigniter" },
            { uuid: "ljadf-qrejkj-adfdf3-ekh", text: "Laravel" },
            { uuid: "988df-dfadfe-adf8ad-8df", text: "Nest" },
            { uuid: "988df-mladlg-78dfad-8df", text: "React" },
          ],
        },
      },
      {
        id: 4,
        type: "radio",
        question: "which framework do you live most?",
        description:
          "apa saja lah yang penting katanya panjang dan bisa buat contoh",
        data: {
          options: [
            { uuid: "adf89-dfd432-qqqx34-x34", text: "Laravel 5" },
            { uuid: "adg35-qrejkj-adfdf3-ekh", text: "Laravel 6" },
            { uuid: "988df-dfadfe-0adf8d-8df", text: "Laravel 7" },
            { uuid: "988df-df324n-78dfad-8df", text: "Laravel 8" },
          ],
        },
      },
      {
        id: 5,
        type: "text",
        question: "what your favorite youtube channel",
        description:
          "apa saja lah yang penting katanya panjang dan bisa buat contoh",
        data: {},
      },
      {
        id: 6,
        type: "textarea",
        question: "what you think about hapra youtubechannel",
        description:
          "apa saja lah yang penting katanya panjang dan bisa buat contoh",
        data: {},
      },
    ],
  },
  {
    id: 101,
    title: "Laravel 8",
    slug: "laravel-8",
    status: "active",
    image:
      "https://www.matawebsite.com/images/blog/420_cara_upload_gambar_menggunakan_ckeditor_di_laravel_8.png",
    description:
      "My name is hapra i am a fullstacj engineer with 3+ experience",
    created_at: "2022-01-26 18:00:00",
    updated_at: "2022-01-26 18:00:00",
    expire_date: "2022-01-27 18:00:00",
    questions: [],
  },
  {
    id: 200,
    title: "React Js ",
    slug: "react-js",
    status: "active",
    image:
      "https://psti.unisayogya.ac.id/wordpress_psti/wp-content/uploads/2019/12/1_yk5D5cQB3jd7EiPzrDrD5w.png",
    description:
      "My name is hapra i am a fullstacj engineer with 3+ experience",
    created_at: "2022-01-26 18:00:00",
    updated_at: "2022-01-26 18:00:00",
    expire_date: "2022-01-27 18:00:00",
    questions: [],
  },
  {
    id: 300,
    title: "Tailwind css",
    slug: "tailwind-css",
    status: "active",
    image:
      "https://yt3.ggpht.com/ikv41jMTr1uHGdILrJhvbfVJcDt4oqhwApKX37TjAleF_cRPbF2W-waj7uMnS5JySvnlvAlTCg=s900-c-k-c0x00ffffff-no-rj",
    description:
      "My name is hapra i am a fullstacj engineer with 3+ experience",
    created_at: "2022-01-26 18:00:00",
    updated_at: "2022-01-26 18:00:00",
    expire_date: "2022-01-27 18:00:00",
    questions: [],
  },
];

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
    dashboard: {
      loading: false,
      data: {},
    },
    currentSurvey: {
      loading: false,
      data: {},
    },
    surveys: {
      loading: false,
      links: [],
      data: [],
    },
    notification: {
      show: false,
      type: null,
      message: null,
    },
    questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
  },
  getters: {},
  actions: {
    getDashboardData({ commit }) {
      commit("dashboardLoading", true);
      return axiosClient
        .get("/dashboard")
        .then((res) => {
          commit("dashboardLoading", false);
          commit("setDashboardData", res.data);
          return res;
        })
        .catch((err) => {
          commit("dashboardLoading", false);
          return err;
        });
    },
    getSurveys({ commit }, { url = null } = {}) {
      url = url || "/survey";
      commit("setSurveysLoading", true);
      return axiosClient.get(url).then((res) => {
        commit("setSurveys", res.data);
        commit("setSurveysLoading", false);
        return res;
      });
    },
    getSurvey({ commit }, id) {
      commit("setCurrentSurveyLoading", true);
      return axiosClient
        .get(`/survey/${id}`)
        .then((res) => {
          commit("setCurrentSurvey", res.data);
          commit("setCurrentSurveyLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentSurveyLoading", false);
          throw err;
        });
    },
    saveSurvey({ commit }, survey) {
      delete survey.image_url;
      let response;
      if (survey.id) {
        response = axiosClient
          .put(`/survey/${survey.id}`, survey)
          .then((res) => {
            commit("setCurrentSurvey", res.data);
            return res;
          });
      } else {
        response = axiosClient.post("/survey", survey).then((res) => {
          commit("setCurrentSurvey", res.data);
          return res;
        });
      }
      return response;
    },
    deleteSurvey({}, id) {
      return axiosClient.delete(`/survey/${id}`);
    },
    getSurveyBySlug({ commit }, slug) {
      commit("setCurrentSurveyLoading", true);
      return axiosClient
        .get(`/survey-by-slug/${slug}`)
        .then((res) => {
          commit("setCurrentSurvey", res.data);
          commit("setCurrentSurveyLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentSurveyLoading", false);
          throw err;
        });
    },
    saveSurveyAnswer({ commit }, { surveyId, answers }) {
      return axiosClient.post(`/survey/${surveyId}/answer`, { answers });
    },
    register({ commit }, user) {
      return axiosClient.post("/register", user).then(({ data }) => {
        commit("setUser", data);
        return data;
      });
    },
    login({ commit }, user) {
      return axiosClient.post("/login", user).then(({ data }) => {
        commit("setUser", data);
        return data;
      });
    },
    logout({ commit }) {
      return axiosClient.post("/logout").then((response) => {
        commit("logout");
        return response;
      });
    },
  },
  mutations: {
    dashboardLoading: (state, loading) => {
      state.dashboard.loading = loading;
    },
    setDashboardData: (state, data) => {
      state.dashboard.data = data;
    },
    setCurrentSurveyLoading: (state, loading) => {
      state.currentSurvey.loading = loading;
    },
    setCurrentSurvey: (state, survey) => {
      state.currentSurvey.data = survey.data;
    },
    setSurveysLoading: (state, loading) => {
      state.surveys.loading = loading;
    },
    saveSurvey: (state, survey) => {
      state.surveys = [...state.surveys, survey.data];
    },
    setSurveys: (state, surveys) => {
      state.surveys.links = surveys.meta.links;
      state.surveys.data = surveys.data;
    },
    updateSurvey: (state, survey) => {
      state.surveys = state.surveys.map((s) => {
        if (s.id == survey.data.id) {
          return survey.data;
        }
        return s;
      });
    },
    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.user = userData.user;
      sessionStorage.setItem("TOKEN", userData.token);
    },
    notify: (state, { type, message }) => {
      state.notification.show = true;
      state.notification.type = type;
      state.notification.message = message;
      setTimeout(() => {
        state.notification.show = false;
      }, 3000);
    },
  },
  modules: {},
});

export default store;
