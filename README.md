## prisma schema

- [x] 각 모델 데이터 생성

## User

- [x] 계정 생성
- [x] secret요청(메일건 서비스)
- [x] secret확인(토큰 생성)
- [x] login(토큰 생성)
- [x] aws s3 연동 (upload기능)
- [x] me
- [x] isMe
- [x] seeFollowings
- [x] toggleFollowing
- [x] favoritePosts / toggle
- [x] seeFavoritePost

## UserPost

- [x] uploadPost
- [x] editUserPost
- [] deletePost //삭제 기능 넣지 말자 -> 이유 : 서비스 초기에는 정보들이 쌓여야 함
- [x] seeUserPost
- [x] seeUserAllPost
- [x] totalUserPostLikes (computed)
- [x] toggleUserPostLike
- [x] seeUserPostComments

## UserPostComment

- [x] isMine(computed)
- [x] createComment
- [x] editComment
- [x] deleteComment

---

## Company

- [x] isMyCompany
- [x] seeFollowers
- [x] createComapny
- [x] isFollowing
- [x] totalFollowers

## CompanyPost

- [x] uploadPost
- [x] editCompanyPost 오져따,, 완료
- [x] deletePost
- [x] seeCompanyPost
- [x] seeCompanyAllPost
- [x] totalCompanyPostLikes (computed)
- [x] toggleCompanyPostLike
- [x] seeCompanyPostComments

## CompanyPostComment

- [x] isMine(computed)
- [x] createComment
- [x] editComment
- [x] deleteComment

---

      // to be
      - 회사 가입 시, 주소 부분 분류를 어떻게 할까나
      - uploadPost(회사, 유저 둘다) 부분에 이미지 업로드는 복수형으로 배열로 나중에 바꿔주어야 한다. 지금은 사진 1개만 업로드 가능 하게 해놓음.
      **https://mygumi.tistory.com/320 ==> 버킷 파일 삭제 방법


      // 의사 결정
      - search user를 해야 할까??
      - 해쉬태그 / 채팅 기능 해야 할까?
      - edit(user/post(user,company)) 부분에서 동일 사진 그대로 쓸 경우, 현재는 기존 파일 삭제 후 동일한 사진 새롭게 업로드 하는 로직임. 그대로 해야 할까?

      야호!
