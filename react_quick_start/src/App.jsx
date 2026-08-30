import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {

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
      <ShoppingList />
      <EventHandler />
      <ButtonState />
      <ManyState />
      <Share />
    </div>
  );
}

// 리액트 css는 HTML의 class 대신에 className으로 함
// (id도 사용이 가능하나 리액트 컴포넌트는 페이지 여러 곳에 재사용이 가능하므로 id 중복이 생길 수 있어서 안 씀)
// CSS 파일 추가는 기존에 하듯이 HTML(index.html)에 <link> 태그를 사용해서 추가
function MyButton() {
  return (
    <button className="my_button">I'm a button</button>
  );
}

// 하나의 리액트 컴포넌트는 여러 개의 JSX 태그를 반환할 수 없음
// <div></div> 또는 <></> 같은 공유되는 부모로 감싸야 함
function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Hello there.<br />How do you do?</p>
    </>
  );
}

const user = {
  name : 'Hedy Lamarr',
  imageUrl : 'https://react.dev/images/docs/scientists/yXOvdOSs.jpg',
  imageSize : 150
};
// 따옴표 대신에 중괄호를 사용하여 JSX 어트리뷰트에서 자바스크립트로 이스케이프 가능 (EL이나 템플릿처럼)
// style{{}}는 특별한 문법이 아니라 style={} 안에 있는 {} 객체
// 리액트의 style 속성은 HTML처럼 style="width: 90px;" 이런 문자열로 받는 게 아니라 자바스크립트 객체로 받음
// 따라서 style="" 이런 식으로 쓰면 안 되고 무조건 style={} 이런 식으로 써야 됨
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
  );
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
  );
}
function AdminPanel() {
  return (
    <p>AdminPanel</p>
  );
}
function LoginForm() {
  return (
    <p>LoginForm</p>
  );
}

// 리스트에서도 자바스크립트 기능인 for문하고 map()함수 사용 가능
const products = [
  { title: 'Cabbage', isFruit: false, id: 1},
  { title: 'Garlic', isFruit: false, id: 2},
  { title: 'Apple', isFruit: true, id: 3}
]
// 목록의 각 항목에 대해서 고유하게 식별하는 문자열 또는 숫자를 전달해야돼서 key 어트리뷰트를 넣음
// 리액트는 나중에 항목을 삽입, 삭제 또는 재정렬할 때 어떤 일이 일어났는지 알기 위해 key를 사용
function ShoppingList() {
  const listItems = products.map(product =>
    <li key={product.id} style={{color: product.isFruit ? 'magenta' : 'darkgreen'}}>
      {product.title}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

// 이벤트 핸들러 함수
// button 태그의 onClick 어트리뷰트 함수명 끝에 소괄호가 없다는 것에 주의
// 소괄호가 없어야 이벤트 핸들러 함수를 호출하지 않고 전달만 함
function EventHandler() {
  function handleClick() {
    alert('You clicked me!');
  }
  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}

// State (컴포넌트가 특정 정보를 기억하여 표시하기를 원하는 경우 사용)
// import {useState} from 'react'; 먼저 써야함
function ButtonState() {
  // useState로부터 현재 State(count)와 이를 업데이트할 수 있는 함수(setCount)를 얻을 수 있음
  // 관례적으로 [something, setSomething]으로 작성하는 것이 일반적
  // 버튼이 처음 표시될 때는 useState()에 0을 전달했기 때문에 count가 0이 됨
  const [count, setCount] = useState(0);

  function handleClick() {
    // 새 값 전달
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}

// 같은 컴포넌트를 여러 번 렌더링하면 각각의 컴포넌트는 고유한 State를 얻게 됨
// 다음과 같은 경우 각 버튼이 고유한 count State를 기억하고 다른 버튼에 영향을 주지 않음
function ManyState() {
  return (
    <>
      <h1>Counters that update serparately</h1>
      <ButtonState />
      <ButtonState />
    </>
  );
}

// use로 시작하는 함수를 Hook이라고 함 (useState도 리액트에서 제공하는 내장 Hook)
// Hook은 다른 함수보다 더 제한적임 컴포넌트(또는 다른 Hook)의 상단에서만 Hook을 호출할 수 있음
// 조건이나 반복에서 useState를 사용하고 싶으면 새 컴포넌트를 추출하여 그곳에 넣어야 함
function Share() {

  // 데이터를 공유하고 항상 함께 업데이트하기 위한 컴포넌트를 만들려면
  // State를 개별 버튼에서 모든 버튼이 포함된 가장 가까운 컴포넌트로 위쪽으로 이동해야 함
  // 그 다음 공유된 클릭 핸들러와 함께 Share에서 각 ShareButton으로 State를 전달
  // 이렇게 전달된 정보를 Props라고 함
  // 이제 Share 컴포넌트는 count State와 handleClick 이벤트 핸들러를 포함하며
  // 이 두 가지를 각 버튼에 Props로 전달
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <>
      <h1>Counters that update together</h1>
      <ShareButton count={count} onClick={handleClick} />
      <ShareButton count={count} onClick={handleClick} />
    </>
  )
}
// 부모 컴포넌트에서 전달한 Props를 읽음
function ShareButton({ count, onClick} ) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}

export default App
