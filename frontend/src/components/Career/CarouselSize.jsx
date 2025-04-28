import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

export function CarouselSize() {
  const [api, setApi] = React.useState(null);

  const images = [
    "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
    "https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg",
    "https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg",
    "https://media.istockphoto.com/id/997461858/photo/attractive-young-man-in-blue-t-shirt-pointing-up-with-his-finger-isolated-on-gray-background.jpg?s=612x612&w=0&k=20&c=70pkYuhz65EqNOB9qI5JSDXNbQUwGLxKTCgsSWoy4kM=",
    "https://img.freepik.com/free-photo/young-pretty-woman-with-melancholy-face-expression-orange-blouse-isolated-sad-emotion_285396-939.jpg?semt=ais_hybrid&w=740",
  ];

  const personNames = [
    "Mr. Chandra Shekhara Prasad",
    "Mr. Aditya Kumar Nayak",
    "Mr. Malay Ranjan Soy",
    "Mr. Sailendra Sign",
    "Mr. Nilakanta Sahoo"
  ];

  React.useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();  // Move to the next slide
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Clean up
  }, [api]);

  return (
    <div className="flex justify-center items-center h-[70%]">
      <Carousel
        opts={{
          align: "start",
          loop: true
        }}
        setApi={setApi}
        className="w-[70%]  relative z-10"  // Increase max width for bigger images
      >
        <CarouselContent >
          {images.map((imgUrl, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-4 hover:cursor-pointer ">
                    <img
                      src={imgUrl}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-auto rounded-xl mb-2"
                    />
                    <p className="text-center text-base font-medium">
                      {personNames[index]}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
