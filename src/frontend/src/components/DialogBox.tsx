import { MouseEventHandler } from "react";

const DialogBox = ({
  title = "Alert !",
  content,
  hidden,
  onClose,
}: {
  title?: string;
  content?: string;
  hidden: boolean;
  onClose: MouseEventHandler;
}) => {
  return (
    <div
      className={`${
        hidden ? "hidden" : ""
      } w-screen h-screen absolute top-0 left-0 bg-gray-500 bg-opacity-70 flex items-center justify-center`}
    >
      <div className="flex flex-col w-80 h-40 p-3 bg-white rounded-lg overflow-hidden -translate-y-1/2">
        <p className="mb-1 max-w-max font-medium text-lg tracking-wide">
          {title}
        </p>
        <p className="flex-1 max-w-max text-gray-500">{content}</p>
        <div className="flex justify-end items-end">
          <button
            className="rounded text-white font-semibold bg-cyan-600 px-3 py-2"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
