# GitHub Pages 커스텀 도메인 연결

## 현재 상태

- 저장소: `maisondesoma-lgtm/maisondesoma-lgtm.github.io`
- 공개 주소: <https://maisondesoma-lgtm.github.io/>
- Pages 상태: `built`
- 게시 소스: `main` 브랜치의 `/`
- HTTPS 강제 적용: 활성화
- 현재 커스텀 도메인: 없음
- 과거 연결 이력: `janghyerim.eu.org`의 `CNAME`이 추가됐다가 삭제됨

사이트는 별도 빌드가 필요 없는 정적 HTML/CSS/JavaScript 구조다. 로컬 파일
참조 검사 결과 누락된 이미지, 스타일시트, 스크립트는 없다.

## 권장 주소 구성

### 보유한 도메인의 서브도메인 사용

`h-andy.com`을 그대로 유지하면서 이 포트폴리오만 별도 주소로 연결하려면
다음 중 하나를 사용한다.

- 권장: `janghyerim.h-andy.com`
- 설명적인 주소: `portfolio-janghyerim.h-andy.com`

이 경우 새 도메인 구매 비용은 없다. GitHub Pages와 Handy 운영 사이트도 서로
다른 서버를 계속 사용할 수 있다. Handy 메인 사이트에 이 주소를 링크하지
않으면 방문자는 주소를 직접 전달받아야만 쉽게 진입할 수 있다. 다만 주소를
아는 사람은 누구나 접속할 수 있으므로 접근 제한 수단은 아니다.

`portfolio_janghyerim`처럼 밑줄이 들어간 값은 웹 호스트명으로 사용하지
않는다. 호스트명은 영문자, 숫자, 하이픈으로 구성하고 하이픈으로 시작하거나
끝내지 않는다.

서브도메인 연결 시 DNS 레코드는 하나면 된다.

| Type | Name | Value |
|---|---|---|
| CNAME | `janghyerim` 또는 `portfolio-janghyerim` | `maisondesoma-lgtm.github.io` |

저장소의 `CNAME`에는 선택한 전체 주소를 한 줄로 적는다.

```text
portfolio-janghyerim.h-andy.com
```

### 새 독립 도메인 사용

`www.portfolio-janghyerim.com`을 쓰려면 `portfolio-janghyerim.com`을
별도로 구매해야 한다. `h-andy.com`을 보유했다는 사실로 다른
`.com` 도메인을 만들 수는 없다.

새 도메인이 `example.com`이라면 다음처럼 구성한다.

- 대표 주소: `www.example.com`
- 루트 주소: `example.com` → GitHub Pages가 대표 주소로 리디렉션

GitHub는 HTTPS 사이트에서 apex와 `www`를 함께 설정하는 방식을 권장한다.
와일드카드 DNS 레코드(`*.example.com`)는 사용하지 않는다.

## 링크를 받은 사람 중심으로 공개하려면

Handy 홈페이지에서 포트폴리오 주소로 연결되는 링크를 만들지 않고, 검색
노출도 줄이려면 각 HTML의 `head`에 다음 메타 태그를 넣는다.

```html
<meta name="robots" content="noindex, nofollow, noarchive">
```

이 설정은 검색엔진에 색인하지 말라고 요청하는 용도다. 비밀번호나 접근
통제는 아니므로 URL을 아는 사람은 접속할 수 있다. 실제 비공개가 필요하면
GitHub Pages 대신 인증 기능이 있는 호스팅 또는 접근 게이트를 사용한다.

`https://h-andy.com/portfolio/janghyerim` 같은 경로형 주소도 가능하지만,
DNS만으로는 만들 수 없다. Handy 웹 프로젝트가 포트폴리오 파일을 직접
호스팅하거나 프록시·리라이트 규칙을 추가해야 하므로 서브도메인 연결보다
작업 범위와 결합도가 커진다.

## 도메인 확정 후 저장소 변경

저장소 루트에 확장자 없는 `CNAME` 파일을 만들고 대표 주소 한 줄만 입력한다.

```text
www.example.com
```

그 뒤 `main`에 반영하면 GitHub Pages가 이 파일을 읽는다. GitHub의
**Settings → Pages → Custom domain**에서 같은 값을 저장해도 `CNAME` 파일이
자동 생성된다.

## 새 독립 도메인의 DNS 설정

### 루트 도메인

DNS 공급자에서 다음 A 레코드 네 개를 추가한다.

| Type | Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

IPv6를 사용할 경우 다음 AAAA 레코드도 추가한다.

| Type | Name | Value |
|---|---|---|
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |

### www

| Type | Name | Value |
|---|---|---|
| CNAME | `www` | `maisondesoma-lgtm.github.io` |

Cloudflare를 사용한다면 최초 인증서 발급과 GitHub DNS 검사 중에는 GitHub가
레코드를 직접 확인할 수 있도록 프록시 상태를 **DNS only**로 두는 편이
안정적이다.

## 연결 순서

1. 도메인을 구매하거나 기존 도메인의 DNS 관리 화면을 연다.
2. 위 A/AAAA/CNAME 레코드를 등록한다.
3. GitHub 저장소 **Settings → Pages → Custom domain**에
   `www.example.com`을 입력한다.
4. DNS 검사가 완료될 때까지 기다린다.
5. 인증서가 발급되면 **Enforce HTTPS**를 확인한다.
6. 루트와 `www` 주소, 모든 프로젝트 상세 페이지를 확인한다.

DNS 전파에는 최대 24시간이 걸릴 수 있고, DNS가 정상이라면 HTTPS 인증서는
보통 수분에서 한 시간 안에 준비된다.

## Windows 검증 명령

```powershell
Resolve-DnsName example.com -Type A
Resolve-DnsName www.example.com -Type CNAME
curl.exe -I https://www.example.com/
curl.exe -I https://example.com/
```

기대 결과:

- 루트 A 레코드가 GitHub Pages 네 주소 중 하나 이상을 반환
- `www`가 `maisondesoma-lgtm.github.io`를 가리킴
- HTTPS 요청이 성공
- 루트와 `www` 중 한쪽이 대표 주소로 정규화

## 도메인 연결 후 추가할 항목

도메인이 확정되면 다음 파일의 절대 주소를 새 도메인으로 작성한다.

- `CNAME`
- `robots.txt`
- `sitemap.xml`
- `index.html`의 canonical, Open Graph URL과 공유 이미지

도메인이 정해지기 전에는 잘못된 검색 색인을 막기 위해 이 값들을 임의로
추가하지 않는다.
