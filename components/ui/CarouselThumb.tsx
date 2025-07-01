import React from "react";

type PropType = {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export const CarouselThumb: React.FC<PropType> = (props) => {
  const { selected, onClick, children } = props;

  return (
    <div className="h-full">
      <button
        onClick={onClick}
        type="button"
        className="ring-offset-background focus-visible:ring-ring relative flex h-full w-full cursor-pointer overflow-hidden rounded-md transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <div
          className={`absolute inset-0 rounded-md transition-all ${
            selected
              ? "ring-primary ring-2 ring-offset-2 ring-offset-black"
              : "opacity-50 hover:opacity-75"
          }`}
        />
        {children}
      </button>
    </div>
  );
};
