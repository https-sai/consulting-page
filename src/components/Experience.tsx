import { Download } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const Experience = () => {
  const experience = [
    {
      period: "Sep 2025 - Now",
      title: "Senior Civil Engineer",
      description:
        "Leading multidisciplinary teams in the design and delivery of infrastructure and land development projects. Overseeing permitting, QA/QC, and construction support. Coordinating with municipal agencies, contractors, and project stakeholders.",
      company: "AECOM",
    },
    {
      period: "Mar 2023 - Aug 2025",
      title: "Civil Engineer",
      description:
        "Designed site development plans, roadway improvements, and stormwater management systems. Prepared grading plans, drainage reports, and utility layouts. Conducted site inspections and prepared engineering calculations.",
      company: "HDR Engineering",
    },
    {
      period: "Jan 2021 - Feb 2023",
      title: "Staff Engineer / EIT",
      description:
        "Supported senior engineers in producing civil site plans, utility layouts, and erosion control plans. Performed field observations, drafting, and material quantity estimates. Assisted with permitting documentation and client coordination.",
      company: "Jacobs",
    },
    {
      period: "Jun 2019 - Dec 2020",
      title: "Junior Civil Engineer / Intern",
      description:
        "Assisted with drafting in AutoCAD and Civil 3D, conducted field visits, and supported surveying and geotechnical coordination. Prepared technical notes and assisted in preliminary design and cost estimating tasks.",
      company: "WSP",
    },
  ];

  return (
    <section className="py-20">
      <div className="w-full space-y-10 min-w-0">
        <div className="flex flex-col sm:flex-row w-full items-start sm:items-end justify-between gap-4">
          <h1 className="text-3xl font-semibold tracking-tighter lg:text-4xl">
            Experience
          </h1>
          <Button variant="outline" size="lg" className="font-semibold">
            Download CV <Download className="size-4" />
          </Button>
        </div>

        <div className="space-y-6 min-w-0">
          {experience.map((exp, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <CardTitle className="text-xl">{exp.title}</CardTitle>
                    <CardDescription className="text-sm font-semibold">
                      {exp.company}
                    </CardDescription>
                  </div>
                  <div className="text-xs font-semibold text-muted-foreground md:text-right">
                    {exp.period}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/70">{exp.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Experience };
