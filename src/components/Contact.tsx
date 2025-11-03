"use client";
import { useState, useMemo } from "react";
import { Phone, Mail, Linkedin, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { LayoutGroup } from "framer-motion";

const Contact = () => {
  const [isPhoneHovered, setIsPhoneHovered] = useState(false);
  const [isCalendlyHovered, setIsCalendlyHovered] = useState(false);
  const [isLinkedInHovered, setIsLinkedInHovered] = useState(false);

  // Memoize grid positions to avoid unnecessary re-renders
  const gridPositions = useMemo(() => {
    return {
      phone: isLinkedInHovered
        ? "sm:col-start-1 sm:row-start-1"
        : isCalendlyHovered
        ? "sm:col-start-1 sm:row-start-1"
        : isPhoneHovered
        ? "sm:col-span-2 sm:col-start-1 sm:row-start-1"
        : "sm:col-start-1 sm:row-start-1",
      email: isLinkedInHovered
        ? "sm:col-start-2 sm:row-start-1"
        : isCalendlyHovered
        ? "sm:row-span-2 sm:col-start-2 sm:row-start-1"
        : isPhoneHovered
        ? "sm:col-start-2 sm:row-start-2"
        : "sm:row-span-2 sm:col-start-2 sm:row-start-1",
      linkedin: isLinkedInHovered
        ? "sm:col-span-2 sm:col-start-1 sm:row-start-2"
        : isCalendlyHovered
        ? "sm:col-start-1 sm:row-start-2"
        : "sm:row-span-2 sm:col-start-1 sm:row-start-2",
      calendly:
        isLinkedInHovered || isCalendlyHovered
          ? "sm:col-span-2 sm:col-start-1 sm:row-start-3"
          : "sm:col-start-2 sm:row-start-3",
    };
  }, [isPhoneHovered, isCalendlyHovered, isLinkedInHovered]);

  return (
    <div className="w-full max-w-7xl">
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center px-4 sm:px-8 md:pl-12 lg:pl-20">
        <div className="flex-[2]">
          <LayoutGroup>
            <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-auto sm:grid-rows-3 gap-4">
              <Card
                layout
                transition={{
                  layout: {
                    duration: 0.8,
                    type: "spring",
                    stiffness: 300,
                    damping: 35,
                  },
                }}
                className={`hover:bg-blue-400/50 hover:[box-shadow:inset_0_-2px_0_0_rgb(255,255,255),inset_-2px_0_0_0_rgb(255,255,255)] transition-colors ${gridPositions.phone}`}
                onMouseEnter={() => setIsPhoneHovered(true)}
                onMouseLeave={() => setIsPhoneHovered(false)}
              >
                <CardContent className="flex items-start gap-4 pt-6 min-w-0">
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6 mt-1 flex-shrink-0" />
                  <div className="flex flex-col min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-semibold mb-1">
                      Phone
                    </h3>
                    <a
                      href="tel:+1234567890"
                      className="text-muted-foreground hover:underline break-words"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card
                layout
                transition={{
                  layout: {
                    duration: 0.8,
                    type: "spring",
                    stiffness: 300,
                    damping: 35,
                  },
                }}
                className={`hover:bg-amber-200/50 hover:[box-shadow:inset_0_-2px_0_0_rgb(255,255,255),inset_-2px_0_0_0_rgb(255,255,255)] transition-colors ${gridPositions.email}`}
              >
                <CardContent className="flex items-start gap-4 pt-6 min-w-0">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 mt-1 flex-shrink-0" />
                  <div className="flex flex-col min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-semibold mb-1">
                      Email
                    </h3>
                    <a
                      href="mailto:contact@example.com"
                      className="text-muted-foreground hover:underline break-words"
                    >
                      contact@example.com
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card
                layout
                transition={{
                  layout: {
                    duration: 0.8,
                    type: "spring",
                    stiffness: 300,
                    damping: 35,
                  },
                }}
                className={`hover:bg-blue-400/50 hover:[box-shadow:inset_0_-2px_0_0_rgb(255,255,255),inset_-2px_0_0_0_rgb(255,255,255)] transition-colors ${gridPositions.linkedin}`}
                onMouseEnter={() => {
                  setIsLinkedInHovered(true);
                  setIsCalendlyHovered(false);
                  setIsPhoneHovered(false);
                }}
                onMouseLeave={() => setIsLinkedInHovered(false)}
              >
                <CardContent className="flex items-start gap-4 pt-6 min-w-0">
                  <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 mt-1 flex-shrink-0" />
                  <div className="flex flex-col min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-semibold mb-1">
                      LinkedIn
                    </h3>
                    <a
                      href="https://linkedin.com/in/yourprofile"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:underline break-words"
                    >
                      linkedin.com/in/yourprofile
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card
                layout
                transition={{
                  layout: {
                    duration: 0.8,
                    type: "spring",
                    stiffness: 300,
                    damping: 35,
                  },
                }}
                className={`hover:bg-amber-200/50 hover:[box-shadow:inset_0_-2px_0_0_rgb(255,255,255),inset_-2px_0_0_0_rgb(255,255,255)] transition-colors ${gridPositions.calendly}`}
                onMouseEnter={() => {
                  setIsCalendlyHovered(true);
                  setIsLinkedInHovered(false);
                  setIsPhoneHovered(false);
                }}
                onMouseLeave={() => setIsCalendlyHovered(false)}
              >
                <CardContent className="flex items-start gap-4 pt-6 min-w-0">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 mt-1 flex-shrink-0" />
                  <div className="flex flex-col min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-semibold mb-1">
                      Calendly
                    </h3>
                    <a
                      href="https://calendly.com/yourusername"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:underline break-words"
                    >
                      calendly.com/yourusername
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </LayoutGroup>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tighter lg:text-4xl md:sticky md:top-20 flex-[1] text-center md:text-left">
          Get in Contact
        </h1>
      </div>
    </div>
  );
};

export { Contact };
