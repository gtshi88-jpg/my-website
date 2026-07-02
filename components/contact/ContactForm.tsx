'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { COMPANY } from '@/data/company';

const SERVICE_OPTIONS = ['Web Design', 'E-Commerce', 'Maintenance', 'Creative'] as const;

export default function ContactForm() {
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [agreed, setAgreed] = useState(false);

  const toggleService = (service: string) => {
    setServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const body = [
      `会社名／屋号：${company}`,
      `お名前：${name}`,
      `電話番号：${phone}`,
      `メールアドレス：${email}`,
      `ご興味のあるサービス：${services.length ? services.join('、') : '（未選択）'}`,
      '',
      'お問い合わせ内容：',
      message,
    ].join('\n');

    const url = `mailto:${COMPANY.email}?subject=${encodeURIComponent(
      'お仕事のご依頼'
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = url;
  };

  const labelClass = 'flex items-center gap-3 text-sm md:text-base font-bold tracking-wide mb-3 text-white-main';
  const requiredBadge = (
    <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-white text-black">
      必須
    </span>
  );
  const inputClass =
    'w-full bg-white/5 border border-white/15 rounded-xl px-5 py-4 text-base text-white-main placeholder:text-white/35 focus:outline-none focus:border-white/50 transition-colors';

  return (
    <form onSubmit={handleSubmit} className="space-y-10 md:space-y-12">
      {/* 会社名 */}
      <div>
        <label htmlFor="company" className={labelClass}>
          会社名／屋号 {requiredBadge}
        </label>
        <input
          id="company"
          type="text"
          required
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="株式会社プリズム"
          className={inputClass}
        />
      </div>

      {/* お名前 */}
      <div>
        <label htmlFor="name" className={labelClass}>
          お名前 {requiredBadge}
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="山田 太郎"
          className={inputClass}
        />
      </div>

      {/* 電話番号 */}
      <div>
        <label htmlFor="phone" className={labelClass}>
          電話番号 {requiredBadge}
        </label>
        <input
          id="phone"
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="090-1234-5678"
          className={inputClass}
        />
      </div>

      {/* メールアドレス */}
      <div>
        <label htmlFor="email" className={labelClass}>
          メールアドレス {requiredBadge}
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          className={inputClass}
        />
      </div>

      {/* ご興味のあるサービス */}
      <div>
        <p className={labelClass}>ご興味のあるサービス</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SERVICE_OPTIONS.map((service) => {
            const checked = services.includes(service);
            return (
              <label
                key={service}
                className={`flex items-center gap-3 px-5 py-4 rounded-xl border cursor-pointer transition-colors ${
                  checked ? 'border-white bg-white text-black' : 'border-white/15 bg-white/5 text-white/80 hover:border-white/40'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleService(service)}
                  className="sr-only"
                />
                <span
                  className={`flex items-center justify-center w-5 h-5 rounded border ${
                    checked ? 'border-black' : 'border-white/40'
                  }`}
                  aria-hidden="true"
                >
                  {checked && <span className="w-2.5 h-2.5 bg-black rounded-[2px]" />}
                </span>
                <span className="text-sm md:text-base font-medium">{service}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* お問い合わせ内容 */}
      <div>
        <label htmlFor="message" className={labelClass}>
          お問い合わせ内容 {requiredBadge}
        </label>
        <textarea
          id="message"
          required
          rows={7}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="ご依頼・ご相談の内容、ご予算やご希望時期などをご記入ください。"
          className={`${inputClass} resize-y`}
        />
      </div>

      {/* プライバシーポリシー同意 */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          required
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 w-5 h-5 accent-white shrink-0"
        />
        <span className="text-sm md:text-base text-white/60 leading-relaxed">
          <Link href="/privacy" className="text-white-main underline underline-offset-2 hover:opacity-60 transition-opacity">
            プライバシーポリシー
          </Link>
          に同意の上、送信します。
        </span>
      </label>

      {/* 送信ボタン */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={!agreed}
          className="group inline-flex items-center gap-3 text-sm md:text-base font-bold tracking-wide px-9 py-5 bg-white text-black rounded-full hover:opacity-80 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
        >
          お仕事について問い合わせる
          <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </form>
  );
}
