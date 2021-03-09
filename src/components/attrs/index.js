import pgTableAttr from "./pg-table-attr"

const components = [
  pgTableAttr
]

const install = (Vue = {}) => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default install