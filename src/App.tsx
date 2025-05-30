import SideBar from './containers/SideBar/sidebar'
import GlobalStyle, { Container } from './styles'
import TaskList from './containers/TaskList/task-list'
import { Provider } from 'react-redux'

import store from './store'

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Container>
        <SideBar />
        <TaskList />
      </Container>
    </Provider>
  )
}

export default App
