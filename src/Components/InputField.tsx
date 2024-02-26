import React from "react";
import toast from "react-hot-toast";

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
  const [inputValue, setInputValue] = React.useState<string>(defaultValue);
  const [hasError, setHasError] = React.useState<boolean>(false);

  const onSubmit = () => {
    if (inputValue.trim() && inputValue.trim().length >= 3) {
      onActionExecute(inputValue.trim());
      setInputValue("");
      setHasError(false);
    } else {
      showErrorToast("Please enter a valid input (at least 3 characters).");
      setHasError(true);
    }
  };

  return (
    <div className="flex-1 justify-center">
      <input
        className={`w-1/2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 bg-inherit text-white ${
          hasError && inputValue.trim().length < 3 && "element_with_animation"
        }`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className={`mx-3  bg-blue-500 hover:bg-blue-700 text-white py-2 px-5 rounded-lg ${customSubmitStyle}`}
        onClick={onSubmit}
      >
        {submitButtonText}
      </button>
    </div>
  );
};

export default InputField;
