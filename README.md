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
