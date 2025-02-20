import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin } from 'lucide-react';

interface TimelineEntry {
  id: number;
  company: string;
  logo: string;
  duration: string;
  position: string;
  location: string;
  responsibilities: string[];
  isCurrentPosition: boolean;
}

const timelineData: TimelineEntry[] = [
  {
    id: 1,
    company: "DXC Technology",
    logo: "/DXC.png",
    duration: "Oct 2018 - Dec 2022 (4 years 3 months)",
    position: "Data Engineer",
    location: "Hyderabad, India",
    responsibilities: [
      "Designed a data pipeline using AWS components for an internal project called Titian, improving pipeline efficiency by 30% through the integration of Lambda functions with CRON triggers and optimization of Glue jobs",
      "Recommended cost-efficient methods for data pipelines, reducing computing costs by 20%",
      "Architected and deployed a serverless solution utilizing API Gateway, DynamoDB and deployed AWS Lambda code via AWS S3",
      "Enhanced Spark workflows using PySpark and SQL to extract and process data from S3 buckets efficiently",
      "Leveraged a wide range of AWS services to build robust and scalable data solutions, including VPC, EC2, SQS, DynamoDB, Lambda, Step Functions, Glue, Athena, and Glue Crawlers",
      "Engineered a Publishing Reschedule Lambda function to ensure job completion before data publishing to Titian",
      "Performed ETL operations to support new use cases, including adding attributes to Titian Onelake datasets, grouping datasets, writing SQLs, Spark notebooks, and conducting data validations and quality checks",
      "Utilized Databricks for analytical operations, including duplicate detection, occupancy analysis, and pre-validation tasks",
      "Employed Snowflake to create customized tables and views based on business requirements, facilitating efficient downstream data consumption",
      "Implemented comprehensive data quality checks and validation procedures for pipeline configurations, ensuring data integrity and seamless consumer streaming"
    ],
    isCurrentPosition: false
  },
  {
    id: 2,
    company: "Aditya Birla Group",
    logo: "/Aditya_Birla_Group_Logo.png",
    duration: "May 2018 - Aug 2018 (4 months)",
    position: "Software Development Intern",
    location: "Hyderabad, India",
    responsibilities: [
      "Developed an Android application that can search and output all the relevant books for the given input image (using the author's name as a reference) using optimal character recognition",
      "Achieved an accuracy of 90% from this application, by extracting the text from processing the image & later using various APIs like Google and Amazon to search the relevant books",
      "Responsible for maintaining & supporting a real-time project on Traffic Monitoring"
    ],
    isCurrentPosition: false
  },
  {
    id: 3,
    company: "Kakatiya Institute of Technology & Science",
    logo: "/KITSW_OfficiaLogo.png",
    duration: "Aug 2016 - Oct 2017 (1 year 3 months)",
    position: "Student Technical Assistant",
    location: "Warangal, India",
    responsibilities: [
      "Managed and led the technical team of 16 members during the placement season",
      "Coordinated with over 800+ students, faculty, and recruiters to ensure seamless placement activities",
      "Oversaw technical setup for coding rounds, ensuring all systems were fully operational",
      "Configured software and managed network resources for over 50 workstations to support placement activities",
      "Provided in-person technical support, troubleshooting, and resolving technical issues promptly",
      "Ensured minimal disruption by offering timely and effective solutions, resulting in a 95% satisfaction rate"
    ],
    isCurrentPosition: false
  }
];

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="min-h-screen bg-dark-950 py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-4xl lg:text-5xl font-bold text-white mb-16 text-center"
        >
          WORK EXPERIENCE
        </motion.h1>

        <div className="relative" ref={ref}>
          {/* Timeline Line */}
          <div className="absolute left-8 lg:left-1/3 transform lg:-translate-x-px h-full w-px bg-white/10" />

          {/* Timeline Entries */}
          <div className="relative space-y-20">
            {timelineData.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex items-start relative"
              >
                {/* Company Logo */}
                <div className="hidden lg:block w-1/3 pr-16 relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative w-40 h-40 rounded-xl overflow-hidden shadow-lg ml-auto group bg-white"
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src={entry.logo}
                        alt={`${entry.company} logo`}
                        className="w-full h-full object-contain"
                        style={{
                          imageRendering: '-webkit-optimize-contrast',
                          transform: 'translateZ(0)',
                          backfaceVisibility: 'hidden'
                        }}
                      />
                    </div>
                  </motion.div>
                  {/* Connecting Line */}
                  <div className="absolute right-0 top-1/2 w-16 h-px bg-gradient-to-r from-cyan-400/20 to-cyan-400" />
                </div>

                {/* Timeline Point */}
                <div className="absolute left-8 lg:left-1/3 transform lg:-translate-x-1/2 w-4 h-4">
                  <div className="w-4 h-4 rounded-full bg-dark-950 border-2 border-cyan-400 relative">
                    {entry.isCurrentPosition && (
                      <span className="absolute inset-0 rounded-full animate-ping bg-cyan-400 opacity-75" />
                    )}
                  </div>
                </div>

                {/* Content Card */}
                <div className="ml-16 lg:ml-12 lg:w-2/3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10 shadow-xl"
                  >
                    {/* Mobile Logo */}
                    <div className="lg:hidden mb-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-white flex items-center justify-center">
                        <img
                          src={entry.logo}
                          alt={`${entry.company} logo`}
                          className="w-full h-full object-contain"
                          style={{
                            imageRendering: '-webkit-optimize-contrast',
                            transform: 'translateZ(0)',
                            backfaceVisibility: 'hidden'
                          }}
                        />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">
                      {entry.company}
                    </h3>
                    <p className="text-cyan-400 text-sm mb-2">
                      {entry.duration}
                    </p>
                    <p className="text-white font-medium mb-2">
                      {entry.position}
                    </p>
                    <p className="flex items-center text-gray-400 text-sm mb-4">
                      <MapPin size={14} className="mr-1" />
                      {entry.location}
                    </p>
                    <ul className="space-y-2">
                      {entry.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="text-gray-300 text-sm flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 mr-2 flex-shrink-0" />
                          {responsibility}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;