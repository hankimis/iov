'use client';

import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
   return (
      <div className="bg-[#0a0a0a] pt-20 min-h-screen">
         <section className="py-20 max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20">
               <div>
                  <h1 className="text-6xl font-black text-white mb-10 tracking-tighter">
                     GET IN <br /><span className="text-[#dfff00]">TOUCH</span>
                  </h1>
                  <p className="text-xl text-gray-400 mb-16 leading-relaxed">
                     프로젝트 문의, 제휴 제안, 혹은 단순한 커피챗도 환영합니다. <br />
                     IOV의 문은 언제나 열려있습니다.
                  </p>

                  <div className="space-y-8">
                     <div className="flex items-start gap-6 group">
                        <div className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-white group-hover:text-[#dfff00] group-hover:border-[#dfff00] transition-all">
                           <MapPin size={24} />
                        </div>
                        <div>
                           <h3 className="text-lg font-bold text-white mb-2">Visit Us</h3>
                           <p className="text-gray-400">서울특별시 강남구 테헤란로 123, <br />IOV 타워 5층</p>
                        </div>
                     </div>

                     <div className="flex items-start gap-6 group">
                        <div className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-white group-hover:text-[#dfff00] group-hover:border-[#dfff00] transition-all">
                           <Mail size={24} />
                        </div>
                        <div>
                           <h3 className="text-lg font-bold text-white mb-2">Email Us</h3>
                           <p className="text-gray-400">contact@iov.kr <br /> business@iov.kr</p>
                        </div>
                     </div>

                     <div className="flex items-start gap-6 group">
                        <div className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-white group-hover:text-[#dfff00] group-hover:border-[#dfff00] transition-all">
                           <Phone size={24} />
                        </div>
                        <div>
                           <h3 className="text-lg font-bold text-white mb-2">Call Us</h3>
                           <p className="text-gray-400">02-1234-5678 (Rep) <br /> 02-1234-5679 (Fax)</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="bg-[#111] rounded-3xl border border-white/5 p-8 lg:p-12">
                  <h2 className="text-2xl font-bold text-white mb-8">Send Us a Message</h2>
                  <form className="space-y-6" onSubmit={async (e) => {
                     e.preventDefault();
                     const form = e.target as HTMLFormElement;
                     const formData = new FormData(form);
                     const data = {
                        type: 'inquiry',
                        name: formData.get('name'),
                        email: formData.get('email'),
                        phone: formData.get('phone'),
                        company: formData.get('company'),
                        message: formData.get('message'),
                        status: 'pending',
                        date: new Date().toISOString()
                     };

                     try {
                        await fetch('/api/applications', {
                           method: 'POST',
                           headers: { 'Content-Type': 'application/json' },
                           body: JSON.stringify(data)
                        });
                        alert('메시지가 전송되었습니다. 검토 후 연락드리겠습니다.');
                        form.reset();
                     } catch (err) {
                        alert('전송에 실패했습니다.');
                     }
                  }}>
                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-500 uppercase">Name</label>
                           <input required name="name" type="text" className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#dfff00]" placeholder="홍길동" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-500 uppercase">Company</label>
                           <input name="company" type="text" className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#dfff00]" placeholder="(주)아이오브이" />
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                           <input required name="email" type="email" className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#dfff00]" placeholder="name@company.com" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-500 uppercase">Phone</label>
                           <input required name="phone" type="tel" className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#dfff00]" placeholder="010-1234-5678" />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Message</label>
                        <textarea required name="message" rows={6} className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#dfff00] resize-none" placeholder="문의하실 내용을 자세히 적어주세요." />
                     </div>
                     <button type="submit" className="w-full py-4 bg-[#dfff00] hover:bg-[#ccee00] text-black font-bold rounded-xl transition-colors text-lg">
                        Send Message
                     </button>
                  </form>
               </div>
            </div>
         </section>

         {/* Map Section */}
         <section className="pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="h-[400px] bg-[#111] rounded-3xl border border-white/5 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
               <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.053746764585!2d127.0276371!3d37.4979119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca1598c362957%3A0x6440c95847e09647!2z6rCV64Ko7Jet!5e0!3m2!1sko!2skr!4v1716480000000!5m2!1sko!2skr"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
               ></iframe>
               <div className="absolute bottom-8 left-8 bg-black/80 backdrop-blur text-white p-6 rounded-xl border border-white/10">
                  <p className="font-bold mb-1">IOV HQ</p>
                  <p className="text-sm text-gray-400">강남역 1번 출구 도보 3분</p>
               </div>
            </div>


         </section>
      </div>
   );
}
