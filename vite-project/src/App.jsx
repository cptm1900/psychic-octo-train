import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  // 리액트 앱은 컴포넌트로 구성됨
  // 리액트 컴포넌트는 마크업을 반환하는 자바스크립트 함수
  // 리액트 컴포넌트의 이름은 항상 대문자로 시작해야 함 (HTML태그는 항상 소문자로 시작함)
  // ex) <MyButton />
  return (
    <div>
      <h1>Welcome to my apps</h1>
      <MyButton />
      <AboutPage />
      <Profile />
      <IsLoggedIn />
    </div>
  )
}

// 리액트 css는 HTML의 class 대신에 className으로 함
// (id도 사용이 가능하나 리액트 컴포넌트는 페이지 여러 곳에 재사용이 가능하므로 id 중복이 생길 수 있어서 안 씀)
// CSS 파일 추가는 기존에 하듯이 HTML(index.html)에 <link> 태그를 사용해서 추가
function MyButton() {
  return (
    <button className="my_button">I'm a button</button>
  )
}

// 하나의 리액트 컴포넌트는 여러 개의 JSX 태그를 반환할 수 없음
// <div></div> 또는 <></> 같은 공유되는 부모로 감싸야 함
function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Hello there.<br />How do you do?</p>
    </>
  )
}

const user = {
  name : 'Hedy Lamarr',
  imageUrl : 'https://react.dev/images/docs/scientists/yXOvdOSs.jpg',
  imageSize : 150
};
// 따옴표 대신에 중괄호를 사용하여 JSX 어트리뷰트에서 자바스크립트로 이스케이프 가능 (EL이나 템플릿처럼)
// style{{}}는 특별한 문법이 아니라 style={} 안에 있는 {} 객체
// 리액트의 style 속성은 HTML처럼 style="width: 90px;" 이런 문자열로 받는 게 아니라 자바스크립트 객체로 받음
// style 밖의 괄호는 JSX 안에서 자바스크립트를 쓰기 위한 괄호고 안쪽의 괄호는 자바스크립트 객체 ( {속성: 값} )
// 만약에 const myStyle = {width: user.imageSize, height: user.imageSize} 이렇게 객체를 미리 선언해두면
// <img style={myStyle} src={user.imageUrl} /> 이렇게도 가능
function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img className = "avatar" src={user.imageUrl} alt={'Photo of ' + user.name}
            style = {{width:user.imageSize, height:user.imageSize}} />
    </>
  )
}

// 조건문을 사용할 때는 특별한 문법 필요없이 자바스크립트처럼 사용하면 됨
// 삼항연산자도 가능 (삼항연산자는 if문하고 다르게 자바스크립트가 아니라 JSX 내에서도 동작 가능)
// JSX 내에서 동작한다는 뜻은 return문 안에서 동작한다는 뜻
// {isLoggedIn && <AdminPanel />} ==> isLoggedIn이 참이면 <AdminPanel /> 반환
function IsLoggedIn() {
  let content;
  let isLoggedIn = false;
  if (isLoggedIn) {
    content = <AdminPanel />;
  } else {
    content = <LoginForm />;
  }
  return (
    <>
      <div>
        {content}
      </div>

      <div>
        {isLoggedIn ? <AdminPanel /> : <LoginForm />}
      </div>

      <div>
        { isLoggedIn ? (
            <AdminPanel />
          ) : (
            <LoginForm />
          )}
      </div>

      <div>
        {isLoggedIn && <AdminPanel />}
      </div>
    </>
  )
}
function AdminPanel() {
  return (
    <p>AdminPanel</p>
  )
}
function LoginForm() {
  return (
    <p>LoginForm</p>
  )
}

export default App
