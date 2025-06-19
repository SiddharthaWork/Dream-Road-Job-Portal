import { TrendingUp, Building2, MousePointer, Star, Users, Briefcase, Target, Bot } from "lucide-react"

export default function JobPortalSection() {
  return (
    <section className="w-full max-w-7xl mx-auto py-16 px-4 ">
      <div className="w-full h-full mx-auto  flex justify-center items-center">
        <div className="flex justify-between items-start gap-18 w-full h-full">
          {/* Job Seekers Column */}
          <div className="space-y-8 w-1/2 py-10 ">
            <div className="space-y-4">
              <p className="text-sm font-medium text-gray-600 tracking-wide">Got talent?</p>
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">Why job seekers love us</h2>
            </div>

            <div className="space-y-6 w-4/5  ">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-[#255cf4]/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-[#255cf4]" />
                </div> 
                <p className="text-gray-700 text-sm leading-relaxed pt-3">
                  Connect directly with founders at top startups - no third party recruiters allowed.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-[#255cf4]/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-[#255cf4]" />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed pt-3">
                  Everything you need to know, all upfront. View salary, stock options, and more before applying.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-[#255cf4]/10 flex items-center justify-center flex-shrink-0">
                  <MousePointer className="w-6 h-6 text-[#255cf4]" />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed pt-3">
                  Say goodbye to cover letters - your profile is all you need. One click to apply and you're done.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-[#255cf4]/10 flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6 text-[#255cf4]" />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed pt-3">
                  Unique jobs at startups and tech companies you can't find anywhere else.
                </p>
              </div>
            </div>
            <div className="flex gap-4 pt-14">
              <button className="px-6 py-3 text-gray-900 font-medium border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors">
                Learn more
              </button>
              <button className="px-6 py-3 bg-[#255cf4] text-white font-medium rounded-sm hover:bg-gray-800 transition-colors">
                Sign up
              </button>
            </div>
          </div>

          {/* Recruiters Column */}
          <div className="space-y-8 w-1/2 flex flex-col items-center px-10 bg-[#255cf4]/10 py-10 rounded-xl">
            <div className="space-y-4 ">
              <p className="text-sm font-medium text-gray-600 tracking-wide">Need talent?</p>
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">Why recruiters love us</h2>
            </div>

            <div className="space-y-6 w-4/5">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-[#255cf4]/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-[#255cf4]" />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed pt-3">
                  Tap into a community of 10M+ engaged, startup-ready candidates.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-[#255cf4]/10 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-[#255cf4]" />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed pt-3">
                  Everything you need to kickstart your recruiting — set up job posts, company branding, and HR tools
                  within 10 minutes, all for free.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-[#255cf4]/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-[#255cf4]" />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed pt-3">
                  A free applicant tracking system, or free integration with any ATS you may already use.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-[#255cf4]/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-6 h-6 text-[#255cf4]" />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed pt-3">
                  Let us handle the heavy-lifting with RecruiterCloud. 
                </p>
              </div>
            </div>

            <div className="flex  gap-4 pt-8">
              <button className="px-6 py-3 text-gray-900 font-medium border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors">
                Learn more
              </button>
              <button className="px-6 py-3 bg-gray-900 text-white font-medium rounded-sm hover:bg-gray-800 transition-colors">
                Sign up
              </button>
            </div>
            </div>
        </div>
        </div>
    </section>
  )
}
