import { calculateTrendPercentage, cn } from "lib/utils";

function StatsCard({ headerTitle, total, lastMonthCount, currentMonthCount }) {
  const { trend, percentage } = calculateTrendPercentage(
    currentMonthCount,
    lastMonthCount
  );

  const isDecrement = trend === "decrement";

  return (
    <article className="stats-card">
      <div className="text-base font-medium">{headerTitle}</div>
      <div className="content">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold">{total}</h2>
          <div className="flex items-center gap-2">
            <figure className="flex items-center gap-1">
              <img
                src={`/assets/icons/${
                  isDecrement ? "arrow-down-red.svg" : "arrow-up-green.svg"
                }`}
              />

              <figcaption
                className={
                  (cn("text-sm font-medium"),
                  isDecrement ? "text-red-500" : "text-success-500")
                }
              >
                {Math.round(percentage)}%
              </figcaption>
            </figure>
            <p className="text-sm font-medium text-gray-100 truncate">
              vs last month
            </p>
          </div>
        </div>
        <img
          src={`/assets/icons/${
            isDecrement ? "decrement.svg" : "increment.svg"
          }`}
          className="xl:w-32 w-full h-full md:h-32 xl:h-full"
        />
      </div>
    </article>
  );
}

export default StatsCard;
