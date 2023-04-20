import { Button, Container, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';


export default function NavBar() {

  function scrollUp() {
    window.scroll({
      top: 0,
      left: 0,
    })
  }

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} to='/' onClick={scrollUp} header>
          <img src='/assets/logo.png' alt="logo" id='logo' />
          Reactivities
        </Menu.Item>
        <Menu.Item as={NavLink} to='/activities' name="Activities" />
        <Menu.Item>
          <Button as={NavLink} to='/createActivity' onClick={scrollUp} positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  )
}