import testComponent1 from "@/components/list/testComponent1"
import testComponent2 from "@/components/list/testComponent2"
import testComponent3 from "@/components/list/testComponent3"

const components = [
  testComponent1, testComponent2, testComponent3
]

const install = (Vue = {}) => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default install