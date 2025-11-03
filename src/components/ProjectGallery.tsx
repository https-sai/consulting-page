"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface GalleryItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string;
}

interface Gallery6Props {
  heading?: string;
  demoUrl?: string;
  items?: GalleryItem[];
}

const Gallery6 = ({
  heading = "Freelance Work",
  demoUrl = "https://www.shadcnblocks.com",
  items = [
    {
      id: "item-1",
      title: "Build Modern UIs",
      summary:
        "Create stunning user interfaces with our comprehensive design system.",
      url: "#",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
    {
      id: "item-2",
      title: "Computer Vision Technology",
      summary:
        "Powerful image recognition and processing capabilities that allow AI systems to analyze, understand, and interpret visual information from the world.",
      url: "#",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
    {
      id: "item-3",
      title: "Machine Learning Automation",
      summary:
        "Self-improving algorithms that learn from data patterns to automate complex tasks and make intelligent decisions with minimal human intervention.",
      url: "#",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
    {
      id: "item-4",
      title: "Predictive Analytics",
      summary:
        "Advanced forecasting capabilities that analyze historical data to predict future trends and outcomes, helping businesses make data-driven decisions.",
      url: "#",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
    {
      id: "item-5",
      title: "Neural Network Architecture",
      summary:
        "Sophisticated AI models inspired by human brain structure, capable of solving complex problems through deep learning and pattern recognition.",
      url: "#",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
  ],
}: Gallery6Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);
  return (
    <section className="py-20">
      <div className="w-full space-y-10 min-w-0">
        <div className="flex flex-col justify-between md:flex-row md:items-end">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tighter lg:text-4xl">
              {heading}
            </h1>
            <a
              href={demoUrl}
              className="group flex items-center gap-1 text-sm font-medium md:text-base lg:text-lg"
            >
              Book a Consultation
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <div className="mt-8 flex shrink-0 items-center justify-start gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
        <div className="w-full max-w-full min-w-0 overflow-visible">
          <Carousel
            setApi={setCarouselApi}
            opts={{
              breakpoints: {
                "(max-width: 768px)": {
                  dragFree: true,
                },
              },
            }}
            className=" relative w-full max-w-full md:left-[-1rem] overflow-visible"
          >
            <CarouselContent className=" hide-scrollbar w-full max-w-full  md:-mr-4 md:ml-8 2xl:ml-[max(8rem,calc(50vw-700px+1rem))] 2xl:mr-[max(0rem,calc(50vw-700px-1rem))]">
              {items.map((item, index) => (
                <CarouselItem
                  key={item.id}
                  className={` flex-shrink-0 !basis-auto pt-6 pb-6 ${
                    index === 0 ? "pl-4 sm:pl-8" : "pl-4"
                  } ${
                    index === items.length - 1
                      ? "pr-4 sm:pr-8 md:pr-8 2xl:pr-[max(8rem,calc(50vw-700px+1rem))]"
                      : ""
                  }`}
                >
                  <Card className="h-full py-0 relative z-10 w-full md:w-[452px]">
                    <CardContent className="p-0">
                      <a
                        href={item.url}
                        className="group flex flex-col justify-between h-full"
                      >
                        <div className="overflow-hidden rounded-t-xl">
                          <div className="aspect-3/2 flex overflow-clip">
                            <div className="flex-1">
                              <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  fill
                                  className="object-cover object-center"
                                  unoptimized
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="px-4 sm:px-6 pt-4">
                          <div className="mb-2 line-clamp-3 break-words text-base sm:text-lg font-medium md:mb-3 md:text-xl lg:text-2xl">
                            {item.title}
                          </div>
                          <div className="text-muted-foreground mb-8 line-clamp-2 text-xs sm:text-sm md:mb-12 md:text-base lg:mb-9">
                            {item.summary}
                          </div>
                          <div className="flex items-center text-xs sm:text-sm pb-6">
                            Read more{" "}
                            <ArrowRight className="ml-2 size-4 sm:size-5 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </a>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export { Gallery6 };
