import {Theme } from "vitepress"
import DefaultTheme from "vitepress/theme"
import { useRouter } from "vitepress"
import { h } from "vue"
/**
 * @type {import('vitepress').Theme}
*/
export default {
    extends:DefaultTheme,
    enhanceApp({router,app}) {
        
    },
    Layout(){
        return h(DefaultTheme.Layout,null,{
            "not-found":()=>{
                const router = useRouter()
                router.go("/")
            }
        })
    }
} as Theme