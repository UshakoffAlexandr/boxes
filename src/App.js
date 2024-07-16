import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBox, removeBox } from './components/features/boxSlice';
import styled, { keyframes } from 'styled-components';

//Контейнер по центру
const AppContainer = styled.div`
  text-align: center;
`;

//Контейнер для квадратов
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 200px;
`;

//Стиль для квадратов
const Box = styled.div`
  width: 20%;
  height: 100px;
  margin-right: 10px;
  transition: transform 0.3s ease;
  background-color: ${(props) => props.color};
`;

//Анимация при появлении
const SlideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;


//Анимация при удалении
const SlideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;


//Контроль анимации в зависимости от состояния
const AnimatedBox = styled(Box)`
  animation: ${(props) => (props.isRemoving ? SlideOut : SlideIn)} 0.3s forwards;
`;



function App() {
  const dispatch = useDispatch();
  const boxes = useSelector((state) => state.boxes); //Получение состояния 
  const [isRemoving, setIsRemoving] = useState(false);

  const handleAdd = () => { //Добавить boxes
    dispatch(addBox());
  };

  const handleRemove = () => { //Удалить boxes
    if (boxes.length === 0) return;

    setIsRemoving(true);
    setTimeout(() => {
      dispatch(removeBox());
      setIsRemoving(false);
    }, 300); // Должно совпадать с длительностью анимации
  };


  //Отображаем заголовок, кнопки и контейнер с квадратами. Для каждого квадрата используется анимированный компонент.
  return (
    <AppContainer>
      <h1>Box Manager</h1>
      <button onClick={handleAdd}>Добавить</button>
      <button onClick={handleRemove}>Удалить</button>
      <Container>
        {boxes.map((box, index) => (
          <AnimatedBox
            key={box.id}
            color={box.color}
            isRemoving={isRemoving && index === boxes.length - 1}
          >
            {index + 1}
          </AnimatedBox>
        ))}
      </Container>
    </AppContainer>
  );
}

export default App;
