import { useForm } from "react-hook-form";

const SignUpForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignInClick = () => {
    props.setShowSignUpOverlay(false);
    props.setShowLoginOverlay(true);
  };

  const onLoginClick = (data) => {
    console.log(data);
  };

  const onCloseClick = () => {
    props.setShowSignUpOverlay(false);
  };

  return (
    <div className="fixed w-full h-full bg-slate-900 z-10 opacity-90 flex flex-col justify-center items-center">
      <button
        className="btn btn-square btn-outline absolute right-0 top-0 mr-4 mt-4"
        onClick={() => onCloseClick()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <label className="label flex flex-col">
        <span className="label-text font-semibold text-4xl">
          Let's Create An Account
        </span>
        <span className="label-text font-medium">
          Create an account to have full access to MyPath
        </span>
      </label>

      <form
        className="form-control w-full max-w-xs"
        onSubmit={handleSubmit(onLoginClick)}
      >
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          {...register("name")}
        />

        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="text"
          placeholder="abc@xyz.com"
          className="input input-bordered w-full max-w-xs"
          {...register("email", {
            required: "Please enter an email",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please enter a valid email",
            },
          })}
        />
        {errors.email && (
          <label className="label">
            <span className="label-text text-red-600 font-semibold">
              Please enter a valid email
            </span>
          </label>
        )}

        <div className="w-full max-w-xs">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            className="input input-bordered w-full max-w-xs"
            {...register("password")}
          />
        </div>

        <div className="w-full max-w-xs">
          <label className="label">
            <span className="label-text">Age</span>
          </label>
          <input
            type="number"
            min={1}
            max={100}
            {...register("age")}
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <div className="w-full max-w-xs mb-3.5">
          <label className="label">
            <span className="label-text">Gender</span>
          </label>
          <select className="select select-bordered w-full max-w-xs" {...register("gender")}>
            <option selected>
              Male
            </option>
            <option>Female</option>
            <option>Do Not Wish to Disclose</option>
          </select>
        </div>

        <button type="submit" className="btn btn-accent">
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
          Create Account
        </button>
      </form>

      <label className="label flex flex-col">
        <span className="label-text font-medium">
          Already have an account?{" "}
          <button
            className="underline underline-offset-2"
            onClick={() => onSignInClick()}
          >
            Sign in here{" "}
          </button>
          .
        </span>
      </label>
    </div>
  );
};

export default SignUpForm;
