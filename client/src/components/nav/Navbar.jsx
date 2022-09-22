import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'

const MainNavbar = () => {
    return (
        <Navbar bg='light' expand='lg'>
            <Container fluid>
                <Navbar.Brand as={Link} to='/'>
                    Navbar scroll
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='navbarScroll' />
                <Navbar.Collapse id='navbarScroll'>
                    <Nav className='me-auto my-2 my-lg-0' style={{ maxHeight: '100px' }} navbarScroll>
                        <Nav.Link as={Link} to='/'>
                            Home
                        </Nav.Link>
                        <Nav.Link>Link</Nav.Link>
                        {/* <NavDropdown title='Link' id='navbarScrollingDropdown'>
                                                        <NavDropdown.Item href='#action3'>Action</NavDropdown.Item>
                                                        <NavDropdown.Item href='#action4'>Another action</NavDropdown.Item>
                                                        <NavDropdown.Divider />
                                                        <NavDropdown.Item href='#action5'>Something else here</NavDropdown.Item>
                                                </NavDropdown>
                                                <Nav.Link href='#' disabled>
                                                        Link
                                                </Nav.Link> */}
                    </Nav>
                    <Form className='d-flex'>
                        <Button variant='outline-primary' as={Link} to='/auth/signin'>
                            Sign in
                        </Button>
                        <Button variant='outline-primary' as={Link} to='/auth/signup'>
                            Sign up
                        </Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MainNavbar
