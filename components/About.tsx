'use client';
import Image from 'next/image';

export default function About() {
  const handleMouseEnter = () => document.body.classList.add('hovering');
  const handleMouseLeave = () => document.body.classList.remove('hovering');

  return (
    <section id="about" className="px-6 md:px-20 py-24 md:py-32 bg-white-main">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="relative scroll-trigger opacity-0 aspect-[3/4] overflow-hidden" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Image 
              src="/images/root/my-bio-img.jpg"
              alt="Profile"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
        </div>

        <div className="space-y-8 scroll-trigger opacity-0">
            <h2 className="text-4xl md:text-5xl font-medium leading-tight text-text-main">
                BRIDGING THE GAP <br />BETWEEN DESIGN <br />AND TECHNOLOGY.
            </h2>
            <div className="space-y-6 text-text-sub text-lg font-light leading-relaxed">
                <p>
                    <span className="text-text-main block mb-2 font-normal">多領域を横断するクリエイターとして</span>
                    フォトグラファーとしての「光を見る目」、ビデオグラファーとしての「時間の演出」、デザイナーとしての「使いやすさの追求」、そしてエンジニアとしての「実装力」。これら全てを組み合わせることで、単なるウェブサイトではなく、心に残るデジタル体験を創造します。
                </p>
                <p>
                    As a multidisciplinary creator, I combine the photographer&apos;s eye for light, the videographer&apos;s sense of timing, the designer&apos;s pursuit of usability, and the engineer&apos;s technical capability. I don&apos;t just build websites; I craft memorable digital experiences.
                </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-black/10">
                <div>
                    <h4 className="text-text-main font-medium mb-2">Capabilities</h4>
                    <ul className="text-sm text-text-sub space-y-1">
                        <li>Art Direction</li>
                        <li>UI/UX Design</li>
                        <li>Web Development</li>
                        <li>Photography / Video</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-text-main font-medium mb-2">Tech Stack</h4>
                    <ul className="text-sm text-text-sub space-y-1">
                        <li>React / Next.js</li>
                        <li>TypeScript</li>
                        <li>Tailwind CSS</li>
                        <li>Adobe Creative Cloud</li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}