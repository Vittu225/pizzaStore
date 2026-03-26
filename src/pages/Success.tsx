import confetti from 'canvas-confetti'
import React, { useEffect } from 'react'
import { Link } from 'react-router'

const Success = () => {
    useEffect(() => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#fe5f1e', '#202020', '#ffdf8c'],
          });
    }, [])
  return (
    <div className="container container--cart">
    <div className="cart cart--empty">
      <h2>Заказ оформлен! 🎉</h2>
      <p>Ваша пицца уже готовится. Спасибо, что выбрали нас!</p>
      <Link to="/" className="button button--black">
        <span>Назад на главную</span>
      </Link>
    </div>
  </div>
  )
}

export default Success