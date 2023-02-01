import { createStore } from "vuex";
import axiosClient from "../axios";

const tmtSurveys = [
    {
        id: 100,
        title: "TheCodeholic Content",
        slug: "thecodeholic-content",
        status: "draft",
        image: "https://pbs.twimg.com/profile_images/1118059535003017221/9ZwEYqj2_400X400.png",
        description: "My name is Chris. <br> ! am a Web Developer with 3+ years of experience, free educational content",
        created_at: "2023-2-1 18:00:00",
        updated_at: "2023-2-1 18:00:00",
        Expire_date: "2023-2-11 18:00:00",
        questions: [
            {
                id: 1,
                type: "select",
                question: "From which country are you?",
                description: null,
                data: {
                    options: [
                        {uuid: "f8af96f2-1d80-4632-9e9e-b560670e52ea", text: "Nigeria"},
                        {uuid: "201ciff5-23c9-42f9-bfb5-bbc850536440", text: "Georgia"},
                        {uuid: "b5c09733-a49e-460a-ba8a-52789984e258", text: "Germany"},
                        {uuid: "yim55646-g7g9-h850-4fu8-hhdf4r4u39xe", text: "India"},
                        {uuid: "uhdk4542-4gh8-5jh6-3n5e-kj57834jnjnc", text: "United Kingdom"},
                    ],
                },
            },

            {
                id: 2,
                type: "checkbox",
                question: "Which language videos do you want to see on my channel ?",
                description: "Select the language you want my videos to be on",
                data: {
                    options: [
                        {uuid: "f8af96f2-1d80-4632-9e9e-b560670e52ea", text: "Javascript"},
                        {uuid: "201ciff5-23c9-42f9-bfb5-bbc850536440", text: "PHP"},
                        {uuid: "b5c09733-a49e-460a-ba8a-52789984e258", text: "HTML + CSS"},
                        {uuid: "yim55646-g7g9-h850-4fu8-hhdf4r4u39xe", text: "vue"},
                        {uuid: "uhdk4542-4gh8-5jh6-3n5e-kj57834jnjnc", text: "Laravel"},
                    ],
                },
            }
        ],

    }
]

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
        }
    },
    getters: {},
    actions: {
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
        logout: (state) => {
            state.user.data = {};
            state.user.token = null;
        },

        setUser: (state, userData) => {
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem('TOKEN', userData.token);
        }
    },
    modules: {}
})

export default store;