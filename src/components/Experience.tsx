import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, ChevronDown } from 'lucide-react';

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
    company: "Tidel Enterprise Inc",
    logo: "./Tidel.jpeg",
    duration: "Apr 2026 - Present",
    position: "Data Analyst",
    location: "Remote, USA",
    responsibilities: [
      "Built Power BI dashboards tracking key business metrics across 3+ teams, replacing manual reporting and saving 4-6 hours per week through Python and BI automation.",
      "Processed and cleaned 50K+ records using Python (Pandas), Excel, and Google Sheets, improving data quality and reliability for downstream analysis.",
      "Supported A/B testing analysis to drive data-backed business decisions across product and operations teams."
    ],
    isCurrentPosition: false
  },
  {
    id: 2,
    company: "Drunix Solutions",
    logo: "./Drunix.jpeg",
    duration: "Jun 2026 - Mar 2026 (10 months)",
    position: "Software Developer - Data",
    location: "Remote, USA",
    responsibilities: [
      "Developed a Slack bot and web application using React and AWS, managing 6+ feature releases via Git branching and code reviews, ensuring stable production-ready deployments.",
      "Streamlined CI/CD pipelines using Git and Jenkins, cutting deployment times by 30% and accelerating release turnaround.",
      "Resolved 13+ high-severity production incidents through root cause analysis and debugging, restoring system stability with zero repeat failures."
    ],
    isCurrentPosition: false
  },
  {
    id: 3,
    company: "DXC Technology",
    logo: "./DXC.png",
    duration: "May 2018 - Jun 2023 (5 years 1 month)",
    position: "Data Engineer",
    location: "Hyderabad, India",
    responsibilities: [
      "Reduced daily data processing time by 35% (from 10 to 6.5 hours) by architecting and deploying an automated ETL pipeline for Zurich Insurance's Titian platform using AWS Glue, Lambda (CRON), Step Functions, and S3, enabling early access to insights for 4 downstream teams.",
      "Boosted data reliability and maintainability by developing modular SQL models in dbt Cloud integrated with Snowflake, transforming raw data into structured datasets for analytics and reducing ad hoc query dependency.",
      "Optimized PySpark jobs by rewriting legacy SQL transformations using caching, bucketing, and repartitioning, cutting query execution time from 15 minutes to under 9 minutes and enhancing performance across all Zurich's insurance platforms.",
      "Saved ~$7,500/month in infrastructure costs by replacing EC2-based ingestion with a serverless architecture (API Gateway, Lambda, DynamoDB, and S3), increasing pipeline scalability and reducing operational overhead.",
      "Improved SLA adherence by 98% by developing a smart “Publishing Reschedule Lambda” microservice that validated job dependencies and dynamically delayed broken publish events.",
      "Automated data ingestion pipelines in Databricks processing 1M+ records/day from raw S3 files into Bronze/Silver/Gold layers for Zurich's analytics platform, improving query readiness and shortening dashboard refresh cycles.",
      "Built 20+ reusable Spark notebooks for the Titian data lake supporting new insurance business use cases - cutting onboarding time for new data sources by 60%.",
      "Enabled high availability for analytics pipelines by designing a cross-cloud ingestion framework with Apache Iceberg, syncing datasets across AWS S3 and Azure Blob Storage.",
      "Built resilient Airflow DAGs to orchestrate multi-stage ETL workflows, simplifying error recovery and increasing pipeline reliability across dynamic ingestion layers.",
      "Improved dashboard load times by up to 5 minutes/report by building 10+ business-facing data marts in Snowflake, leveraging warehouse optimization and caching strategies for BI tools like Tableau and Power BI.",
      "Enhanced data integrity (>99.5% accuracy) by implementing data contracts and validations using Great Expectations, dbt tests, PySpark, and SQL-based reconciliation for production pipelines."
    ],
    isCurrentPosition: false
  },
  {
    id: 4,
    company: "Aditya Birla Group",
    logo: "./Aditya_Birla_Group_Logo.png",
    duration: "May 2017 - Aug 2017 (4 months)",
    position: "Software Development Intern",
    location: "Hyderabad, India",
    responsibilities: [
      "Developed an Android application that can search and output all the relevant books for the given input image (using the author's name as a reference) using optimal character recognition.",
      "Achieved an accuracy of 90% from this application, by extracting the text from processing the image & later using various APIs like Google and Amazon to search the relevant books.",
      "Responsible for maintaining & supporting a real-time project on Traffic Monitoring."
    ],
    isCurrentPosition: false
  },
  {
    id: 5,
    company: "Kakatiya Institute of Technology & Science",
    logo: "./KITSW_OfficiaLogo.png",
    duration: "Aug 2016 - Oct 2017 (1 year 3 months)",
    position: "Student Technical Assistant",
    location: "Warangal, India",
    responsibilities: [
      "Managed and led the technical team of 16 members during the placement season.",
      "Coordinated with over 800+ students, faculty, and recruiters to ensure seamless placement activities.",
      "Oversaw technical setup for coding rounds, ensuring all systems were fully operational.",
      "Configured software and managed network resources for over 50 workstations to support placement activities.",
      "Provided in-person technical support, troubleshooting, and resolving technical issues promptly.",
      "Ensured minimal disruption by offering timely and effective solutions, resulting in a 95% satisfaction rate."
    ],
    isCurrentPosition: false
  }
];

const Experience = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [expandedEntries, setExpandedEntries] = useState<number[]>([]);

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const toggleDetails = (id: number) => {
    setExpandedEntries((prev) =>
      prev.includes(id) ? prev.filter((entryId) => entryId !== id) : [...prev, id]
    );
  };

  return (
    <section id="experience" className="min-h-screen py-24 relative overflow-hidden" ref={containerRef}>
      <div className="w-full px-8 xl:px-12">
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
          <div className="absolute left-8 lg:left-1/3 transform lg:-translate-x-px h-full w-px bg-white/10">
            <motion.div
              className="absolute top-0 left-0 w-full bg-[#6bab8a]"
              style={{ height: progressHeight }}
            />
          </div>

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
                  <div className="absolute right-0 top-1/2 w-16 h-px bg-gradient-to-r from-[#6bab8a]/20 to-[#6bab8a]" />
                </div>

                {/* Timeline Point */}
                <div className="absolute left-8 lg:left-1/3 transform lg:-translate-x-1/2 w-4 h-4">
                  <div className="w-4 h-4 rounded-full bg-dark-950 border-2 border-[#6bab8a] relative">
                    {entry.isCurrentPosition && (
                      <span className="absolute inset-0 rounded-full animate-ping bg-[#6bab8a] opacity-75" />
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
                    <p className="text-[#6bab8a] text-sm mb-2">
                      {entry.duration}
                    </p>
                    <p className="text-white font-medium mb-2">
                      {entry.position}
                    </p>
                    <p className="flex items-center text-gray-400 text-sm mb-4">
                      <MapPin size={14} className="mr-1" />
                      {entry.location}
                    </p>

                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={() => toggleDetails(entry.id)}
                        className="flex items-center justify-between w-full text-white hover:text-[#6bab8a] transition-colors"
                      >
                        <span className="font-medium">Responsibilities</span>
                        <ChevronDown
                          className={`transform transition-transform ${
                            expandedEntries.includes(entry.id) ? 'rotate-180' : ''
                          }`}
                          size={20}
                        />
                      </button>

                      <motion.div
                        initial={false}
                        animate={{
                          height: expandedEntries.includes(entry.id) ? 'auto' : 0,
                          opacity: expandedEntries.includes(entry.id) ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="mt-4 space-y-2">
                          {entry.responsibilities.map((responsibility, idx) => (
                            <li key={idx} className="text-gray-300 text-[15px] flex items-start">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#6bab8a] mt-1.5 mr-2 flex-shrink-0" />
                              {responsibility}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
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