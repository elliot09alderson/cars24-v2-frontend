import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "../../../../lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  const initialValue = Array.isArray(props.value)
    ? props.value
    : [props.min, props.max];

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full  ">
        <SliderPrimitive.Range className="absolute h-full bg-primary bg-gray-300 rounded-full" />
      </SliderPrimitive.Track>
      {initialValue.map((value, index) => (
        <React.Fragment key={index}>
          <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-400 border-gray-500" />
        </React.Fragment>
      ))}
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export default function PriceRangeSlider({
  localValues,
  setLocalValues,
  heading,
  min,
  measurementText,
  max,
}) {
  const handleValueChange = (newValues: any) => {
    setLocalValues(newValues);
  };

  return (
    <div className="grid gap-4 p-4 w-full max-w-80 bg-white border border-[#14424C]/20 rounded-[12px] my-4">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {heading}
      </label>
      <Slider
        defaultValue={[localValues[0], localValues[1]]}
        // minStepsBetweenThumbs={10_000}
        max={max}
        min={min}
        step={1}
        onValueChange={handleValueChange}
        className={cn("w-full")}
      />
      <div className="flex gap-2 flex-wrap">
        <ol className="flex items-center w-full gap-3">
          {localValues.map((_, index) => (
            <li
              key={index}
              className="flex items-center justify-between w-full border px-3 h-10 rounded-md"
            >
              <span>{measurementText}</span>
              <span>{localValues[index]}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
