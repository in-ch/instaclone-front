#210604 프론트 부분 시작 !


#8.0 create react app 을 하면 이제 파일마다 import React from 'react'; 같은 거 안 써도 알아서 지정해 준다. 

#8.3 <Route>만 쓰면 태그가 겹치니깐 <switch>로 묶어 써야함.
    그리고 <Route>태그에 "exact"옵션을 넣어줘야함 => Hashrouter 
    BrowserRouter를 쓰려면 deploy할 때 몇 가지 고려 사항을 더 고려해야함.

#8.8 ThemeProvider를 설치하면 dark mode를 적용할 수 있다.

#8.9 styled-reset으로 모든 css 초기값을 0으로 만들 수 있다.

#10.3 <SButton {...props} # 이런식으로 써져있는데 이렇게 안하면 value같은 값들이 적용이 안됨.
      {children} 을 쓰면 하위 태그를 만들 수 있다.

#10.4 근데 어짜피 굳이 function을 만들 필요가 없어서 이 부분들(10.3에 적은 거) 삭제 ㅋ, 어쩐지 처음보는 거더라.. 

#11.1 <></>를 fragment라고 부른다. 

#11.2 계속 { me:null } 이랬던 이유는 protectResolver 때문임. 
     
#11.3 -> 그럼 왜 Back-end가 token에 반응하지 않았던 걸까?  Localstorage에 분명 token이 있는데 ... 

#11.9 -> writeFragment 및 BSName 그리고 Update를 쓰면 cache에 접근이 가능하고 따라서 cache 수정이 가능하다.

#11.10 -> 만약 writeFragment를 쓰고 싶은데 cache에서 data를 가져올 수 없으면 (부모 컴포넌트에서 자식 컴포넌트로 값을 안 넘겼기 때문..) readFragment()를 쓰면 된다. 
          ㄴapollo client에서 업데이트되어 더 좋은 방법으로 cache를 다룰 수 있게 됐다.

#11.11 sanitize-html을 통해 html inject 해킹을 막을 것이다. -> <Mark>태그를 넣기 위해 .. hashtag...

#11.18 단순히 newComment를 cache.modify해서 넣는다면 정확하게 typename을 지정해 줄 수 없기 때문에 
       cache.writeFragment를 통해 먼저 틀을 만들어 놓고 그것을 cache.modify를 통해 값을 넣어줘야 함. 

#11.19 cache.evict을 활용하면 cache를 지울 수 있다. 

