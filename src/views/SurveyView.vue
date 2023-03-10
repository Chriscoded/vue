<template>
    <PageComponent>
        <template v-slot:header>
            <div v-if="!surveyLoading" class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-900">
                    {{ model.id ? model.title : "Create a Survey"}}
                </h1>

                <Button 
                    v-if="route.params.id" 
                    color="red" 
                    @click="deleteSurvey()"
                    class="py-2 px-3 text-white bg-red-500 rounded-md hover:bg-red">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        fill="none" viewBox="0 0 24 24" 
                        stroke-width="1.5" stroke="currentColor" 
                        class="w-5 h-5 -mt-1 inline-block">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>

                    Delete Survey
                </Button>
            </div>
        </template>
        <div v-if="surveyLoading" class="flex justify-center">Loading...</div>
        <form v-else @submit.prevent="saveSurvey" class="animate-fade-in-down">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
                <!-- Survey fields -->
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <!-- <pre>{{ model }}</pre> -->
                    <!-- image -->
                    <div class="class">
                        <label for="" class="block text-sm font-medium text-gray-700">
                            Image
                        </label>
                        <div class="mt-1 flex items-center">
                            <img
                                v-if="model.image_url"
                                :src="model.image_url"
                                :alt="model.title"
                                class="w-64 h-48 object-cover"
                            />
                            <span
                                v-else
                                class="
                                flex
                                items-center
                                justify-center
                                h-12
                                w-12
                                rounded-full
                                overflow-hidden
                                bg-gray-100
                                "
                            >
                           
                                <svg class="h-[80%] w-[80%] text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                
                            </span>
                            <button
                                type="button"
                                class="
                                    relative
                                    overflow-hidden
                                    ml-5
                                    bg-white
                                    py-2
                                    px-3
                                    border border-gray-300
                                    rounded-md
                                    shadow-sm
                                    text-sm
                                    leading-4
                                    font-medium
                                    text-gray-700
                                    hover:bg-gray-50
                                    focus:outine-none
                                    focus:ring-2
                                    focus:ring-offset-2
                                    focus:ring-indigo-500
                                "
                            >
                            <input type="file"
                                @change="onImageChoose"
                                class="
                                absolute
                                left-0
                                top-0
                                right-0
                                bottom-0
                                opacity-0
                                cursor-pointer">
                                Change
                            </button>
                        </div>
                    </div>
                    <!-- title -->
                    <div class="class">
                        <lable for="title" class="block text-sm font-medium text-gray-700">
                            Title
                        </lable>
                        <input 
                            type="text" 
                            name="title" 
                            id="title"
                            v-model="model.title"
                            autocomplete="survey_title"
                            placeholder="Your Survey Title"
                            class="
                                mt-1
                                focus:ring-indigo-500
                                focus:border-indigo-500
                                block
                                w-full
                                shadow-sm
                                sm:text-sm
                                border-gray-300
                                rounded-md
                            "
                            >
                    </div>
                    <!-- Description -->
                    <div>
                        <label for="about" class="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <div class="mt-1">
                            <textarea 
                                name="description" 
                                id="description" 
                                cols="" 
                                rows="3"
                                v-model="model.description"
                                autocomplete="survey_description"
                                class="
                                    shadow-sm
                                    focus:ring-indigo-500 focus:border-indigo-500
                                    mt-1
                                    block
                                    w-full
                                    sm:text-sm
                                    border border-gray-300
                                    rounded-md
                                "
                                placeholder="Describe your survey"
                                >

                            </textarea>
                        </div>
                    </div>

                    <!-- Expire Date -->
                    <div>
                        <label
                            for="expire_date"
                            class="block text-sm font-medium text-gray-700"
                        >
                        Expire Date
                        </label>
                        <input type="date" 
                            name="expire_date"
                            id="expire_date"
                            v-model="model.expire_date"
                            class="
                                mt-1
                                focus:ring-indigo-500
                                focus:border-indigo-500
                                block
                                w-full
                                shadow-sm
                                sm:text-sm
                                border-gray-300
                                rounded-md
                            "
                        />
                    </div>
                    <!-- Status -->
                    <div class="flex items-start">
                        <div class="flex items-center h-5">
                            <input
                                id="status" 
                                type="checkbox" 
                                name="status"
                                v-model="model.status"
                                class="
                                    focus:ring-indigo-500
                                    h-4
                                    w-4
                                    text-indigo-600
                                    border-gray-300
                                    rounded
                                "
                            />
                        </div>

                        <div class="ml-3 text-sm">
                            <label for="status" class="font-medium text-gray-700">
                                Active
                            </label>
                        </div>
                    </div>
                </div>
                <!-- Survey fields end -->

                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <h3 class="text-2xl font-semibold flex items-center justify-between">
                        Questions

                        <button
                            type="button"
                            @click="addQuestion()"
                            class="
                                flex
                                items-center
                                text-sm
                                py-1
                                px-4
                                rounded-sm
                                text-white
                                bg-gray-600
                                hover:bg-gray-700
                            "
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke-width="1.5" 
                                stroke="currentColor" 
                                class="w-4 h-4 -mt-1 inline-block"
                                >
                                <path stroke-linecap="round" 
                                stroke-linejoin="round" 
                                d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add Question
                        </button>
                    </h3>

                    <div v-if="!model.questions.length" class="text-center text-gray-600">
                        You don't have any questions created
                    </div>

                    <div v-for="(question, index) in model.questions" 
                    :key="question.id">
                        <QuestionEditor
                            :question="question"
                            :index="index"
                            @change="questionChange"
                            @addQuestion="addQuestion"
                            @deleteQuestion="deleteQuestion"
                        />
                    </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button type="submit" class="
                        inline-flex
                        justify-center
                        py-2
                        px-4
                        border border-transparent
                        shadow-sm
                        text-sm
                        font-sm
                        font-medium
                        rounded-md
                        text-white
                        bg-indigo-600
                        hover:bg-indigo-700
                        focus:outline-none
                        focus:ring-2 
                        focus:ring-offset-2
                        focus:ring-indigo-500   
                    ">
                        Save
                    </button>
                </div>
            </div>
        </form>
    </PageComponent>
</template>

<script setup>
    import {v4 as uuidv4} from 'uuid'
    import store from '../store';
    import { ref, watch, computed} from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    import PageComponent from '../components/PageComponent.vue';
    import QuestionEditor from  '../components/editor/QuestionEditor.vue'

    const route = useRoute();
    const router = useRouter();

    const surveyLoading = computed(() => store.state.currentSurvey.loading);

    //Create empty survey
    let model = ref({
       
        title: "",
        status: false,
        description: null,
        image: null,
        image_url: null,
        expire_date: null,
        questions: [],
        
    });

        // Watch to current survey data change and when this happens we update local model
    watch(
        () => store.state.currentSurvey.data,
        (newVal, oldVal) => {
            model.value = {
            ...JSON.parse(JSON.stringify(newVal)),
            status: newVal.status !== "draft",
            // status: !!newVal.status,
            };
        }
    );

    // If the current component is rendered on survey update route we make a request to fetch survey


    if(route.params.id){
        //get a particular survey
        // model.value = store.state.surveys.find(
        //     //where the survey has the same id as the id in the parameter passed
        //     (s) => s.id === parseInt(route.params.id)
        // );

        store.dispatch('getSurvey', route.params.id);
    }

    function onImageChoose(img){
        const file = img.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
          // The field to send on backend and apply validations
          model.value.image = reader.result;  

          //The filed to display here
          model.value.image_url = reader.result;  
        }
        reader.readAsDataURL(file);
    }

    function addQuestion(index){
        const newQuestion = {
            id: uuidv4(),
            type: "text",
            question: "",
            description: null,
            data: {},
        }

        //add newQuestion at index and remove nothng {0}
        model.value.questions.splice(index, 0, newQuestion);
    }

    function deleteQuestion(question){
       model.value.questions = model.value.questions.filter(
        (q) => q.id !== question.id
       ); 
    }

    function questionChange(question){
        model.value.questions = model.value.questions.map((q) => {
            // if a question id equals the question id passed in 
            // the function that means the question is about to be changed 
            // so assign the changes to it with the return
            if(q.id === question.id){
                //To avoid any kind of reference changes in future we rap it inside bJSON.stringify and parse to JSON.parse
                return JSON.parse(JSON.stringify(question));
            }
            //else return the original
            return q;
        });
    }

    function saveSurvey(){
        store.dispatch("saveSurvey", model.value).then(({ data }) => {
            store.commit('notify', {
                type: 'success',
                message: 'Survey was successfully inserted'
            });
            router.push({
                name: "SurveyView",
                params: {id: data.data.id},
            });
        });
    }

    function deleteSurvey(){
        if(
            confirm(`Are you sure you want to delete this survey? Operation can't be undone`)
        ){
            store.dispatch("deleteSurvey", model.value.id).then(() =>{
                router.push({
                    name: "Surveys",
                });
            });
        }
    }
</script>

<style>
   
</style>