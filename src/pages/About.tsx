import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, GraduationCap, Download } from "lucide-react";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";

const About: React.FC = () => {
  return (
    <Layout>
      <Header />
      <main className="mx-auto flex max-w-6xl flex-col items-center px-4 pt-16 sm:pt-24 lg:pt-32">
        <section className="w-full" id="about-me">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-3">
            <div className="sticky top-32 flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
              <img
                className="aspect-square w-48 rounded-full object-cover shadow-lg lg:w-full lg:rounded-2xl"
                alt="Professional headshot of Baran Demirtaş, smiling warmly."
                src="/images/baran.png"
              />
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold tracking-tight">Baran Demirtaş</h1>
                <h2 className="text-xl font-display font-medium text-stone-600 dark:text-stone-300">
                  System & Network Engineer
                </h2>
              </div>
              <p className="text-stone-600 dark:text-stone-400">
                Skilled and dedicated System and Network Engineer with 2 years of experience in managing, configuring, and optimizing network
                infrastructures and IT systems. Adept at troubleshooting, system maintenance, and providing technical support to ensure smooth operations
                in both large and small scale environments. Experienced in working with various network protocols, operating systems, and hardware
                configurations. Experienced in network security, cloud services, virtualization technologies (such as VMware, Hyper-V, and KVM), and
                virtualized environments, enabling cost-effective and scalable solutions.
              </p>
              <a
                className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-bold text-white transition hover:opacity-90 sm:w-auto"
                href="#" // Buraya CV dosyanızın linkini ekleyebilirsiniz
              >
                <Download className="h-5 w-5" />
                Download CV
              </a>
            </div>
            <div className="flex flex-col gap-12 lg:col-span-2">
              <div className="flex flex-col gap-8 rounded-2xl border border-glass-border-light dark:border-glass-border-dark bg-glass-light/50 dark:bg-glass-dark/50 p-8 shadow-lg backdrop-blur-xl">
                <h3 className="text-2xl font-bold">Experience</h3>
                <div className="flex flex-col gap-8">
                  <div className="flex gap-6">
                    <div className="mt-1 grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg bg-white/10 text-primary">
                      <Briefcase className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <h4 className="font-bold">System & Network Engineer</h4>
                        <span className="text-sm text-stone-500 dark:text-stone-400">
                          07/2023 - Present
                        </span>
                      </div>
                      <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
                        ASELSAN - İ4, Ankara, Turkey
                      </p>
                      <ul className="mt-2 list-disc pl-5 text-stone-600 dark:text-stone-400 text-sm space-y-1">
                        <li>Charged with building, configuring, installing, managing, and monitoring networking and IP infrastructure-related hardware and software.</li>
                        <li>Utilized various diagramming tools to visualize network components, including routers, switches, firewalls, cryptographic, and servers, to provide detailed representations for troubleshooting, planning, and audits.</li>
                        <li>Identified, troubleshot, and resolved network issues related to connectivity, performance, and security within the infrastructure.</li>
                        <li>Creating firewall rules, implementing security protocols, and managing updates.</li>
                        <li>Detecting and resolving network issues, improving network stability by 30%.</li>
                        <li>Manage data protection tools - DLP.</li>
                        <li>Conducting stress and performance tests to create a network structure that is 20% more secure.</li>
                        <li>Identified and integrated essential hardware components into the system, achieving a 30% reduction in overall costs.</li>
                        <li>Managed and monitored virtual environments, leveraging Proxmox’s features to maximize resource utilization, improve system flexibility, and ensure high availability.</li>
                        <li>Implemented hardening on local PCs to address security vulnerabilities, resulting in a 50% increase in overall system security.</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="mt-1 grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg bg-white/10 text-primary">
                      <Briefcase className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <h4 className="font-bold">System Administrator</h4>
                        <span className="text-sm text-stone-500 dark:text-stone-400">
                          11/2022 - 06/2023
                        </span>
                      </div>
                      <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
                        MIDDLE EAST TECHNICAL UNIVERSITY, Ankara, Turkey
                      </p>
                      <ul className="mt-2 list-disc pl-5 text-stone-600 dark:text-stone-400 text-sm space-y-1">
                        <li>Continuously monitored system performance and conducted regular maintenance to ensure optimal operation and prevent downtime.</li>
                        <li>Managed backup strategies and disaster recovery plans to ensure data integrity and minimize system downtime in case of failure.</li>
                        <li>Managed the deployment of software updates and patches, ensuring systems remained secure and up-to-date with the latest features and security fixes.</li>
                        <li>Analyzed system performance and made necessary adjustments to optimize resource allocation and enhance overall efficiency.</li>
                        <li>Configured and maintained network services, including DNS, DHCP, and VPN, ensuring seamless connectivity and network stability.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-8 rounded-2xl border border-glass-border-light dark:border-glass-border-dark bg-glass-light/50 dark:bg-glass-dark/50 p-8 shadow-lg backdrop-blur-xl">
                <h3 className="text-2xl font-bold">Education</h3>
                <div className="flex gap-6">
                  <div className="mt-1 grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg bg-white/10 text-primary">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <h4 className="font-bold">Computer Education and Instructional Technology</h4>
                      <span className="text-sm text-stone-500 dark:text-stone-400">
                        2017 - 2023
                      </span>
                    </div>
                    <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
                      MIDDLE EAST TECHNICAL UNIVERSITY
                    </p>
                    <p className="mt-2 text-stone-600 dark:text-stone-400">
                      Focused on Computer Education and Instructional Technology. Graduated with a GPA of 3.63.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-glass-border-light dark:border-glass-border-dark bg-glass-light/50 dark:bg-glass-dark/50 p-8 shadow-lg backdrop-blur-xl">
                <h3 className="mb-6 text-2xl font-bold">Skills</h3>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div>
                    <h4 className="mb-4 text-lg font-semibold">
                      Technical Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-primary/50 bg-primary/20 px-3 py-1 text-sm font-medium text-primary">
                        Network Topology
                      </span>
                      <span className="rounded-full border border-primary/50 bg-primary/20 px-3 py-1 text-sm font-medium text-primary">
                        Network Security
                      </span>
                      <span className="rounded-full border border-primary/50 bg-primary/20 px-3 py-1 text-sm font-medium text-primary">
                        Cloud Services
                      </span>
                      <span className="rounded-full border border-primary/50 bg-primary/20 px-3 py-1 text-sm font-medium text-primary">
                        Virtualization (VMware, Hyper-V, KVM)
                      </span>
                      <span className="rounded-full border border-primary/50 bg-primary/20 px-3 py-1 text-sm font-medium text-primary">
                        HTML
                      </span>
                      <span className="rounded-full border border-primary/50 bg-primary/20 px-3 py-1 text-sm font-medium text-primary">
                        CSS
                      </span>
                      <span className="rounded-full border border-primary/50 bg-primary/20 px-3 py-1 text-sm font-medium text-primary">
                        JavaScript
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-4 text-lg font-semibold">Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-primary/50 bg-primary/20 px-3 py-1 text-sm font-medium text-primary">
                        MS Office
                      </span>
                      <span className="rounded-full border border-primary/50 bg-primary/20 px-3 py-1 text-sm font-medium text-primary">
                        Jira
                      </span>
                      <span className="rounded-full border border-primary/50 bg-primary/20 px-3 py-1 text-sm font-medium text-primary">
                        Wireshark
                      </span>
                      <span className="rounded-full border border-primary/50 bg-primary/20 px-3 py-1 text-sm font-medium text-primary">
                        Iperf
                      </span>
                      <span className="rounded-full border border-primary/50 bg-primary/20 px-3 py-1 text-sm font-medium text-primary">
                        Proxmox
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-4 text-lg font-semibold">Soft Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-stone-400/50 bg-stone-500/20 px-3 py-1 text-sm font-medium text-stone-800 dark:text-stone-200">
                        Analytical Skills
                      </span>
                      <span className="rounded-full border border-stone-400/50 bg-stone-500/20 px-3 py-1 text-sm font-medium text-stone-800 dark:text-stone-200">
                        Agile methodology
                      </span>
                      <span className="rounded-full border border-stone-400/50 bg-stone-500/20 px-3 py-1 text-sm font-medium text-stone-800 dark:text-stone-200">
                        Software Test
                      </span>
                      <span className="rounded-full border border-stone-400/50 bg-stone-500/20 px-3 py-1 text-sm font-medium text-stone-800 dark:text-stone-200">
                        Information Architecture
                      </span>
                      <span className="rounded-full border border-stone-400/50 bg-stone-500/20 px-3 py-1 text-sm font-medium text-stone-800 dark:text-stone-200">
                        Project Management
                      </span>
                      <span className="rounded-full border border-stone-400/50 bg-stone-500/20 px-3 py-1 text-sm font-medium text-stone-800 dark:text-stone-200">
                        Data Analysis
                      </span>
                      <span className="rounded-full border border-stone-400/50 bg-stone-500/20 px-3 py-1 text-sm font-medium text-stone-800 dark:text-stone-200">
                        Usability
                      </span>
                      <span className="rounded-full border border-stone-400/50 bg-stone-500/20 px-3 py-1 text-sm font-medium text-stone-800 dark:text-stone-200">
                        UX Design
                      </span>
                      <span className="rounded-full border border-stone-400/50 bg-stone-500/20 px-3 py-1 text-sm font-medium text-stone-800 dark:text-stone-200">
                        User Research
                      </span>
                      <span className="rounded-full border border-stone-400/50 bg-stone-500/20 px-3 py-1 text-sm font-medium text-stone-800 dark:text-stone-200">
                        Design Systems
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-8 rounded-2xl border border-glass-border-light dark:border-glass-border-dark bg-glass-light/50 dark:bg-glass-dark/50 p-8 shadow-lg backdrop-blur-xl">
                <h3 className="text-2xl font-bold">Languages</h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <h4 className="font-bold">Turkish</h4>
                    <p className="text-sm text-stone-600 dark:text-stone-400">Native</p>
                  </div>
                  <div>
                    <h4 className="font-bold">English</h4>
                    <p className="text-sm text-stone-600 dark:text-stone-400">Fluent</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-8 rounded-2xl border border-glass-border-light dark:border-glass-border-dark bg-glass-light/50 dark:bg-glass-dark/50 p-8 shadow-lg backdrop-blur-xl">
                <h3 className="text-2xl font-bold">Certificates</h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <h4 className="font-bold">Google UX Design (8 courses)</h4>
                  </div>
                  <div>
                    <h4 className="font-bold">Foundations: Data, Data, Everywhere.</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </Layout>
  );
};

export default About;