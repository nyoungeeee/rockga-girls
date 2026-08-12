# 락페가는 여자들 Archive

락페 준비물, 오픈카톡 파생방, 티켓·숙소 양도 정보를 한곳에 모은 반응형 정적 웹사이트입니다. PC에서는 문서·표 중심으로, 모바일에서는 카드형 세로 레이아웃으로 표시됩니다.

## 로컬에서 실행하기

Node.js 20.19 이상을 권장합니다.

```bash
npm install
npm run dev
```

브라우저에 표시된 로컬 주소로 접속합니다. 빌드 결과를 확인하려면 다음 명령을 사용합니다.

```bash
npm run build
npm run preview
```

## 콘텐츠 추가·수정하기

모든 콘텐츠는 [`data.js`](./data.js)에 모여 있습니다. HTML이나 CSS를 수정하지 않고 이 파일의 값만 바꾸면 됩니다. 이미지 경로에는 Vite가 배포 파일까지 함께 복사할 수 있도록 기존 예시처럼 `new URL("경로", import.meta.url).href` 형식을 사용합니다.

### 기본 정보

`site.lastUpdated`에는 화면에 노출할 최종 업데이트 날짜를, `site.submitUrl`에는 정보 제보 링크를 입력합니다.

```js
site: {
  lastUpdated: "2026.08.12",
  submitUrl: "https://open.kakao.com/...",
}
```

### 락페 아이템

`items` 배열 안에 아래 형식의 객체를 추가합니다.

```js
{
  id: "고유한-영문-id",
  name: "상품명",
  category: "카테고리",
  image: new URL("./assets/파일명.jpg", import.meta.url).href,
  shop: "구매처",
  price: "가격대",
  url: "https://구매-링크",
  review: "실제 사용 후기",
  points: ["장점 1", "장점 2", "주의점"],
  date: "2026.08.12",
}
```

- 이미지는 `assets` 폴더에 넣고 위 예시처럼 상대 경로를 적습니다.
- 이미지가 없으면 `image: ""`로 두세요. 자동으로 이미지 준비 중 화면이 표시됩니다.
- 같은 `category` 값은 자동으로 하나의 필터 버튼으로 묶입니다.

### 파생방

`rooms` 배열에 방 이름, 설명, 오픈카톡 링크, 비고를 입력합니다. 현재 운영 중인 방은 `active: true`, 종료되었거나 잠시 닫힌 방은 `false`로 둡니다.

```js
{
  name: "방 이름",
  description: "방 설명",
  url: "https://open.kakao.com/...",
  note: "비고",
  active: true,
}
```

### 티켓·숙소 양도

`transfers` 배열에 아래 형식으로 추가합니다. `type`은 `티켓` 또는 `숙소`, `status`는 `거래중`, `예약중`, `양도완료` 중 하나를 사용하면 기존 색상 스타일이 적용됩니다.

```js
{
  type: "티켓",
  event: "행사명 또는 숙소명",
  date: "8/2 (토)",
  quantity: "1매",
  price: "110,000원",
  status: "거래중",
  method: "현장 거래 / 송도",
  url: "https://상세-링크",
  posted: "2026.08.12",
}
```

양도가 완료된 글은 `status: "양도완료"`, `url: "#"`로 변경하면 링크가 비활성화됩니다. 배열의 위쪽 항목부터 화면에 표시되므로 최신 글을 위에 추가하세요.

## Vercel 배포

Vercel에서 이 저장소를 Import하면 Vite 설정을 자동으로 인식합니다.

- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

별도의 환경변수나 서버 설정은 필요하지 않습니다.

## 파일 구조

```text
.
├── index.html       # 페이지 구조
├── styles.css       # PC·모바일 반응형 스타일
├── app.js           # 데이터 렌더링, 검색, 필터, 메뉴
├── data.js          # 수정 가능한 콘텐츠 데이터
├── assets/          # 아이템 이미지
├── vercel.json      # Vercel 헤더 설정
└── package.json     # 개발·빌드 명령
```
