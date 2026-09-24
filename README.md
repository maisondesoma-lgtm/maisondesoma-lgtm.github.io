# HyeRIM Portfolio

장혜림의 정적 포트폴리오 사이트입니다.

- 현재 공개 주소: <https://maisondesoma-lgtm.github.io/>
- 배포 방식: GitHub Pages
- 게시 소스: `main` 브랜치 루트
- 빌드 단계: 없음
- HTTPS: 활성화

## 로컬 확인

저장소 루트에서 정적 서버를 실행합니다.

```powershell
npx --yes serve@14 . -l 4173
```

브라우저에서 <http://localhost:4173>을 엽니다.

## 커스텀 도메인

연결 절차와 DNS 값은 [DOMAIN_SETUP.md](DOMAIN_SETUP.md)를 따릅니다.
실제 도메인이 확정되기 전에는 루트에 `CNAME` 파일을 추가하지 않습니다.
잘못된 `CNAME`이 올라가면 현재 GitHub Pages 주소의 배포 설정에 영향을 줄 수
있습니다.
