# HyeRIM Portfolio

장혜림의 정적 포트폴리오 사이트입니다.

- 기존 공개 주소: <https://maisondesoma-lgtm.github.io/>
- 대표 주소: <https://www.portfolio-janghyerim.com/>
- Vercel Production: <https://hyerim-portfolio-pearl.vercel.app/>
- 배포 방식: GitHub Actions → 기존 Vercel 프로젝트 자동 배포
- 작업·배포 저장소: `maisondesoma-lgtm/maisondesoma-lgtm.github.io`
- 게시 소스: 이 저장소의 `main` 브랜치 루트
- 빌드 단계: 없음
- HTTPS: 활성화

## 로컬 확인

저장소 루트에서 정적 서버를 실행합니다.

```powershell
npx --yes serve@14 . -l 4173
```

브라우저에서 <http://localhost:4173>을 엽니다.

## 커스텀 도메인

Vercel 프로젝트·도메인 연결 절차는 [DOMAIN_SETUP.md](DOMAIN_SETUP.md)를
따릅니다.
대표 주소는 `www.portfolio-janghyerim.com`이며, 루트 도메인은 대표 주소로
영구 리디렉션됩니다. 도메인 구매·연결과 Vercel Production 배포를
2026-09-24에 완료했습니다.

## 자동 배포

이 저장소의 `main`에 푸시하거나 GitHub 웹에서 파일을 수정하면
[Deploy portfolio to Vercel](https://github.com/maisondesoma-lgtm/maisondesoma-lgtm.github.io/actions/workflows/deploy-vercel.yml)이
기존 Vercel 프로젝트 `hyerim-portfolio`에 Production 배포합니다.
다른 저장소로 복사하거나 Vercel에서 수동 배포할 필요가 없습니다.

1. 이 저장소에서 파일을 수정하고 `main`에 커밋·푸시합니다.
2. **Actions → Deploy portfolio to Vercel**의 실행 결과를 확인합니다.
3. <https://www.portfolio-janghyerim.com/>에서 확인합니다.

GitHub Pages 작업의 성공 여부는 커스텀 도메인의 Vercel 배포와 별개입니다.
Vercel 배포 작업은 실제 도메인의 `proj-05.html`이 해당 커밋과 같은지도 검사합니다.
실패했을 때는 해당 실행의 실패한 단계를 확인하고 **Re-run jobs**로 재시도합니다.

배포 설정과 인증 관리는 [DOMAIN_SETUP.md](DOMAIN_SETUP.md)를 참고하세요.
