import { User } from "@/models/user";

export default {
  namespaced: true,
  state: {
    user: {}
  },
  mutations: {
    setUser (state: any, user: User) {
      state.user = user
    }
  }
}