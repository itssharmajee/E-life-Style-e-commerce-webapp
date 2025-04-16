import CommonForm from "@/components/common/form";
import { loginFormControls, registerFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/authSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(e){
    e.preventDefault();// this will stop default behaviour of the form

    dispatch(loginUser(formData)).then((data)=>{
      // console.log(data);
      if(data?.payload?.success){
        toast({
          title:data?.payload?.message,
        })
      }else{
        toast({
          title:data?.payload?.message,
          variant:'destructive'
        })
      }
      
    })
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome to Elife Style
        </h1>
        <p className="mt-2">
          create an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Signup
          </Link>
        </p>
      </div>
      <CommonForm
      formControls={loginFormControls}
      buttonText={'Log In'}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      />
    </div>
  );
}

export default Login;



