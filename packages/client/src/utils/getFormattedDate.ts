export const getFormattedDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const diffMins = Math.floor(diff / (1000 * 60));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
  const diffMonths =
    now.getMonth() -
    date.getMonth() +
    12 * (now.getFullYear() - date.getFullYear());
  const diffYears = now.getFullYear() - date.getFullYear();

  if (diffMins < 1) {
    return "몇초전";
  } else if (diffHours < 1) {
    return `${diffMins}분전`;
  } else if (diffHours < 24) {
    return `${diffHours}시간전`;
  } else if (diffDays < 10) {
    return `${diffDays}일전`;
  } else if (diffDays < 30) {
    return `${diffWeeks}주전`;
  } else if (diffMonths < 10) {
    return `${diffMonths}개월전`;
  } else {
    return `${diffYears}년전`;
  }
};
