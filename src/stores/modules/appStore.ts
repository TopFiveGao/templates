import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useAppStore = defineStore('app', ()=>{
    const appName = ref('vue')

    return {
        appName
    }
})