import { motion } from "motion/react";

const sponsors = [
  { name: "Google Cloud", logo: "https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg" },
  { name: "Microsoft", logo: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31" },
  { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
  { name: "NVIDIA", logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { name: "Intel", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg" },
  { name: "OpenAI", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
];

export function SponsorCarousel() {
  // Duplicate sponsors for seamless loop
  const duplicatedSponsors = [...sponsors, ...sponsors];

  return (
    <div className="relative overflow-hidden">
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10"></div>

      <motion.div
        className="flex gap-12 py-8"
        animate={{
          x: [0, -1920],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {duplicatedSponsors.map((sponsor, index) => (
          <div
            key={`${sponsor.name}-${index}`}
            className="flex-shrink-0 w-48 h-24 flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-lg border border-slate-700 hover:border-[#14b4ba]/50 transition-all duration-300 group"
          >
            <div className="px-6 py-4 flex items-center justify-center w-full h-full">
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                loading="lazy"
                decoding="async"
                className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                onError={(e) => {
                  // Fallback to text if image fails to load
                  e.currentTarget.style.display = 'none';
                  const fallback = document.createElement('span');
                  fallback.className = 'text-xl font-black text-slate-400 group-hover:text-[#14b4ba] transition-colors';
                  fallback.textContent = sponsor.name;
                  e.currentTarget.parentElement?.appendChild(fallback);
                }}
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
