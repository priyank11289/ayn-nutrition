
import { Star } from 'lucide-react';

const messages = [
  "FREE SHIPPING ON ORDERS ABOVE ₹999",
  "INDIA'S FIRST HAIR-SAFE CREATINE IS HERE",
  "INDIA'S FIRST TEEN-SAFE CREATINE FORMULATION",
  "GET 10% OFF ON SUBSCRIPTIONS",
];

export default function AnnouncementBar() {
  return (
    <div className="bg-ayn-teal text-ayn-dark overflow-hidden py-2 select-none">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* We repeat the content several times to ensure a seamless loop */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-12 px-6">
            {messages.map((message, index) => (
              <div key={index} className="flex items-center gap-12 font-bold text-[10px] sm:text-xs tracking-widest uppercase">
                <span>{message}</span>
                <Star className="w-3 h-3 fill-ayn-dark" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
