# portfolio-janghyerim.com Vercel 배포

## 확정 구성

- 구매할 도메인: `portfolio-janghyerim.com`
- 대표 주소: <https://www.portfolio-janghyerim.com/>
- 루트 주소: <https://portfolio-janghyerim.com/> → 대표 주소로 이동
- 호스팅·DNS·도메인 관리: Vercel
- Vercel 계정: `BlancoRicecake's projects`
- 요금제: Hobby
- 원본 저장소: `maisondesoma-lgtm/maisondesoma-lgtm.github.io`
- Vercel 배포 저장소: `BlancoRicecake/hyerim-portfolio` (private)
- Production Branch: `main`
- 준비 브랜치: `codex/custom-domain-setup`
- 프로젝트 이름: `hyerim-portfolio`
- 현재 Production: <https://hyerim-portfolio-pearl.vercel.app/>
- 2026-09-24 Vercel 등록가: 첫해 `$11.25`, 갱신 `$11.25/년`

`portfolio_janghyerim.com`처럼 밑줄이 들어간 주소는 웹 호스트명으로 사용할
수 없으므로 하이픈을 사용한다.

## 저장소 준비 상태

- 모든 HTML 페이지: canonical, description, Open Graph, X/Twitter 메타데이터
- `robots.txt`: 검색 허용 및 사이트맵 주소
- `sitemap.xml`: 공개 HTML 12개 주소
- `vercel.json`: 공통 보안 응답 헤더
- `.nojekyll`: GitHub Pages 기존 주소와의 호환을 위해 유지

GitHub Pages 전용 `CNAME`은 사용하지 않는다. 도메인은 Vercel 프로젝트의
**Settings → Domains**에서 관리한다.

## Vercel 프로젝트 만들기

프로젝트와 배포용 비공개 저장소는 생성 완료됐다. 아래 값은 재구성 또는
장애 복구 시 사용한다.

1. Vercel 대시보드에서 **Add New → Project**를 연다.
2. GitHub App 권한에 `maisondesoma-lgtm/maisondesoma-lgtm.github.io`를
   추가한다.
3. 저장소의 **Import**를 선택한다.
4. 다음 설정으로 배포한다.

| 설정 | 값 |
|---|---|
| Project Name | `hyerim-portfolio` |
| Framework Preset | Other |
| Root Directory | `.` |
| Build Command | 비움 |
| Output Directory | 비움 |
| Install Command | 비움 |
| Production Branch | `main` |

정적 HTML/CSS/JavaScript 사이트이므로 환경 변수나 빌드 단계가 필요 없다.

## 도메인 구매와 연결

1. Vercel의 **Domains**에서 `portfolio-janghyerim.com`을 검색한다.
2. 등록 가능 여부, 첫해 가격, 갱신 가격, 자동 갱신 조건을 확인한다.
3. 결제와 등록자 연락처 입력을 완료한다.
4. `hyerim-portfolio` 프로젝트의 **Settings → Domains**에 루트 도메인과
   `www`를 연결한다.
5. `www.portfolio-janghyerim.com`을 Primary로 정한다.
6. 루트 도메인은 `www`로 영구 리디렉션한다.

Vercel에서 도메인을 구매하면 네임서버와 기본 DNS가 자동 구성된다. 별도의
Cloudflare 계정이나 GitHub Pages A/AAAA 레코드는 필요 없다.

현재 결제 화면의 예상 세금은 `$0.00`, 합계는 `$11.25`다. 도메인은 환불되지
않으므로 철자와 등록자 정보를 결제 직전에 다시 확인한다.

## 배포 순서

1. 현재 `main`을 Vercel에 배포해 기본 `.vercel.app` 주소를 만든다. (완료)
2. `codex/custom-domain-setup`의 Preview Deployment를 확인한다. (완료)
3. 공개 Preview의 12개 HTML 페이지와 사이트 파일을 검증한다. (완료)
4. 도메인을 구매하고 프로젝트에 연결한다.
5. 준비 PR을 `main`에 병합한다.
6. 새 Production Deployment가 성공하면 대표 도메인을 최종 확인한다.

## 최종 검증

```powershell
Resolve-DnsName portfolio-janghyerim.com
Resolve-DnsName www.portfolio-janghyerim.com
curl.exe -I https://www.portfolio-janghyerim.com/
curl.exe -I https://portfolio-janghyerim.com/
```

기대 결과:

- 루트와 `www` 모두 Vercel에서 Valid Configuration으로 표시
- 두 주소 모두 HTTPS로 열림
- 루트 주소가 `www` 대표 주소로 이동
- 12개 HTML 페이지와 이미지가 정상 표시
- PR 푸시마다 Preview Deployment가 생성

## 운영 메모

- 도메인과 프로젝트는 현재 Vercel 계정 소유자가 관리한다.
- 등록자 이메일은 만료·갱신 알림을 확인할 수 있는 주소를 사용한다.
- 자동 갱신과 결제 수단을 정기적으로 확인한다.
- Hobby 사용량이 한도를 넘으면 추가 과금보다 사이트가 일시 중지될 수 있으므로
  Vercel Usage 화면을 확인한다.
