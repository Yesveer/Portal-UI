"use client";
import { WobbleCard } from "~/components/ui/wobble-card";

interface WobbleCardOverviewProps {
    data: {
      title: string;
      description: string;
      image: string;
    };
  }
  
export function WobbleCardOverview({ data }: WobbleCardOverviewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl m-5">
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            {data.title}
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            {data.description}
          </p>
        </div>
        <img
          src={data.image}
          width={500}
          height={500}
          alt="linear demo img"
          className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
    </div>
  );
}
