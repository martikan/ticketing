import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import MainNavbar from './components/nav/Navbar'
import routes from './routes'

const App = () => {
    const listOfRoutes = routes.map(({ path, component }, i) => <Route path={path} key={i} element={component} />)

    return (
        <Container fluid='md'>
            <MainNavbar />
            <Routes>{listOfRoutes}</Routes>
        </Container>
    )
}

export default App
