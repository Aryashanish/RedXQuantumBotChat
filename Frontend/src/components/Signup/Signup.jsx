import {useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import singImg from "../../Image/sign-up-form.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  function clickHandler(e) {
    setUser((lastvalue) => {
      return {
        ...lastvalue,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function userRegister(e) {
    e.preventDefault();
    axios.post("http://localhost:8000/user/signup", user)
      .then((res) => {
        if(res.status === 201)
          navigate("/login");
        else {
          setFlag(false)
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/signup");
      })
  }

  return (
    <>
      {flag ? <h1 className="w-4/3 p-2 m-4 text-center mt-4 text-2xl bg-green-100 rounded-lg font-semibold">Something Went Wrong , Try Again</h1> : ""}
      <div className="w-full h-auto">
        <div className="w-3/5 mx-auto my-9 p-5 flex justify-center shadow-2xl rounded-lg">
          <div className="w-1/2 h-3/2 rounded-lg">
            <img
              className="bg-center object-fill w-full"
              src={singImg}
              alt=""
            ></img>
          </div>
          <div className="p-2">
            <h1 className="text-center font-semibold text-2xl mt-4">
              <h2 className=" text-red-500">Hello!</h2>
              <h4>Welcome to Blogify! </h4>
            </h1>
            <form className="mt-5" onSubmit={userRegister}>
              <label className="font-semibold">Email </label>
              <Input
                type="email"
                placeholder="Enter Your Email"
                name="email"
                onChange={clickHandler}
              />{" "}
              <br></br>
              <label className="font-semibold">Password </label>
              <Input
                type="password"
                placeholder="Enter Your Password"
                name="password"
                onChange={clickHandler}
              />
              <br></br>
              <Button value="Register" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
