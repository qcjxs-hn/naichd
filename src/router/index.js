import { createRouter,createWebHistory } from "vue-router";

const routes=[
    {
        path:"/",
        name:"HomePage",
        component:()=>import("../home/Home.vue"),
        redirect:'/sy',
        children:[
        {
            path:"home",
            name:"Home",
            component:()=>import("../views/Homepage.vue"),
      
        },
        {
            path:'user',
            name:'User',
            component:()=>import("../views/Userpage.vue")
        }
        ]
    },
    {
        path:"/sy",
        name:"Sy",
        component:()=>import("../views/Sy.vue"),
    },
    {
        path:"/login",
        name:"Login",
        component:()=>import("../views/Login.vue"),
    },{
        path:"/hqxx",
        name:"Hqxx",
        component:()=>import("../views/Hqxx.vue"),
    }
]
const router=createRouter({
    history:createWebHistory(process.env.BASE_URL),
    routes
})
export default router;