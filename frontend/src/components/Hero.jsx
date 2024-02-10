import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Hero = () => {
  return (
    <div className='py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column aling-items-center hero-card bg-light w-75'>
          <h1>MERN Authentication</h1>
          <p>
            This is a Project for MERN Authentication that store a jwt in an
            HTTP-Only cookie
          </p>
          <div className='d-flex'>
            <LinkContainer to={"/login"}>
              <Button className='me-3' variant='primary'>
                Sign In
              </Button>
            </LinkContainer>
            <LinkContainer to={"/register"}>
              <Button className='me-3' variant='secondary'>
                Register
              </Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
