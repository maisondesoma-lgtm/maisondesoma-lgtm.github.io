# HyeRIM Portfolio

장혜림의 정적 포트폴리오 사이트입니다.

- 기존 공개 주소: <https://maisondesoma-lgtm.github.io/>
- 대표 주소: <https://www.portfolio-janghyerim.com/>
- Vercel Production: <https://hyerim-portfolio-pearl.vercel.app/>
- 배포 방식: Vercel Hobby + GitHub 자동 배포
- 배포 저장소: `BlancoRicecake/hyerim-portfolio`
- 게시 소스: 배포 저장소 `main` 브랜치 루트
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

Vercel 배포 저장소 `BlancoRicecake/hyerim-portfolio`는 Vercel 프로젝트
`hyerim-portfolio`에 연결되어 있습니다.

- 배포 저장소 `main` 푸시: Production 자동 배포
- 배포 저장소의 그 외 브랜치 푸시: Preview 자동 배포
- Production 대표 주소: <https://www.portfolio-janghyerim.com/>

표준 배포 작업 폴더는 `C:\dev\Handy_code\hyerim-portfolio`입니다. 해당
폴더에서 `git pull`, 커밋, `git push` 순서로 작업하면 별도의 Vercel 수동
배포 명령 없이 사이트가 갱신됩니다.
