"use client";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import CenterRevealText from "../components/CenterRevealText";
import DottedHoverGrid from "@/components/DottedHoverGrid";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Experience } from "@/components/Experience";
import { Gallery6 } from "@/components/ProjectGallery";
import { Contact } from "@/components/Contact";

export default function Home() {
  const [showParagraph, setShowParagraph] = useState(false);
  const handleComplete = useCallback(() => {
    setShowParagraph(true);
  }, []);

  return (
    <DottedHoverGrid className="min-h-screen w-full text-black relative">
      <AnimatedNavbar />
      {/* Optional: add 'snap-y' here for scroll snapping */}
      <div className="snap-y w-full max-w-full overflow-x-hidden px-4 sm:px-6 md:px-8 lg:px-12">
        <section
          id=""
          className="snap-start min-h-[92vh] grid place-items-center"
        >
          <div className="flex flex-col md:flex-row gap-2 w-full max-w-4xl items-center">
            <div className="flex flex-col gap-4 flex-[2] w-full md:w-auto">
              <CenterRevealText onComplete={handleComplete}>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  C.O.R.E.
                </h1>
              </CenterRevealText>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={
                  showParagraph ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg md:text-xl min-h-[1.5em]"
              >
                Consulting Operations Results Execution
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                showParagraph ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{
                duration: 0.5,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex-1 flex items-center justify-center w-full md:w-auto"
            >
              <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
                <DotLottieReact
                  src="#" //"https://lottie.host/99233bed-6968-49b7-8a4f-c2df9100e7aa/8CauPBko38.lottie"
                  loop
                  autoplay
                />
              </div>
            </motion.div>
          </div>
        </section>

        <section
          id="about"
          className="snap-start min-h-[92vh] flex items-center justify-center"
        >
          <div className="w-full max-w-7xl space-y-10 min-w-0">
            <h1 className="text-3xl sm:text-3xl font-semibold tracking-tighter lg:text-4xl">
              About
            </h1>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2 w-full min-w-0">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>About Me</CardTitle>
                    <Badge variant={"available"}>Available</Badge>
                  </div>
                  <CardDescription>
                    I&apos;m a civil engineer with 20+ years of experience working
                    professionally on private, local, and state government
                    contracts.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    My work focuses on designing safe, cost-effective, and
                    sustainable solutions that serve communities and withstand
                    real-world demands. I bring a strong foundation in
                    engineering fundamentals along with a practical, hands-on
                    approach developed in the field. From concept to completion,
                    I prioritize quality, compliance, and communication to
                    ensure projects are delivered on time and aligned with
                    stakeholder goals. Outside of my full-time role, I
                    collaborate with private clients and small development teams
                    to provide structural assessments, residential site
                    planning, permitting assistance, and construction support. I
                    value honesty, technical excellence, and building long-term,
                    trusted relationships with the people and organizations I
                    support.
                  </p>
                  <Button variant="outline" size="sm" className="mt-4">
                    Resume
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Qualifications</CardTitle>
                  </div>
                  <CardDescription>Education + Certifications.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">
                          M.S. in Engineering
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        University of Texas El Paso
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">
                          B.S. in Engineering
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Bangladesh University of Engineering and Technology
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">
                          Engineer-in-Training (EIT) / Fundamentals of
                          Engineering (FE)
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">20xx</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">
                          Autodesk Certified Professional – AutoCAD / Civil 3D
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">20xx</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">
                          OSHA 30-Hour Construction Safety Certification
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">20xx</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section
          id="experience"
          className="snap-start min-h-[92vh] flex items-center justify-center"
        >
          <div className="w-full max-w-7xl text-xl opacity-80 min-w-0">
            <Experience />
          </div>
        </section>

        <section
          id="consulting"
          className="snap-start min-h-[92vh] flex items-center justify-center"
        >
          <div className="w-full max-w-7xl text-xl opacity-80 min-w-0">
            <Gallery6 />
          </div>
        </section>

        <section
          id="contact"
          className="snap-start min-h-[92vh] grid place-items-center"
        >
          <Contact />
        </section>
      </div>
      <footer className="min-h-20 flex items-center justify-center">
        https-sai production
      </footer>
    </DottedHoverGrid>
  );
}
