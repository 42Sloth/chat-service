<p align='middle'>
<a href='https://github.com/42Sloth/chat-service'><img src='https://user-images.githubusercontent.com/51367622/135373893-9db0c5a8-11d7-4cbf-a1b2-164fdc07eee3.png' width="200px;" alt="ChatPong" /></a></p>
<p align='middle'> <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/42Sloth/chat-service?color=blueviolet"> <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/42Sloth/chat-service"> 

<h1 align='middle'><a href='https://chatpong-42469.web.app/'>https://chatpong-42469.web.app/</a></h1>

---
📚[노션 미팅 로그](https://www.notion.so/chatpong/ChatPong-f25d60c5c889458ca5bda8a5cdbe55f4)에선 더 다양한 정보와 개발 과정을 확인해보세요!

---
<br/>

## 📌 프로젝트 소개

###  채팅 Web App 서비스 
> ❕ **Slack을 벤치 마킹한 채팅 서비스입니다. **❗

- `Firebase`를 활용한 `Serverless` 환경에서 프로젝트를 진행했습니다.
- `Firebase FireStore DB`를 사용하여 DB를 구축하였습니다.

// 데모영상 혹은 캡처 화면 삽입 예정!

<br/>

## 📑 구현 목록

`로그인`

- 이메일, 비밀번호 입력을 통한 로그인 기능.
- react-hook-form 라이브러리를 활용.
- firebase의 Authentication에 있는 유저 정보를 확인하여 유저 확인.

<br/>

`회원 가입`

- 아이디, 닉네임, 비밀번호, 비밀번호 확인 입력을 통한 회원가입 기능.
- react-hook-form 라이브러리 활용.
- firebase의 Authentication에 유저 정보 저장.

<br/>

`채팅`

- Slack을 벤치마킹하여 구현.
- 다수의 사용자가 Mesh 구조 속에서 채팅 가능.
- Firebase Firestore DB를 사용하여 Rooms 컬렉션 구성.

<br/>

`Direct Messages`

- 1:1 채팅 서비스. 
- 특정 유저화면에서 DM 서비스 요청.
-  Firebase Firestore DB를 사용하여 Direct 컬렉션 구성.

<br/>

`Members && Follow`

- Chat 화면 우측에 현재 Room에 속해있는 UserList 노출. 
- User를 Follow하여 Follow List 관리. 

<br/>

## 💻 실행 방법

### 설치

`npm install`

### 실행

`npm start`

### 데모 로그인

ID : `lyh123@naver.com`
PW : `111111`

<br/>

## ⚙ 기술 스택

- Typescript
- React.js
- Recoil
- Firebase FireStore DB
- Styled-Components
