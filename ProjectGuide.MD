# 🚀 Frontend Team Convention & Guide

> **프로젝트 목표**  
> Vite + Pure React 환경에서 라이브러리 의존도를 낮추고,  
> 협업 시 충돌을 최소화하는 **견고하고 일관된 프론트엔드 구조**를 지향합니다.

---

## 1. 🏁 시작하기 (Getting Started)

본 프로젝트는 **초기 세팅을 완료한 상태**입니다.  
아래 순서대로 진행하면 바로 개발을 시작할 수 있습니다.

---

### A. 필수 VS Code 확장 프로그램

아래 확장 프로그램은 **팀원 전원 필수 설치**입니다.  
미설치 시 코드 포맷팅 및 린트 자동화가 정상 동작하지 않습니다.

1. **ESLint**
   - 패키지 ID: `dbaeumer.vscode-eslint`
2. **Prettier**
   - 패키지 ID: `esbenp.prettier-vscode`

---

### B. 프로젝트 실행 방법

터미널에서 아래 명령어를 순서대로 실행합니다.

```bash
# 1. 프로젝트 클론 (이미 받은 경우 생략)
git clone [레포지토리 주소]

# 2. 패키지 설치
npm install

# 3. 개발 서버 실행
npm run dev
```

---

### C. 자동 포맷 설정 안내

프로젝트에는 `.vscode/settings.json` 파일이 포함되어 있습니다.  
파일 저장 시(`Ctrl + S / Cmd + S`) 아래 동작이 자동 수행됩니다.

- Prettier 코드 포맷팅
- ESLint 규칙 기반 코드 정리

> ⚠️ `.prettierrc`, `eslint.config.js`, `.vscode/settings.json` 파일은  
> **팀 공통 규칙**이므로 임의로 수정하지 않습니다.

---

## 2. 📂 폴더 구조 (Directory Structure)

프로젝트는 **도메인(기능) 단위 구조**를 따릅니다.  
관련된 파일은 최대한 가까이 배치하는 **Co-location 전략**을 사용합니다.

```bash
src/
├── assets/                 # 정적 리소스 모음 (한 곳에 몰아둠)
│   ├── images/             # 공용 이미지 (로고, 기본 썸네일 등)
│   ├── icons/              # svg 아이콘
│   ├── fonts/              # 웹폰트 파일
│   └── styles/             # 전역 스타일 리소스
│       ├── reset.css
│       ├── variables.css
│       └── global.css
│
├── components/             # 전역 공통 UI 컴포넌트
│   ├── Button/
│   ├── Modal/
│   └── Layout/
│
├── contexts/               # 전역 상태 관리 (Context API)
├── hooks/                  # 공통 비즈니스 로직 (Custom Hooks)
├── services/               # API 통신 로직 (fetch / axios wrapper)
├── utils/                  # 순수 유틸 함수 (React 의존성 없음)
│
├── pages/                  # 페이지 / 도메인 단위
│   ├── Home/
│   │   └── Home.jsx
│   │
│   ├── Post/
│   │   ├── components/     # Post 전용 컴포넌트
│   │   ├── PostList.jsx
│   │   ├── PostDetail.jsx
│   │   └── PostEdit.jsx
│   │
│   └── User/
│
├── App.jsx                 # 라우팅 진입점
└── main.jsx                # 엔트리 포인트

```

---

> 📌 **구조 설계 원칙**
>
> - 전역 재사용 컴포넌트 → `components/`
> - 특정 도메인 전용 → `pages/도메인/components/`
> - 라우트와 1:1 대응되는 화면 → `pages/도메인/*.jsx`

---

## 3. 🧩 개발 패턴 (Architecture Rules)

코드의 역할을 명확히 분리하여  
읽기 쉽고, 수정에 강한 구조를 유지하는 것을 목표로 합니다.

---

### A. 컴포넌트 위치 결정 규칙 (3-Layer Rule)

컴포넌트는 **재사용 범위**에 따라 아래 3단계 중 하나에 위치합니다.

| 레벨       | 위치                         | 설명                           | 예시                  |
| ---------- | ---------------------------- | ------------------------------ | --------------------- |
| **Global** | `src/components/`            | 앱 전체에서 재사용되는 공통 UI | Button, Input, Modal  |
| **Domain** | `src/pages/Post/components/` | 특정 도메인 내부에서만 사용    | PostCard, AuthorBadge |
| **Page**   | `src/pages/Post/`            | 라우터와 직접 연결된 페이지    | PostList.jsx          |

#### 판단 기준

- 두 개 이상의 도메인에서 사용 → **Global**
- 하나의 도메인에서만 사용 → **Domain**
- URL과 1:1 매칭되는 화면 → **Page**

> 💡 **Tip**  
> 애매하면 일단 **Domain**에 둡니다.  
> 나중에 다른 도메인에서도 필요해지면 **Global로 승격**합니다.

---

### B. 데이터 흐름 및 로직 분리 (Logic Separation)

모든 데이터 흐름은 아래 단방향 구조를 따릅니다.

Service → Hook → Component

#### 1. `services/`

- 역할: 서버 API 통신
- 책임: `fetch` 호출, 요청/응답 처리
- 규칙:
  - React 코드 사용 ❌
  - 상태 관리 ❌
  - Promise 반환 ⭕

> ❌ 컴포넌트나 훅에서 직접 `fetch` 호출 금지

**구현 방법**

- 도메인별로 서비스 파일을 생성합니다 (예: `postService.js`, `userService.js`)
- 각 API 엔드포인트에 대응하는 함수를 작성합니다
- 함수는 `async/await`를 사용하여 `fetch`를 호출하고 Promise를 반환합니다
- 응답이 실패한 경우(`!response.ok`) 적절한 에러 메시지와 함께 `throw` 합니다
- 성공 시 `response.json()`을 반환합니다
- React 관련 코드는 사용하지 않고, 순수 JavaScript로만 작성합니다

---

#### 2. `hooks/`

- 역할: 비즈니스 로직과 상태 관리
- 책임:
  - `services` 호출
  - `loading`, `error`, `data` 상태 관리
- 규칙:
  - 화면 렌더링 코드 ❌

**구현 방법**

- `useState`로 `data`, `loading`, `error` 상태를 관리합니다
- `useEffect`에서 컴포넌트 마운트 시 또는 의존성 변경 시 서비스를 호출합니다
- 서비스 호출 전 `loading`을 `true`로, `error`를 `null`로 초기화합니다
- `try-catch`로 에러를 처리하고, 에러 발생 시 `error` 상태에 메시지를 저장합니다
- `finally` 블록에서 `loading`을 `false`로 설정합니다
- 필요시 데이터를 다시 불러오는 `refetch` 함수를 반환합니다
- Hook은 `{ data, loading, error, refetch }` 형태의 객체를 반환합니다

**에러 처리 규칙**

- Hook에서 에러를 상태로 관리하고, 컴포넌트에서 UI로 표시합니다
- 네트워크 에러와 비즈니스 에러를 구분하여 적절한 메시지를 제공합니다
- 에러 발생 시 사용자에게 명확한 피드백을 제공해야 합니다

---

#### 3. `components / pages`

- 역할: UI 렌더링
- 책임:
  - Hook에서 받은 데이터 출력
- 규칙:
  - 비즈니스 로직 ❌
  - API 호출 ❌

**구현 방법**

- 컴포넌트에서 필요한 Hook을 import하여 사용합니다
- Hook에서 반환된 `data`, `loading`, `error`를 구조 분해 할당으로 받습니다
- `loading`이 `true`일 때는 로딩 UI를 표시합니다
- `error`가 있을 때는 에러 메시지를 표시합니다
- `data`가 없거나 빈 배열일 때는 빈 상태 UI를 표시합니다
- 데이터가 있을 때는 `map`을 사용하여 리스트를 렌더링합니다
- 배열 렌더링 시 `(data || [])` 형태로 기본값을 처리합니다
- CSS Modules를 사용하여 스타일을 적용합니다

---

### C. Context API 사용 규칙

전역 상태 관리를 위해 Context API를 사용합니다.  
**여러 컴포넌트에서 공유해야 하는 상태**일 때만 사용합니다.

#### 사용 시점 판단

- Props Drilling이 3단계 이상 깊어질 때
- 여러 페이지에서 동일한 상태를 공유해야 할 때
- 예: 사용자 인증 정보, 테마 설정, 알림 상태

#### 사용하지 않는 경우

- 단일 컴포넌트 내부 상태 → `useState` 사용
- 부모-자식 간 전달 → Props 사용
- 형제 컴포넌트 간 전달 → 공통 부모로 상태 끌어올리기

**구현 방법**

- `contexts/` 폴더에 도메인별로 Context 파일을 생성합니다 (예: `AuthContext.js`, `ThemeContext.js`)
- `createContext`로 Context를 생성하고, Provider 컴포넌트를 만듭니다
- Provider에서 `useState`나 `useReducer`로 상태를 관리합니다
- 필요한 컴포넌트에서 `useContext`로 상태와 함수를 가져와 사용합니다
- Context는 가능한 한 작은 단위로 분리하여 불필요한 리렌더링을 방지합니다

---

## 4. 📝 코딩 컨벤션 (Coding Convention)

팀 전체의 코드 가독성과 유지보수성을 높이기 위한 공통 규칙입니다.  
개인의 취향보다 **일관성**을 우선합니다.

---

### A. 스타일링 규칙 (CSS Modules)

클래스명 충돌 방지와 컴포넌트 단위 스타일 관리를 위해  
**CSS Modules 사용을 필수**로 합니다.

#### 파일명 규칙

- `컴포넌트명.module.css`

#### 사용 예시

```js
import styles from './PostCard.module.css'
;<div className={styles.cardWrapper} />
```

#### 금지 사항

- ❌ **전역 클래스명 사용 금지**
- ❌ **의미 없는 축약 클래스명 사용 금지**
  - 예: `box`, `wrap`, `container`, `item`

#### 권장 사항

- 클래스명은 **역할과 의미가 드러나도록** 작성합니다.
  - 예: `cardWrapper`, `titleArea`, `actionButton`

---

### B. 방어적 코딩 (Defensive Coding)

TypeScript를 사용하지 않으므로,  
**런타임 에러를 사전에 방지하는 코드 작성**을 기본 원칙으로 합니다.

#### Optional Chaining (`?.`)

- 중첩 객체 접근 시 **필수 사용**

```js
// ❌ 잘못된 예
user.profile.name

// ⭕ 올바른 예
user?.profile?.name
```

#### Default Value 처리

- 배열을 렌더링할 때는 **기본값 처리 필수**

```js
// ❌ 잘못된 예
list.map(item => item.name)

// ⭕ 올바른 예
;(list || []).map(item => item.name)
```

> 데이터는 항상 **`undefined` / `null` 일 수 있다는 전제**로 코드를 작성합니다.

---

### C. 네이밍 컨벤션 (Naming Convention)

의미가 드러나는 이름을 사용하여  
코드만 봐도 역할을 유추할 수 있도록 합니다.

#### 1. 파일명 규칙

| 파일 타입 | 네이밍 규칙  | 예시                                |
| --------- | ------------ | ----------------------------------- |
| 컴포넌트  | `PascalCase` | `PostCard.jsx`, `UserProfile.jsx`   |
| 서비스    | `camelCase`  | `postService.js`, `userService.js`  |
| Hook      | `camelCase`  | `usePostList.js`, `useAuth.js`      |
| 유틸 함수 | `camelCase`  | `formatDate.js`, `validateEmail.js` |
| Context   | `PascalCase` | `AuthContext.js`, `ThemeContext.js` |
| 상수 파일 | `camelCase`  | `constants.js`, `apiConstants.js`   |

#### 2. 변수 / 함수

- `camelCase`

```js
getUserData
fetchPostList
```

#### 3. 이벤트 핸들러

- **함수 정의:** `handle + 동사`
- **props:** `on + 동사`

```js
const handleSubmit = () => {}

;<Form onSubmit={handleSubmit} />
```

#### 4. Boolean 값

의미에 따라 접두사를 구분합니다.

- `is` : 상태
  - 예: `isLoading`, `isOpen`
- `has` : 존재 여부
  - 예: `hasError`, `hasPermission`
- `should` : 조건 판단
  - 예: `shouldRender`, `shouldFetch`

---

### D. 상수 관리 (Constants)

반복 사용되는 값이나 설정값은 상수로 관리합니다.

#### 관리 위치

- **도메인별 상수**: 각 서비스 파일 상단에 정의
- **전역 상수**: `utils/constants.js` 또는 `src/constants/` 폴더에 정의

#### 관리 대상

- API 엔드포인트 URL
- 에러 메시지
- 기본 설정값 (페이지 크기, 제한 시간 등)
- 매직 넘버/문자열

**구현 방법**

- 상수는 `UPPER_SNAKE_CASE`로 네이밍합니다
- 관련된 상수는 객체로 그룹화하여 관리합니다
- 서비스 파일에서만 사용되는 상수는 해당 파일 상단에 정의합니다
- 여러 곳에서 사용되는 상수는 전역 상수 파일에 정의합니다

---

### E. Import 순서 규칙

코드 일관성을 위해 import 문은 아래 순서로 정렬합니다.

1. **React 및 라이브러리**
   - React, React Hooks
   - 외부 라이브러리

2. **내부 모듈 (절대 경로 우선)**
   - Context
   - Hooks
   - Services
   - Utils

3. **상대 경로**
   - 같은 도메인 내 컴포넌트
   - 같은 폴더 내 파일

4. **스타일**
   - CSS Modules

**구현 방법**

- 각 그룹 사이에 빈 줄을 하나 추가합니다
- 같은 그룹 내에서는 알파벳 순으로 정렬합니다 (선택)
- 절대 경로(`@/`)와 상대 경로(`./, ../`)를 구분합니다

---

## 5. 🤝 Git 협업 가이드

팀 전체의 작업 흐름을 통일하고, 충돌과 실수를 최소화하기 위한 규칙입니다.

---

### A. 브랜치 전략 (Branch Strategy)

모든 작업은 아래 브랜치 전략을 따릅니다.

- **`main`**
  - 실제 배포용 브랜치
  - 직접 푸시 ❌
  - `develop`에서 검증된 코드만 병합

- **`develop`**
  - 개발 통합 브랜치
  - 모든 기능은 이 브랜치로 모입니다.

- **`feature/기능명`**
  - 개별 작업 브랜치
  - 반드시 `develop`에서 분기합니다.
  - 예: `feature/login-ui`, `feature/post-crud`

---

### B. 작업 흐름 (Workflow)

1. `develop` 브랜치 최신화
2. `feature/본인기능` 브랜치 생성
3. 기능 개발 및 커밋
4. 작업 완료 후 `develop`으로 PR 생성
5. 승인 후 Merge

> ⚠️ `main` 브랜치에 직접 작업하지 않습니다.

---

### C. Pull Request 규칙

PR은 **코드 리뷰와 품질 보증을 위한 필수 과정**입니다.

PR 생성 시 반드시 아래 내용을 포함합니다.

- **작업 내용 요약**
  - 어떤 문제를 해결했고, 무엇을 추가/수정했는지
- **스크린샷 첨부**
  - UI 변경 사항이 있는 경우 필수
- **테스트 여부**
  - 직접 확인한 항목이 있다면 간단히 명시

#### 승인 규칙

- 최소 **팀원 1명 이상 Approve** 필수
- 승인 없이 Merge 금지

#### 코드 리뷰 체크리스트

리뷰어는 아래 항목을 확인합니다.

- [ ] **컨벤션 준수**
  - 네이밍 규칙 준수 여부 (PascalCase, camelCase 등)
  - 파일명 규칙 준수 여부 (컴포넌트, 서비스, 훅 등)
  - CSS Modules 사용 여부
  - 파일 위치가 3-Layer Rule에 맞는지
  - Import 순서 규칙 준수 여부

- [ ] **아키텍처 준수**
  - Service → Hook → Component 흐름 준수
  - 컴포넌트에서 직접 API 호출하지 않았는지
  - 비즈니스 로직이 Hook에 있는지
  - Context API 사용이 적절한지 (Props Drilling vs Context)
  - 상수 관리 위치가 적절한지

- [ ] **방어적 코딩**
  - Optional Chaining (`?.`) 사용 여부
  - 배열/객체 기본값 처리 여부
  - 에러 처리 로직 포함 여부

- [ ] **코드 품질**
  - 중복 코드 없음
  - 의미 있는 변수/함수명 사용
  - 불필요한 주석 제거

- [ ] **기능 검증**
  - 요구사항대로 동작하는지
  - 예외 상황 처리 여부

---

### D. Merge 규칙

- 승인 완료 후 Merge
- 충돌 발생 시 **PR 작성자가 직접 해결**
- Merge 후 feature 브랜치는 정리(삭제) 권장

---

> 이 규칙은 “귀찮게 하기 위함”이 아니라  
> **문제 발생 시 책임과 흐름을 명확히 하기 위한 최소한의 장치**입니다.

---

## 6. 📝 커밋 메시지 규칙 (Commit Message)

모든 커밋 메시지는 **변경의 의도를 한 문장으로 명확히 전달**해야 합니다.  
히스토리만 봐도 **“무엇을, 왜”** 수정했는지 알 수 있어야 합니다.

각 타입은 아래 목적에 맞게 사용합니다.

---

#### `feat:`

사용자 또는 시스템 관점에서 **새로운 기능이 추가**되었을 때 사용합니다.  
**기능의 시작점**을 남기는 커밋입니다.

- 예시  
  `feat: 게시글 작성 기능 추가`

---

#### `fix:`

기존 기능의 **버그를 수정**했을 때 사용합니다.  
동작 오류, 예외 상황, 잘못된 로직 수정이 해당됩니다.

- 예시  
  `fix: 로그인 시 토큰 만료 오류 수정`

---

#### `design:`

**CSS, 레이아웃, 스타일 등 UI/UX 변경**이 있을 때 사용합니다.  
기능 변화 없이 화면 표현만 달라지는 경우에 사용합니다.

- 예시  
  `design: 게시글 카드 간격 조정`

---

#### `refactor:`

기능 변화 없이 **코드 구조 개선, 중복 제거, 가독성 향상**을 목적으로 할 때 사용합니다.

- 예시  
  `refactor: Post 관련 로직 Custom Hook으로 분리`

---

#### `chore:`

빌드 설정, 패키지 관리, 설정 파일 등  
**기능과 직접적인 관련이 없는 작업**에 사용합니다.

- 예시  
  `chore: ESLint 규칙 업데이트`

---

> ⚠️ **주의**  
> 하나의 커밋에 여러 목적을 섞지 않습니다.  
> 목적이 다르면 **커밋을 분리**하세요.

---

## 7. 🧪 테스트 전략

본 프로젝트는 **현재 테스트 코드를 작성하지 않습니다**.  
기능 검증은 개발자가 직접 수동으로 확인하며,  
PR 시 테스트 여부를 명시합니다.

향후 테스트 도구 도입 시 별도 가이드를 추가합니다.

---

© 2024 Frontend Team Rules
