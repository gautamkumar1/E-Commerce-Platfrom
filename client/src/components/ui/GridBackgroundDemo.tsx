import React from "react";
import { Cover } from "./cover";
import { AnimatedTooltipPreview } from "./AnimatedTooltipComponent";

export function GridBackgroundDemo() {
  return (
    <div className="h-[50rem] w-full relative flex items-center justify-center bg-black bg-grid-white/[0.2]">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute inset-0 pointer-events-none bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      <div className="relative z-20 text-center">
        <p className="text-4xl font-bold sm:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
          Discover and <Cover className="text-white">Sell Unique</Cover> Products
        </p> 

        {/* Add AnimatedTooltipPreview here */}
        <div className="my-8">
          <AnimatedTooltipPreview />
          
          <p className="text-lg sm:text-xl text-gray-300 mt-4">
            Trusted by 27,000+ sellers
          </p>
        </div>

        <p className="text-lg sm:text-xl text-gray-300 mb-8">
          Join our vibrant marketplace and connect with a global community of buyers and sellers. <br />Showcase your unique products and grow your business.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Become a Seller
          </button>
          <button className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700">
            Explore Products
          </button>
        </div>
      </div>
    </div>
  );
}
