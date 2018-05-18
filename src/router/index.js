import Vue from 'vue'
import Router from 'vue-router'

import User from '@/components/user/Index'

import Home from '@/components/Home'
import Login from '@/components/auth/Login'
import Kegiatan from '@/components/kegiatan/Index'
import Show from '@/components/kegiatan/Show'
import Peserta from '@/components/peserta/Index'
import Jadwal from '@/components/jadwal/Index'
import Imtas from '@/components/imtas/Index'

Vue.use(Router)

export default new Router({
  routes: [    
    { path: '/', name: 'Home', component: Home, meta: { forAuth: false, forVisitors:true} },
    { path: '/login/:abbr', name: 'Login', component: Login, meta: { forAuth: false, forVisitors:true} },
    { path: '/user', name: 'Pengguna', component: User, meta: { forAuth: false, forVisitors:true} },
    { path: '/kegiatan', name: 'Kegiatan', component: Kegiatan, meta: { forAuth: true, forVisitors:false} },
    { path: '/kegiatan/:id', name: 'Show', component: Show },
    { path: '/peserta', name: 'Peserta', component: Peserta },
    { path: '/jadwal', name: 'Jadwal', component: Jadwal },
    { path: '/imtas', name: 'Pelaksanaan', component: Imtas },
  ]
})
