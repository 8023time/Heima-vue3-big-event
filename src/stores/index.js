import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia

// import { UseUserStore } from './modules/user'
// export {UseUserStore}

export * from './modules/user' // 在这里就可以实现的是同意导入一些东西并且统一导出全部的东西,就可以不用写的像上面的那样的麻烦