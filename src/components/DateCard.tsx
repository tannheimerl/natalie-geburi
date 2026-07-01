import type { DateCard as DateCardData } from "@/lib/dates";

const formatRedeemedDate = (iso: string): string => {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `Am ${dd}.${mm}.${d.getFullYear()}`;
};

type DateCardProps = {
  date: DateCardData;
  isDone: boolean;
  redeemedAt: string | null;
};

const DateCard = ({ date, isDone, redeemedAt }: DateCardProps) => {
  return (
    <div className="w-full h-[420px] shrink-0 bg-card rounded-3xl p-2 flex flex-col overflow-hidden shadow-[0_24px_48px_-16px_theme(colors.shadow)] mob:rounded-[20px]">
      <div className="relative flex-1 min-h-[120px] w-full rounded-2xl overflow-hidden bg-[linear-gradient(135deg,#E9EDF7_0%,#FBE6EC_100%)] flex items-center justify-center">
        {date.img && (
          <img
            src={date.img}
            alt={date.title}
            className="w-full h-full object-cover"
          />
        )}
        {isDone && (
          <div className="absolute top-[2px] left-[2px] right-[2px] flex items-center justify-between gap-[16px] px-[16px] py-[12px] bg-white/60 backdrop-blur-[16px] text-navy rounded-[13px]">
            <span className="flex items-center gap-2 font-bold text-[15px]">
              {
                // TODO: Replace with google icon
              }
              <svg
                className="inline-flex w-4 h-4"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path
                  d="M3 8.5l3.2 3.2L13 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="text-[14px] font-semibold">Eingelöst</span>
            </span>
            {
              // TODO: Fix this texts colour, #5B5C63
            }
            {redeemedAt && (
              <span className="text-[12px]">
                {formatRedeemedDate(redeemedAt)}
              </span>
            )}
          </div>
        )}
      </div>
      <div className="p-[16px]">
        <h2 className="font-bold text-[18px] text-navy">{date.title}</h2>
        <p className="mt-[8px] text-[16px]">{date.desc}</p>
      </div>
    </div>
  );
};

export default DateCard;
