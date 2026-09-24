# portfolio-janghyerim.com 배포 준비

## 확정 구성

- 구매할 도메인: `portfolio-janghyerim.com`
- 대표 주소: <https://www.portfolio-janghyerim.com/>
- 루트 주소: <https://portfolio-janghyerim.com/> → 대표 주소로 이동
- 호스팅: GitHub Pages
- 저장소: `maisondesoma-lgtm/maisondesoma-lgtm.github.io`
- 게시 소스: `main` 브랜치의 `/`
- 준비 브랜치: `codex/custom-domain-setup`
- 등록처: Cloudflare Registrar
- 2026-09-24 조회 가격: 첫해 `$10.46`, 갱신 `$10.46/년`

`portfolio_janghyerim.com`처럼 밑줄이 들어간 주소는 웹 호스트명으로 사용할
수 없으므로 하이픈을 사용한다.

## 저장소 준비 상태

- `CNAME`: `www.portfolio-janghyerim.com`
- 모든 HTML 페이지: canonical, description, Open Graph, X/Twitter 메타데이터
- `robots.txt`: 검색 허용 및 사이트맵 주소
- `sitemap.xml`: 공개 HTML 12개 주소
- `.nojekyll`: 정적 파일을 그대로 게시

도메인 구매와 DNS 설정이 끝나기 전까지 준비 브랜치를 `main`에 병합하지
않는다. `CNAME`만 먼저 게시하면 GitHub Pages의 기존 주소 동작에 영향을 줄
수 있다.

## Cloudflare DNS 레코드

Cloudflare에서 도메인을 구매하면 같은 계정에 DNS 영역이 생성된다. 아래
레코드를 추가한다. GitHub의 도메인 검사가 끝날 때까지 모든 레코드의 프록시
상태는 **DNS only**로 둔다.

### 루트 도메인

| Type | Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |

### www

| Type | Name | Value |
|---|---|---|
| CNAME | `www` | `maisondesoma-lgtm.github.io` |

와일드카드 레코드(`*.portfolio-janghyerim.com`)는 추가하지 않는다.

## 연결 순서

1. Cloudflare에서 `portfolio-janghyerim.com`을 구매한다.
2. 위 A, AAAA, CNAME 레코드를 추가한다.
3. `codex/custom-domain-setup` 브랜치를 원격에 올리고 검토한다.
4. 준비 브랜치를 `main`에 병합한다.
5. GitHub 저장소 **Settings → Pages → Custom domain**에
   `www.portfolio-janghyerim.com`을 입력한다.
6. DNS 검사가 완료되면 **Enforce HTTPS**를 켠다.
7. 루트와 `www`, 프로젝트 상세 페이지, 공유 미리보기를 확인한다.

DNS 전파에는 최대 24시간이 걸릴 수 있다. DNS가 정상이라면 GitHub Pages의
HTTPS 인증서는 보통 수분에서 한 시간 안에 준비된다.

## Windows 검증 명령

```powershell
Resolve-DnsName portfolio-janghyerim.com -Type A
Resolve-DnsName www.portfolio-janghyerim.com -Type CNAME
curl.exe -I https://www.portfolio-janghyerim.com/
curl.exe -I https://portfolio-janghyerim.com/
```

기대 결과:

- 루트 A 레코드가 GitHub Pages의 네 주소를 반환
- `www`가 `maisondesoma-lgtm.github.io`를 가리킴
- 두 주소 모두 HTTPS로 열림
- 루트 주소가 `www` 대표 주소로 이동
- 12개 HTML 페이지와 이미지가 정상 표시

## 운영 메모

- Cloudflare Registrar 도메인은 해당 Cloudflare 계정의 네임서버를 계속
  사용해야 한다.
- 등록 오타는 결제 후 환불되지 않을 수 있으므로 결제 직전에 철자를 다시
  확인한다.
- 자동 갱신과 등록자 연락처는 실제 도메인 소유자와 운영 책임에 맞게 정한다.
