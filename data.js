/*
 * 이 파일의 내용만 수정하면 화면의 콘텐츠가 바뀝니다.
 * 이미지가 없을 때는 image 값을 빈 문자열("")로 두세요.
 */
export const ARCHIVE_DATA = {
  site: {
    lastUpdated: "2026.08.14",
    submitUrl: "https://open.kakao.com/",
  },

  items: [
    {
      id: "utility-belt-multi-cargo-shorts",
      name: "트릴리온 유틸리티 벨트 멀티 카고 쇼츠",
      category: "하의",
      image: "",
      shop: "무신사",
      price: "36,010원",
      url: "https://musinsa.onelink.me/PvkC/h03j86vg",
      review: "벨트 디테일과 여러 개의 카고 포켓이 포인트인 버뮤다 쇼츠. 수납이 필요한 락페에서 활용하기 좋고, 티셔츠나 민소매와 편하게 매치하기 좋은 스타일.",
      points: ["멀티 카고 포켓", "벨트 디테일", "버뮤다 핏"],
      date: "2026.08.14",
    },
  ],

  rooms: [
    { name: "2026 펜타포트 숙소방", description: "숙소 추천 · 구하기 · 양도", url: "https://open.kakao.com/", note: "누구나 입장 가능", active: true },
    { name: "펜타포트 카풀방", description: "서울·수도권 출발 카풀", url: "https://open.kakao.com/", note: "탑승·운전 모두 환영", active: true },
    { name: "락페 혼자가는 사람들", description: "혼자 오는 사람들끼리 동행 구하기", url: "https://open.kakao.com/", note: "성별 무관", active: true },
    { name: "장비 & 아이템 중고방", description: "페스티벌 관련 중고 거래", url: "https://open.kakao.com/", note: "거래 규칙 확인 필수", active: true },
    { name: "락페 맛집 원정대", description: "공연장 근처 맛집과 뒤풀이 정보", url: "https://open.kakao.com/", note: "공연 종료 후 운영", active: false },
  ],

  transfers: [
    { type: "티켓", event: "펜타포트 토요일 1일권", date: "8/2 (토)", quantity: "1매", price: "110,000원", status: "거래중", method: "현장 거래 / 송도", url: "https://open.kakao.com/", posted: "2026.08.12" },
    { type: "티켓", event: "펜타포트 3일권", date: "8/1 (금) – 8/3 (일)", quantity: "1매", price: "230,000원", status: "예약중", method: "택배 거래", url: "https://open.kakao.com/", posted: "2026.08.11" },
    { type: "숙소", event: "송도 숙소 양도 (2인)", date: "8/1 (금) – 8/3 (일)", quantity: "2인", price: "150,000원", status: "거래중", method: "송도 / 오션뷰", url: "https://open.kakao.com/", posted: "2026.08.10" },
    { type: "티켓", event: "부산락페 토요일권", date: "9/26 (토)", quantity: "1매", price: "90,000원", status: "양도완료", method: "직거래", url: "#", posted: "2026.08.07" },
    { type: "숙소", event: "부산역 근처 트윈룸", date: "9/25 (금) – 9/27 (일)", quantity: "2인", price: "180,000원", status: "거래중", method: "예약자명 변경", url: "https://open.kakao.com/", posted: "2026.08.05" },
  ],
};
