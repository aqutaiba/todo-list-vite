import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { TitleSchema, TitleSchemaType } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

const showErrorToast = (msg: string) =>
  toast.error(msg, {
    position: "bottom-center",
  });

type InputFieldProps = {
  onActionExecute: (inputValue: string) => void;
  submitButtonText: string;
  customSubmitStyle?: string;
  defaultValue?: string;
};

const InputField: React.FC<InputFieldProps> = ({
  onActionExecute,
  submitButtonText,
  defaultValue = "",
  customSubmitStyle = "",
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TitleSchemaType>({ resolver: zodResolver(TitleSchema) });

  useEffect(() => {
    if (!!errors?.title) showErrorToast(errors.title?.message || "");
  }, [errors.title]);

  const onSubmit = ({ title }: TitleSchemaType) => {
    onActionExecute(title.trim());
    reset();
  };

  return (
    <form className="flex-1 justify-center" onSubmit={handleSubmit(onSubmit)}>
      <input
        className={`w-1/2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 bg-inherit text-white ${
          Object.keys(errors).length !== 0 && "error_with_animation"
        }`}
        type="text"
        placeholder="title"
        {...register("title", { value: defaultValue, required: true, min: 3 })}
      />
      <input
        title={submitButtonText}
        className={`mx-3  bg-blue-500 hover:bg-blue-700 text-white py-2 px-5 rounded-lg ${customSubmitStyle}`}
        type="submit"
      />
    </form>
  );
};

export default InputField;
