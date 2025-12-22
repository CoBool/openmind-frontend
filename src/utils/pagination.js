// 페이지 번호 갯수
const SIZE_PER_PAGE_GROUP = 5;

export function getPagination({ totalCount, page, limit }) {
  // 기본값 반환
  if (!totalCount || !limit) {
    return {
      totalPage: 0,
      startPage: 0,
      endPage: -1,
      isFirstPage: true,
      isLastPage: true,
    };
  }

  // 전체 페이지 수 계산
  const totalPage = Math.ceil(totalCount / limit);

  const groupPages = Math.floor((page - 1) / SIZE_PER_PAGE_GROUP);

  // 시작 페이지
  const startPage = groupPages * SIZE_PER_PAGE_GROUP + 1;

  // 끝 페이지
  const endPage = Math.min(startPage + SIZE_PER_PAGE_GROUP - 1, totalPage);

  // 계산된 페이지 전보 반환
  return {
    totalPage,
    startPage,
    endPage,
    isFirstPage: page === 1,
    isLastPage: page === totalPage,
  };
}
