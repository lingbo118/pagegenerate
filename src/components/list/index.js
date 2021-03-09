import testComponent1 from "./testComponent1"
import pgTable from "./pg-table"

const components = [
  testComponent1, pgTable
]

const install = (Vue = {}) => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default install