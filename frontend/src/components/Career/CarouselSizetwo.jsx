import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

export function CarouselSize({ persons = [] }) {
  const [api, setApi] = React.useState(null);
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api || persons.length === 0) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    const unsubscribe = api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    return () => {
      clearInterval(interval);
      unsubscribe?.();
    };
  }, [api, persons]);

  return (
    <div className="flex justify-center items-center h-[70%]">
      <Carousel
        opts={{ align: "center", loop: true }}
        setApi={setApi}
        className="w-[70%] relative z-10"
      >
        <CarouselContent>
          {persons.slice(0, 5).map((person, index) => (
            <CarouselItem
              key={index}
              className={`md:basis-1/2 lg:basis-1/3 transition-all duration-500 transform ${
                current === index ? "scale-110 z-20" : "scale-90 opacity-60"
              }`}
            >
              <div className="p-1">
                <Card className="overflow-hidden">
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <img
                      src={person.profileImage || "/default.jpg"}
                      alt={`Counsellor ${index + 1}`}
                      className="w-full h-[200px] object-cover rounded-xl mb-2"
                    />
                    {current === index && (
                      <p className="text-center text-base font-semibold text-blue-700 transition-opacity duration-300">
                        {person.name || "Unknown"}
                      </p>
                    )}
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
