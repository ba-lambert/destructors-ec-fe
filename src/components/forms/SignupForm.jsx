import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../validations/inputValidation";
import { showErrorMessage, showSuccessMessage } from "../../utils/toast";
import { signup } from "../../redux/reducers/signupSlice";
import InputField from "./InputField";
import Button from "./Button";

/* eslint-disable no-restricted-syntax */
function SignupForm () {
  const { isLoading } = useSelector((state) => state.signup);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const onSubmit = async (userData) => {
    try {
      const response = await dispatch(signup(userData)).unwrap();
      showSuccessMessage("Successfully Registered");
    } catch (error) {
      showErrorMessage(error.data.message);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <form
        onSubmit={(event) => {
          handleSubmit(onSubmit)(event);
        }}
        className='my-8 px-5'
      >
        <div className='flex flex-col -space-y-px rounded-md shadow-sm'>
          <div>
            <InputField
              placeholder='firstname'
              type='text'
              className=' w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EAF0F7]'
              {...register("firstname")}
              error={errors.firstname}
            />
          </div>
          <div>
            <InputField
              placeholder='lastname'
              type='text'
              className=' w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EAF0F7]'
              {...register("lastname")}
              error={errors?.lastname}
            />
          </div>
          <div>
            <InputField
              placeholder='exampleemail@gmail.com'
              type='text'
              className=' w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EAF0F7]'
              {...register("email")}
              error={errors?.email}
            />
          </div>
          <div className=' relative'>
            <InputField
              placeholder='Password'
              type={showPassword ? "text" : "password"}
              className=' w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EAF0F7]'
              {...register("password")}
              error={errors?.password}
            />
            <div
              onClick={handleClickShowPassword}
              className=' absolute right-4 top-4'
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </div>
          </div>
          <div>
            {isLoading ? (
              <>
                <Button type='submit' label='' className='' disabled={true}>
                  <svg
                    role='status'
                    className='inline mr-3 w-4 h-4 text-white animate-spin'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='#E5E7EB'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='currentColor'
                    />
                  </svg>
                </Button>
              </>
            ) : (
              <Button type='submit' label='Signup' className='my-1' />
            )}
          </div>
        </div>
      </form>
    </>
  );
}

export default SignupForm;
