import React from 'react'
import Button from "react-bootstrap/Button";
import { Link} from "react-router-dom";
import errorImg from "../../assets/images/global/error.png"

function ErrorPage() {
  return (
    <div className="text-center">
      <img className="w-3/4  mx-auto" src={errorImg} alt="errorimage" />
      <h3>Page not found</h3>
      <p>
        Oops! Looks like you followed a bad link. If you think this is a problem
        with us, please tell us.
      </p>
      <Link to='/' >
       <Button variant="primary">Go back home</Button>
      </Link>
    </div>
  );
}

export default ErrorPage