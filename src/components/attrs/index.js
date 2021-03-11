import pgTableAttr from "./pg-table-attr"
import pgButtonAttr from "./pg-button-attr"

const components = [
  pgTableAttr,
  pgButtonAttr
]

const install = (Vue = {}) => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default install