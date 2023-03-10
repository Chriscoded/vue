import { createStore } from "vuex";
import axiosClient from "../axios";


const store = createStore( {
    state: {
        user: {
            data: {
                // name: 'Tom Cook',
                // email: 'tom@example.com',
                // imageUrl:
                // 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',

            },
            //LETS SAVE TOKEN TO SESSIONSTORAGE
            token: sessionStorage.getItem("TOKEN"),
        },
        dashboard:{
            loading: false,
            data: {}
        },
        currentSurvey: {
            loading: false,
            data: {}
        },
        surveys: {
           loading: false,
           links: [],
           data: [] 
        },
        questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
        notification: {
            show: false,
            type: null,
            message: null,
        }
    },
    getters: {},
    actions: {
        getDashboardData({commit}){
            commit('dashboardLoading', true)
            return axiosClient.get(`/dashboard`)
                .then((res) =>{
                    commit('dashboardLoading', false)
                    commit('setDashboardData', res.data)
                    return res;
                })
                .catch(error => {
                    commit('dashboardLoading', false)
                    return error;
                })
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

        saveSurvey({commit}, survey){
            //we don't want to send image url to backened
            //since image has same content and image url is for display purposes
            delete survey.image_url;
            let response;

            //if it has id that means we are updating survey
            //so use put request
            if(survey.id){
                response = axiosClient
                    .put(`/survey/${survey.id}`, survey)
                    .then((res) => {
                       //commit("updateSurvey", res.data);
                        commit("setCurrentSurvey", res.data);
                        return res;
                    });
            } else{
                response = axiosClient.post("/survey", survey).then((res) => {
                    //commit("saveSurvey", res.data);
                    commit("setCurrentSurvey", res.data);
                    return res;
                });
            }

            return response;
        },
        deleteSurvey({}, id){
            return axiosClient.delete(`/survey/${id}`);
        },
        getSurveys({commit}, {url = null} = {}){
            url = url || '/survey'
            commit('setSurveysLoading', true)
            return axiosClient.get(url).then((res) => {
                commit('setSurveysLoading', false)
                commit("setSurveys", res.data)
                return res;
            });
        },

        getSurveyBySlug({commit}, slug){
            commit("setCurrentSurveyLoading", true);
            return axiosClient
                .get(`/survey-by-slug/${slug}`)
                .then((res) =>{
                    commit("setCurrentSurvey", res.data);
                    commit("setCurrentSurveyLoading", false);
                    return res;
                })
                .catch((err) => {
                    commit("setCurrentSurveyLoading", false);
                    throw err;
                });
        },
        saveSurveyAnswers({commit}, {surveyId, answers}){
            return axiosClient.post(`/survey/${surveyId}/answer`, {answers});
        },

        register({commit}, user){
            return axiosClient.post('/register', user)
            .then(({data}) =>{
                commit('setUser', data);
                return data;
            })
        },

        login({commit}, user){
           return axiosClient.post('/login', user)
            .then(({data}) =>{
                commit('setUser', data);
                return data;
            })
        },

        logout({commit}){
            return axiosClient.post('/logout')
                .then(response =>{
                    commit('logout')
                    return response;
                })
        }
    },
    // purpose of mutation is to just change the state
    mutations: {
        dashboardLoading: (state, loading) => {
            state.dashboard.loading = loading;
        },

        setDashboardData: (state, data) => {
            state.dashboard.data = data
        },
        //set current surveyLoading state to true or false base on the value of parameter loading
        setCurrentSurveyLoading: (state, loading) => {
            state.currentSurvey.loading = loading;
        },

        //set all surveyLoading state to true or false base on the value of parameter loading
        setSurveysLoading: (state, loading) => {
            state.surveys.loading = loading;
        },
        //set current survey data based on the particular suvey passed to it
        setCurrentSurvey: (state, survey) => {
            state.currentSurvey.data = survey.data;
        },

        //set all surveys data based on the particular suvey passed to it
        setSurveys: (state, surveys) => {
            // debugger;
            state.surveys.data = surveys.data;
            state.surveys.links = surveys.meta.links;
        },
          
        // saveSurvey: (state, survey) => {
        //     //state.surveys is equal to the structurally existing survey and 
        //     // and new survey data
        //     state.surveys = [...state.surveys, survey.data];
        // },

        // updateSurvey: (state, survey) => {
        //     state.surveys = state.surveys.map((s) => {
        //         //if existing survey id equal received survey id
        //         //then return the received survey id
        //         if(s.id == survey.data.id){
        //             return survey.data
        //         }
        //         return s;
        //     });
        // },
        logout: (state) => {
            state.user.data = {};
            state.user.token = null;
        },

        setUser: (state, userData) => {
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem('TOKEN', userData.token);
        },
        notify: (state, {message, type}) => {
            state.notification.show = true;
            state.notification.type = type;
            state.notification.message = message;
            setTimeout(() => {
                state.notification.show = false;
            }, 5000)
        }
    },
    modules: {}
})

export default store;