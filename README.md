#210604 프론트 부분 시작 !

#8.3 <Route>만 쓰면 태그가 겹치니깐 <switch>로 묶어 써야함.
    그리고 <Route>태그에 "exact"옵션을 넣어줘야함 => Hashrouter 
    BrowserRouter를 쓰려면 deploy할 때 몇 가지 고려 사항을 더 고려해야함.

#8.8 ThemeProvider를 설치하면 dark mode를 적용할 수 있다.

#8.9 styled-reset으로 모든 css 초기값을 0으로 만들 수 있다.

#10.3 <SButton {...props} # 이런식으로 써져있는데 이렇게 안하면 value같은 값들이 적용이 안됨.
      {children} 을 쓰면 하위 태그를 만들 수 있다.