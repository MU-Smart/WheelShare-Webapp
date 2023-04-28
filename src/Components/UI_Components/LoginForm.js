const LoginForm = (props) => {
  const onCreateAccountClick = () => {
    props.setShowLoginOveray(false);
  };

  return (
    <div className="fixed w-full h-full bg-slate-900 z-10 opacity-90 flex flex-col justify-center items-center">
      <button class="btn btn-square btn-outline absolute right-0 top-0 mr-4 mt-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <label className="label flex flex-col">
        <span className="label-text font-semibold text-4xl">Welcome Back</span>
        <span className="label-text font-medium">
          Sign in to MyPath WheelShare
        </span>
      </label>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">What is your email?</span>
        </label>
        <input
          type="text"
          placeholder="abc@xyz.com"
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Please input your password</span>
        </label>
        <input
          type="text"
          placeholder="my-secret-password"
          className="input input-bordered w-full max-w-xs"
        />
        <label className="label">
          <span className="label-text-alt"></span>
          <span className="label-text-alt">
            Forgot your password? Reset here!
          </span>
        </label>
      </div>

      <button className="btn btn-accent" >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Login
      </button>

      <label className="label flex flex-col">
        <span className="label-text font-medium">
          Dont have an account?{" "}
          <button
            className="underline underline-offset-2"
            onClick={() => onCreateAccountClick()}
          >
            Sign up here{" "}
          </button>
          .
        </span>
      </label>
    </div>
  );
};

export default LoginForm;
