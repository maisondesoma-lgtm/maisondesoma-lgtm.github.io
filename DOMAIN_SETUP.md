# portfolio-janghyerim.com 배포 운영

## 작업 및 자동배포

- 작업 저장소: `maisondesoma-lgtm/maisondesoma-lgtm.github.io`
- Production 브랜치: `main`
- 워크플로: `.github/workflows/deploy-vercel.yml`
- 트리거: `main` 푸시 또는 Actions 화면의 **Run workflow**
- Vercel 프로젝트: `hyerim-portfolio`
- 프로젝트 ID: `prj_zkzgSExmeZzKtLXmLhPiMhya1vmm`
- Vercel 팀: `BlancoRicecake's projects`
- 대표 주소: <https://www.portfolio-janghyerim.com/>
- 루트 주소: <https://portfolio-janghyerim.com/> → 대표 주소로 리디렉션
- 기본 주소: <https://hyerim-portfolio-pearl.vercel.app/>

지인과 공동작업자는 이 저장소에서 계속 작업합니다. `main`에 반영하면
GitHub Actions가 Vercel 공식 API로 정적 사이트를 업로드·배포합니다.
프로젝트 전용 토큰이 불필요한 계정 조회 권한을 요구받지 않도록 CLI를 사용하지 않습니다.
배포 뒤 실제 도메인의 HTML, `work-acc.js`, `work.css`를 커밋 파일과 비교합니다.
한 번에 한 배포만 실행하며, 진행 중인 Production 배포를 중간에 취소하지 않습니다.

브랜치나 외부 PR에는 Production 자동배포가 실행되지 않습니다.
Vercel의 Git 연결을 다시 설정하거나 별도 복제 저장소로 푸시하지 마세요.
GitHub Pages 워크플로와 이 Vercel 배포 워크플로는 별개입니다.

## 인증

GitHub **Settings → Secrets and variables → Actions**의
`PORTFOLIO_VERCEL_TOKEN`이 Vercel 인증에 사용됩니다.
이 토큰은 `hyerim-portfolio` 프로젝트에만 접근하도록 제한되어 있으며,
토큰 값을 저장소 파일이나 로그에 기록하지 않습니다.

토큰을 폐기하거나 교체할 경우 Vercel 계정의 Tokens에서 같은 프로젝트
범위로 발급한 뒤 GitHub Secret을 갱신합니다. 인증 실패가 나면 이 Secret과
토큰의 유효성을 확인합니다. 기존 CLI 로그인 토큰을 대신 공유하지 않습니다.

## 배포 확인과 복구

1. GitHub **Actions → Deploy portfolio to Vercel**에서 최신 `main` 커밋의
   실행이 성공했는지 확인합니다. 실행 요약에 배포 주소와 커밋이 표시됩니다.
2. <https://www.portfolio-janghyerim.com/proj-05.html>에서 수정 사항을 확인합니다.
3. 실패 시 실패한 단계의 로그를 확인합니다. 인증 문제를 고친 뒤에는
   **Re-run jobs** 또는 **Run workflow**로 배포를 재실행할 수 있습니다.
4. 배포 내용을 되돌려야 하면 GitHub에서 해당 코드 변경을 revert하여
   `main`에 반영합니다. 동일한 자동배포 경로로 복구됩니다.

## 도메인 및 결제

도메인과 기존 Vercel 프로젝트는 계속 `BlancoRicecake's projects`에서 관리합니다.
새 도메인을 구매하거나 추가 유료 요금제로 변경할 필요가 없습니다.

- 등록 완료: 2026-09-24
- 기록된 만료일: 2027-09-24
- 등록 당시 결제: $11.25 + 세금 $1.13 = $12.38
- 등록 당시 자동 갱신: 사용 중

등록·갱신 상태는 Vercel Domains에서 확인합니다. DNS와 HTTPS 구성은 기존
Vercel 설정을 사용하며, GitHub Pages 전용 `CNAME`은 추가하지 않습니다.

## 이전 구성

2026-09-24에는 별도 `BlancoRicecake/hyerim-portfolio` 저장소의 `main`만
Vercel Git 자동배포에 연결되어 있었습니다. 원래 작업 저장소의 변경은
전달되지 않아 2026-09-28에 이 저장소의 GitHub Actions 배포로 전환합니다.
별도 저장소는 이 자동배포의 입력이나 의존성이 아닙니다.
