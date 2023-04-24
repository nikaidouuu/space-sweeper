# Space Sweeper

## Introduction
[![Space Sweeper Youtube](https://img.youtube.com/vi/BHA27cM-pHA/0.jpg)](https://youtu.be/BHA27cM-pHA)

[Space Sweeper](https://adoring-archimedes-c37b4b.netlify.app/)는 별도의 라이브러리를 사용하지 않고 구현한 2D 종스크롤 웹 슈팅 게임입니다. 파워업 아이템을 획득해 탄막을 강화시키고, 적과 보스를 처치할 수 있습니다.

## Control
- 이동 - **WASD**
- 탄막 발사 - **Z**
- 시작 - **Enter**
- 일시 정지 - **ESC**

## Motivation

### Why Canvas API?
평소 웹으로 그래픽을 다루는 기술에 관심이 있었고, 두 번째 프로젝트엔 **낯선 분야에 도전**하고파 Canvas API를 활용하기로 결정했습니다.

### Why 2D Shooting Game?
짧은 시간 내에 가시적인 성과를 내기 위해선 2D 슈팅 게임이 적절하다 판단했고, 게임이라는 특성을 고려해 객체지향 프로그래밍에 도전하게 됐습니다.

## Tech Stack
- TypeScript
- SCSS
- Canvas API
- Parcel

## Project Tool

### Version Control
- Git
- Github

### Schedule Management
- Notion

## Installation
```sh
$ git clone https://github.com/nikaidouuu/space-sweeper.git
$ cd space-sweeper
$ yarn install
$ yarn start
```

## Challenges
- 두 벡터 간의 거리를 재서 충돌 판정을 계산, 호밍 샷 구현을 위해 벡터곱(cross product)을 구하고 임의의 각도만큼 회전시키는 등의 **수학적인 로직들을 static 메서드**(ex: `Vector.calcDistance`)로 사용해 가독성을 높이려 노력했습니다.
- 객체 지향 방식으로 프로그래밍하려 노력했지만 짧은 시간 동안 조사한 지식으론 역부족이라 스스로 느꼈고, 프로젝트를 끝낸 후 객체지향의 사실과 오해란 책을 찾아 읽게 됐습니다. **잦은 상속과 몇몇 프로퍼티의 접근 제한자를 public으로 설정**함으로 인해 캡슐화를 깨고, **데이터 주도 설계 방식**으로 프로그래밍한 점을 반성했고, **어떤 행위(method)가 필요한지 먼저 결정하고 상호작용하게 될 객체들을 설계**하는 것이 더 유연한 방식이라는 것을 깨달았습니다. 이번 프로젝트를 통해 프로그래밍 패러다임들에 대해 더 공부해서 좋은 코드를 쓰고 싶단 열망이 더욱 커졌습니다.
