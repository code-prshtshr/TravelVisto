import { cn, getFirstWord } from "lib/utils";
import React from "react";
import { Link, useLocation } from "react-router";

function TripCard({ id, name, imageUrls, location, tags, price }) {
  const path = useLocation();
  const searchString = "/travel";
  return (
    <Link
      to={
        path.pathname === "/" || path.pathname.startsWith(searchString)
          ? `/travel/${id}`
          : `/trip/${id}`
      }
      className="trip-card"
    >
      <img src={imageUrls} alt={name} />
      <article>
        <h2>{name}</h2>
        <figure>
          <img
            src="/assets/icons/location-mark.svg"
            alt="location"
            className="size-4"
          />
          <figcaption>{location}</figcaption>
        </figure>
      </article>

      <div className="mt-5px pl-[18px] pr-3.5 pb-5">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={cn(
              "inline-block px-2 py-1 rounded text-xs",
              index === 1
                ? "!bg-pink-50 !text-pink-700"
                : "!bg-success-50 !text-success-700"
            )}
          >
            {getFirstWord(tag)}
          </span>
        ))}
      </div>
      <article className="tripCard-pill">{price}</article>
    </Link>
  );
}

export default TripCard;
