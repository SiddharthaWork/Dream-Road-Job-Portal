import { cn } from "@/lib/utils"
import { Marquee } from "@/components/magicui/marquee"

const companies = [
    {
        name: "LeapFrog",
        logo: "https://miro.medium.com/v2/resize:fit:1000/1*yKmC-MRn3GmQgfpblV9r8Q.png",
    },
    {
        name: "NCCS",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvOZcN0BOWXgH_caHKVbdiRAGsZQsr2FLMew&s", // (Please replace once you have exact link; NCCS Nepal is local.)
    },
    {
        name: "Cedar Gate",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD_Qw12DHQ_nH42As-Z5buv6wRRCxI-VvG3w&s",
    },
    {
        name: "Cloco Nepal",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdxDFw67ruCx2iIthYOGW-5zWY7-BC6M2naQ&s",
    },
    {
        name: "Nabil Bank",
        logo: "https://www.b360nepal.com/uploads/posts/1651775977-12-nabil-bank-ltd-1711624151.jpg",
    },
    {
        name: "Meta",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Meta-Logo.png/1200px-Meta-Logo.png",
    },
    {
        name: "Asterdio",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3YzzR3uB78deXbt9ODK9lpAI2lzH0CT_9rg&s",
    },
    {
        name: "Google",
        logo: "https://play-lh.googleusercontent.com/1-hPxafOxdYpYZEOKzNIkSP43HXCNftVJVttoo4ucl7rsMASXW3Xr6GlXURCubE1tA=w3840-h2160-rw",
    },
    {
        name: "Gumroad",
        logo: "https://miro.medium.com/v2/resize:fit:909/0*EtChX0pGeBsNH_9m.png",
    },
];

const firstRow = companies.slice(0, companies.length / 2)
const secondRow = companies.slice(companies.length / 2)

const CompanyLogo = ({
    logo,
    name,
}: {
    logo: string
    name: string
}) => {
    return (
        <div
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
    return (
        <section className="w-full py-8 bg-transparent max-w-7xl">
            <div className="container mx-auto px-4">


                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                    <Marquee pauseOnHover className="[--duration:25s]">
                        {firstRow.map((company) => (
                            <CompanyLogo key={company.name} {...company} />
                        ))}
                    </Marquee>
                    <Marquee reverse pauseOnHover className="[--duration:25s]">
                        {secondRow.map((company) => (
                            <CompanyLogo key={company.name} {...company} />
                        ))}
                    </Marquee>
                </div>

                {/* <div className="text-center mt-20">
                    <h1 className="text-2xl font-bold opacity-80">
                    Discover thousands of career opportunities
                    </h1>
                </div> */}
            </div>
        </section>
    )
}
