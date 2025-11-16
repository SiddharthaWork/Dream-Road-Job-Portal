"use client";

import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Company {
  id: string;
  name: string;
  logo: string;
  jobCount: number;
}

const CompanyLogo = ({
  logo,
  name,
  onClick,
}: {
  logo: string
  name: string
  onClick?: () => void
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative flex h-20 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-lg border p-4 transition-all duration-300",
        // light styles
        "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md",
        // dark styles
        "dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700",
      )}
    >
      <img
        className="h-full w-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
        alt={`${name} logo`}
        src={logo || "/placeholder.svg"}
      />
    </div>
  )
}

export default function TopCompaniesMarquee() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const router = useRouter();

  const handleCompanyClick = (id: string) => {
    router.push(`/companyop/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/job/getalljobscountbycompany`);
        const data = await response.json();
        if (data.success) {
          setCompanies(data.data.map((company: any) => ({
            id: company._id,
            name: company.name,
            logo: company.logo,
            jobCount: company.jobCount
          })));
        }
      } catch (error) {
        console.error('Error fetching top companies:', error);
      }
    };

    fetchData();
  }, []);

  if (companies.length === 0) {
    return <div>Loading top companies...</div>;
  }

  const firstRow = companies.slice(0, companies.length / 2)
  const secondRow = companies.slice(companies.length / 2)

  return (
    <section className="w-full py-8 bg-transparent max-w-7xl">
      <div className="container mx-auto px-4">
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:25s]">
            {firstRow.map((company) => (
              <CompanyLogo
                key={company.id}
                logo={company.logo}
                name={company.name}
                onClick={() => handleCompanyClick(company.id)}
              />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:25s]">
            {secondRow.map((company) => (
              <CompanyLogo
                key={company.id}
                logo={company.logo}
                name={company.name}
                onClick={() => handleCompanyClick(company.id)}
              />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
