'use client';
import { Instagram, Twitter, Linkedin, Github } from 'lucide-react';

export default function Contact() {
  const handleMouseEnter = () => document.body.classList.add('hovering');
  const handleMouseLeave = () => document.body.classList.remove('hovering');

  return (
    <section id="contact" className="px-6 md:px-20 py-24 md:py-32 bg-gray-50 text-text-main">
       <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 scroll-trigger opacity-0">
              <div>
                  <p className="text-sm font-bold tracking-widest mb-4">CONTACT</p>
                  <h2 
                    className="text-5xl md:text-8xl font-bold leading-none tracking-tighter cursor-pointer group"
                    onMouseEnter={handleMouseEnter} 
                    onMouseLeave={handleMouseLeave}
                  >
                      LET&apos;S TALK
                      <span className="block h-2 bg-black w-0 group-hover:w-full transition-all duration-500"></span>
                  </h2>
              </div>
              <a 
                href="mailto:shu@the-prism-works.com" 
                className="mt-8 md:mt-0 px-8 py-4 border border-black rounded-full hover:bg-black hover:text-white transition-all"
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}
              >
                  shu@the-prism-works.com
              </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-black/10">
              <div>
                  <p className="text-sm font-bold mb-2">SOCIALS</p>
                  <div className="flex gap-4">
                      {[Instagram,  Github].map((Icon, i) => (
                         <a key={i} href="https://www.instagram.com/xiu_884/" className="hover:text-gray-500 transition-colors" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                           <Icon className="w-5 h-5" />
                         </a>
                      ))}
                  </div>
              </div>
              <div>
                  <p className="text-sm font-bold mb-2">LOCATION</p>
                  <p className="text-text-sub">Tokyo, Japan</p>
              </div>
              <div className="md:text-right">
                  <p className="text-text-sub text-sm">© 2024 prism-works. All Rights Reserved.</p>
              </div>
          </div>
       </div>
    </section>
  );
}