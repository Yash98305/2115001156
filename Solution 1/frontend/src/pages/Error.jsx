import Body from "../Layout/Body.jsx";
import ErrorPage from "../components/main pages/ErrorPage.jsx"
import Animate from "../Animate.jsx";

const Error = () => {

  return (
    <>
    <Animate app={<Body obj={<ErrorPage/>}/>}/>
    </>
    
  );
};

export default Error;
