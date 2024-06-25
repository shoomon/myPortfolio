import React, { useContext, useState, useRef } from "react";
import "./Diary.css";
import { DiaryContext } from "./context/DiaryContext";
import PartContainer from "./PartContainer";
import { getFormattedDate } from "./utils/getFormattedDate";

const Diary = () => {
  const context = useContext(DiaryContext);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const diaryContainerRef = useRef<HTMLDivElement>(null);

  const { data, loading, error, hasNextPage, fetchMore } = context || {};

  const handleLoadMore = async () => {
    await fetchMore?.();

    if (diaryContainerRef.current) {
      const container = diaryContainerRef.current;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      container.scrollLeft = maxScrollLeft;
    }
  };

  return (
    <PartContainer title="My Diary" style={{ backgroundColor: "#FFF9D0" }}>
      <div className="diary-container" ref={diaryContainerRef}>
        {data?.map(({ id, title, contents, createdAt, updatedAt }, index) => (
          <div
            key={id}
            className="diary-item"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {hoveredIndex === index ? (
              <>
                <div className="diary-contents">{contents}</div>
                <div className="diary-date">
                  {createdAt === updatedAt
                    ? `${getFormattedDate(createdAt)} 작성됨`
                    : `${getFormattedDate(updatedAt)} 수정됨`}
                </div>
              </>
            ) : (
              <div className="diary-title">{title}</div>
            )}
          </div>
        ))}
      </div>

      <button
        className="load-more-button"
        onClick={handleLoadMore}
        disabled={!hasNextPage}
      >
        {hasNextPage ? "show more" : "end of page"}
      </button>
    </PartContainer>
  );
};

export default Diary;
