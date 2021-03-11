import pgButton from "./pg-button"
import pgTable from "./pg-table"

const components = [
  pgButton, pgTable
]

const install = (Vue = {}) => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default install