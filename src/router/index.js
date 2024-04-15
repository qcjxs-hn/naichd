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
        },
        {
            path:'ncdd',
            name:'Ncdd',
            component:()=>import("../views/Ncddpage.vue")
        },
        {
            path:'ncgg',
            name:'Ncgg',
            component:()=>import("../views/Ncggpage.vue")

        },
        {
            path:'ncpl',
            name:'Ncpl',
            component:()=>import("../views/Ncplpage.vue")
        },
        {
            path:'ncsp',
            name:'Ncsp',
            component:()=>import("../views/Ncsppage.vue")
        },
        {
            path:'storeinfo',
            name:'Storeinfo',
            component:()=>import("../views/Storeinfopage.vue")
        },{
            path:'dystore',
            name:'Dystore',
            component:()=>import("../views/Storedypage.vue")
        },{
            path:'yhj',
            name:'Yhj',
            component:()=>import("../views/Yhjpage.vue")
        },{
            path:'gn',
            name:'Gn',
            component:()=>import("../views/Gnpage.vue")
        },{
            path:'mygn',
            name:'Mygn',
            component:()=>import("../views/Mygnpage.vue")
        },{
            path:'indexqyl',
            name:'Indexqyl',
            component:()=>import("../views/Indexqylpage.vue")
        },{
            path:'wj'
            ,name:'Wj',
            component:()=>import("../views/Wjpage.vue")
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
    },{
        path:"/dpbd",
        name:"Dpbd",
        component:()=>import("../views/Dpbdpage.vue"),
    }
]
const router=createRouter({
    history:createWebHistory(process.env.BASE_URL),
    routes
})
export default router;