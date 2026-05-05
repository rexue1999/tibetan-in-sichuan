'use client';

import { useState } from 'react';

type ItineraryDay = { title: string; duration?: string; desc: string; stay?: string };
type ItineraryVariant = {
  label: string;
  days: ItineraryDay[];
};
type ItinerariesMap = Record<string, ItineraryVariant>;

interface Labels {
  itinerary: string;
  day: string;
  dayLabel: string;
}

export default function ItinerarySection({
  itinerary,
  itineraries,
  labels,
  locale,
}: {
  itinerary?: ItineraryDay[];
  itineraries?: ItinerariesMap;
  labels: Labels;
  locale: string;
}) {
  const keys = itineraries
    ? Object.keys(itineraries).sort((a, b) => Number(a) - Number(b))
    : [];
  const [selected, setSelected] = useState(keys[0] || '');

  // Multi-variant mode (route2, route3)
  if (itineraries) {
    const variant = itineraries[selected] || itineraries[keys[0]];

    return (
      <div className="mb-14">
        <div className="flex items-baseline justify-between mb-8 flex-wrap gap-4">
          <h2 className="text-xl font-medium text-[#1F1F1F]">{labels.itinerary}</h2>
          {/* Variant tabs */}
          <div className="flex gap-1 bg-[#F5F2ED] rounded-sm p-1">
            {keys.map((key) => (
              <button
                key={key}
                onClick={() => setSelected(key)}
                className={`px-4 py-1.5 text-xs font-semibold tracking-[1px] rounded-sm transition-all ${
                  selected === key
                    ? 'bg-[#8C3B2E] text-white shadow-sm'
                    : 'text-stone-400 hover:text-[#1F1F1F]'
                }`}
              >
                {key}{labels.day}
                {itineraries[key].label && (
                  <span className={`ml-1.5 font-normal ${selected === key ? 'text-white/70' : 'text-stone-300'}`}>
                    · {itineraries[key].label}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Day-by-day timeline */}
        {variant && (
          <div className="relative">
            <div className="absolute left-[11px] top-3 bottom-3 w-px bg-[#8C3B2E]/20" />
            <div className="space-y-8">
              {variant.days.map((day, i) => (
                <div key={i} className="flex gap-5">
                  <div className="relative z-10 flex-shrink-0 w-6 h-6 rounded-full bg-[#8C3B2E] flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white">{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 flex-wrap mb-1">
                      <h3 className="text-base font-medium text-[#1F1F1F]">
                        {day.title}
                      </h3>
                      {day.duration && (
                        <span className="text-[11px] font-semibold tracking-[1px] uppercase text-[#8C3B2E] bg-[#8C3B2E]/5 px-2 py-0.5 rounded-sm">
                          {day.duration}
                        </span>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed text-stone-500 mb-1">{day.desc}</p>
                    {day.stay && (
                      <span className="inline-block text-[10px] font-semibold tracking-[2px] uppercase text-[#8C3B2E] bg-[#8C3B2E]/5 px-2 py-0.5 rounded-sm mt-1">
                        {day.stay}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Simple mode (route1)
  if (itinerary && itinerary.length > 0) {
    return (
      <div className="mb-14">
        <h2 className="text-xl font-medium text-[#1F1F1F] mb-8">{labels.itinerary}</h2>
        <div className="relative">
          <div className="absolute left-[11px] top-3 bottom-3 w-px bg-[#8C3B2E]/20" />
          <div className="space-y-8">
            {itinerary.map((step, i) => (
              <div key={i} className="flex gap-5">
                <div className="relative z-10 flex-shrink-0 w-6 h-6 rounded-full bg-[#8C3B2E] flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">{i + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 flex-wrap mb-1">
                    <h3 className="text-base font-medium text-[#1F1F1F]">{step.title}</h3>
                    {step.duration && (
                      <span className="text-[11px] font-semibold tracking-[1px] uppercase text-[#8C3B2E] bg-[#8C3B2E]/5 px-2 py-0.5 rounded-sm">
                        {step.duration}
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-stone-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
