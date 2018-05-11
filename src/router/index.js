import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Kegiatan from '@/components/kegiatan/Index'
import Show from '@/components/kegiatan/Show'
import Peserta from '@/components/peserta/Index'
import Jadwal from '@/components/jadwal/Index'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'HelloWorld', component: HelloWorld },
    { path: '/kegiatan', name: 'Kegiatan', component: Kegiatan },
    { path: '/kegiatan/:id', name: 'Show', component: Show },
    { path: '/peserta', name: 'Peserta', component: Peserta },
    { path: '/jadwal', name: 'Jadwal', component: Jadwal },
  ]
})
