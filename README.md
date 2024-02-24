# 소분소분

[1. 프로젝트 소개](#1-프로젝트-소개)

[2. 화면 구성 및 주요 기능](#2-화면-구성-및-주요-기능)

[3. 기술적 의사결정](#3-기술적-의사결정)

[4. 개선사항](#4-개선사항)

[5. 트러블 슈팅](#5-트러블-슈팅)

[6. 아키텍처](#6-아키텍처)

[7. 프로젝트 기술 스택](#7-프로젝트-기술-스택)

[8. 팀원 소개](#8-팀원-소개)

[9. 팀원 역할](#9-팀원-역할)

## 1. 프로젝트 소개
<p align="center"><img src="https://github.com/project-team-six/FE/assets/134919218/d6b803d9-3c03-47cf-8efd-9425a8e51e9e"></p>
혼자왔냐? 많이있다. 분배파티! 
<br>
매 여름, 1인가구로 살아가면서 맛있는 수박을 먹고 싶을 때 ‘이걸 내가 다 먹을 수 있을까’ 고민하지 않으시나요? 그래서 저희는 동네 이웃들과 물건을 함께 살 수 있는 플랫폼인 소분소분 프로젝트를 기획하였습니다.
</br>

## 1. 화면 구성 및 주요 기능
[화면 구성 및 주요 기능 🔗](https://github.com/project-team-six/FE/wiki/%ED%99%94%EB%A9%B4-%EA%B5%AC%EC%84%B1-%EB%B0%8F-%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5)

<br>

## 2. 기술적 의사결정
[기술적 의사결정 🔗](https://github.com/project-team-six/FE/wiki/%EA%B8%B0%EC%88%A0%EC%A0%81-%EC%9D%98%EC%82%AC%EA%B2%B0%EC%A0%95)

<br>

## 3. 트러블슈팅

### 1 ) [리덕스 상태관리 🔗](https://github.com/project-team-six/FE/blob/dev/src/redux/modules/user.ts)

#### ⓵ 문제 상황
    현재 로그인된 사용자의 정보를 전역적으로 사용해야 해서 리덕스 튤킷을 사용했는데 브라우저를 새로고침하는 순간 리덕스 저장소가 초기화되어버리는 문제가 발생했습니다.
#### ⓶ 문제 원인
    리덕스는 전역적으로 상태를 관리할 수 있게 도와주는 도구이지만 JavaScript 함수로 작동하기 때문에 SPA(Single Page Application)에서 사용할 때 특별한 고려 사항이 있습니다.

    SPA에서 페이지를 이동할 때, 실제로는 브라우저의 링크로 이동하는 것이 아니라 히스토리 객체를 변경하는 방식을 사용합니다. 이로 인해 직접 주소창을 건드리거나 페이지를 새로고침할 때, 리덕스 스토어는 자바스크립트 메모리에 저장된 상태로 남아 있지 않고 초기값으로 리셋됩니다.
#### ⓷ 해결 방법
    브라우저 새로고침 시 리덕스 저장소가 초기화 되는 것을 막기 위해 `redux-persist`를 사용했습니다.

    `redux-persist`는 Redux 애플리케이션에서 상태를 지속적으로 저장하고, 브라우저 새로고침 또는 애플리케이션을 다시 시작할 때 이전 상태를 복원하기 위한 라이브러리입니다. 

    이 라이브러리를 사용하면 Redux 스토어의 상태를 로컬 스토리지 또는 다른 영속성 저장소에 저장하고, 필요할 때 다시 불러와서 사용할 수 있습니다. 

    `redux-persist`는 아래와 같은 특징이 있어 브라우저 새로고침 시에도 저장소가 초기화되지 않습니다.

    1. 데이터 영속성 : Redux 스토어의 상태를 로컬 스토리지, 세션 스토리지 또는 다른 영속성 저장소에 저장하여 브라우저 새로고침 또는 애플리케이션 재시작과 관계없이 상태 데이터가 유지됩니다.
    2. 자동 복원 : 이전에 저장한 상태를 로드하여 Redux 스토어에 자동으로 복원하기 때문에 저장소가 초기화되지 않습니다.

----- 

### 2 ) [JWT 관리 🔗](https://github.com/project-team-six/FE/blob/dev/src/api/instance.ts)

 #### ⓵ 문제 상황
    상황1) 로그인이 실패했는데 쿠키에 undefined 값이 저장되어 올바른 정보로 로그인 시도해도 로그인할 수 없는 현상이 발생했습니다.

    상황2) accessToken이 만료되었을 때, refreshToken 값을 사용해서 새로운 accessToken을 발급했지만 쿠키에는 바로 반영되지 않는 문제가 발생했습니다.

    상황3) 로그인 후 브라우저를 닫고 새로 열었을 때 이전에 로그인한 토큰 정보가 남아 있어 페이지가 제대로 동작하지 않는 문제가 발생했습니다.
 #### ⓶ 문제 원인
    상황1 원인) redis 에 있는 refreshToken과 클라이언트에서 전달된 refreshToken을 string 값 하나하나 오차없이 완전히 일치했을때만 accessToken 을 발급해주어서 유효성에서 처리되지 못하고 undefined 값이 날아와서 오류가 발생했던 것으로 확인했습니다.

    상황2 원인) 이전 accessToken 값을 삭제하지 않고 바로 새로운 accessToken 값을 넣으려고 해서 오류가 발생했던 것으로 확인했습니다.

    상황3 원인) 브라우저를 닫을 때 accessToken 값을 지우는 작업을 해주지 않아 발생했던 오류로 확인했습니다.

#### ⓷ 해결 방법
    상황1 해결방법) interceptors.request 에서 accessToken 의 값이 날아올 때 falsy 한 값이면 토큰을 바로 삭제했습니다.

    상황2 해결방법) 기존 accessToken 만료되어 서버에서 새로운 accessToken 값을 주었을 때 해당 값으로 변경될 수 있도록 코드를 작성했습니다. 

    상황3 해결방법) 토큰 보관소를 쿠키에서 세션스토리지로 변경하였습니다.

<br>

## 4. 프로젝트 아키텍처
<p align="center"><img src="https://github.com/project-team-six/FE/assets/134919218/7dbdf2f0-c2e7-4ce0-b83a-dafd926dbcef" alt="Architecture"></p>
<br>

## 5. 기술 스택
<img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white">
 <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white"/>
 <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"/>
 <img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"/>
 <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"/>
 <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"/>
<img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=for-the-badge&logo=Amazon AWS&logoColor=white"/>
<br>

## 6. 팀원 소개
<table>
  <thead>
    <tr>
      <th align="center">프론트엔드</th>
      <th align="center">프론트엔드</th>
      <th align="center">프론트엔드</th>
      <th align="center">백엔드</th>
      <th align="center">백엔드</th>
      <th align="center">백엔드</th>
      <th align="center">백엔드</th>
    </tr>
  </thead>
  <tbody>
<tr>
<td align="center"><a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/project-team-six/FE/assets/130561236/5feb28fd-fc06-4a10-9e69-5a1205e22361"><img src="https://github.com/project-team-six/FE/assets/130561236/5feb28fd-fc06-4a10-9e69-5a1205e22361" alt="하은" style="max-width: 100%;"></a></td>
<td align="center"><a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/project-team-six/FE/assets/130561236/8e460779-27af-42bf-aa0e-24226ca2ffd6"><img src="https://github.com/project-team-six/FE/assets/130561236/8e460779-27af-42bf-aa0e-24226ca2ffd6" alt="채연" style="max-width: 100%;"></a></td>
<td align="center"><a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/project-team-six/FE/assets/130561236/d396954f-ac6f-41be-bb09-724ab0058000"><img src="https://github.com/project-team-six/FE/assets/130561236/d396954f-ac6f-41be-bb09-724ab0058000" alt="은지" style="max-width: 100%; height: auto;"></a></td>
<td align="center"><a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/project-team-six/FE/assets/130561236/05867560-56ef-4447-bc14-c8820d312289"><img src="https://github.com/project-team-six/FE/assets/130561236/05867560-56ef-4447-bc14-c8820d312289" alt="길규" style="max-width: 100%;"></a></td>
<td align="center"><a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/project-team-six/FE/assets/130561236/ee9ff4fa-c7ac-4e9d-b869-69020a4fc826"><img src="https://github.com/project-team-six/FE/assets/130561236/ee9ff4fa-c7ac-4e9d-b869-69020a4fc826" alt="광균" style="max-width: 100%;"></a></td>
<td align="center"><a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/project-team-six/FE/assets/130561236/86a7df1f-d8be-40e3-96aa-1f8f1013a03e"><img src="https://github.com/project-team-six/FE/assets/130561236/86a7df1f-d8be-40e3-96aa-1f8f1013a03e" alt="유진" style="max-width: 100%;"></a></td>
<td align="center"><a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/project-team-six/FE/assets/130561236/79dead80-bab3-41d8-bf24-89dcdebc3297"><img src="https://github.com/project-team-six/FE/assets/130561236/79dead80-bab3-41d8-bf24-89dcdebc3297" alt="경환" style="max-width: 100%;"></a></td>
</tr>
<tr>
<td align="center"><a href="https://github.com/haniStudy">하은</a></td>
<td align="center"><a href="https://github.com/richeeee128">채연</a></td>
<td align="center"><a href="https://github.com/hotcream3904">은지</a></td>
<td align="center"><a href="https://github.com/gilgyujeong">길규</a></td>
<td align="center"><a href="https://github.com/kwangkyunkim">광균</a></td>
<td align="center"><a href="https://github.com/kkamjjing-i">유진</a></td>
<td align="center"><a href="https://github.com/cubeninggen">경환</a></td>
</tr>
</tbody>
</table>