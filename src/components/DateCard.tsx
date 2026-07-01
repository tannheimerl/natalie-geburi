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
    <div className="w-full h-[420px] shrink-0 bg-card rounded-[12px] p-2 flex flex-col overflow-hidden shadow-[0_24px_48px_-16px_theme(colors.shadow)] mob:rounded-[20px]">
      <div className="relative flex-1 min-h-[120px] w-full rounded-[12px] overflow-hidden bg-[linear-gradient(135deg,#E9EDF7_0%,#FBE6EC_100%)] flex items-center justify-center">
        {date.img && (
          <img
            src={date.img}
            alt={date.title}
            className="w-full h-full object-cover"
          />
        )}
        {isDone && (
          <div className="absolute top-[2px] left-[2px] right-[2px] flex items-center justify-between gap-[16px] px-[16px] py-[12px] bg-white/60 backdrop-blur-[16px] text-navy rounded-[12px]">
            <div className="flex items-center gap-[8px]">
              <span
                className="material-symbols-rounded !text-[16px]"
                aria-hidden="true"
              >
                check
              </span>
              <span className="text-[14px] font-semibold">Eingelöst</span>
            </div>
            {redeemedAt && (
              <span className="text-[12px] text-muted">
                {formatRedeemedDate(redeemedAt)}
              </span>
            )}
          </div>
        )}
      </div>
      <div className="p-[16px]">
        <h2 className="font-bold text-[18px] text-navy">{date.title}</h2>
        <p className="mt-[8px] text-[16px] text-muted">{date.desc}</p>
      </div>
    </div>
  );
};

export default DateCard;
