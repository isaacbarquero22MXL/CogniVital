import React from 'react'

const MoneyOptions = ({ handleOnMoneyClickParent }) => {

    // Money types
    const moneyTypes = [
        {
            name: "5 colones",
            img: require("./../../assets/img/money/5-colones.png"),
            value: 5,
            isCoin: true,
        },
        {
            name: "10 colones",
            img: require("./../../assets/img/money/10-colones.png"),
            value: 10,
            isCoin: true,
        },
        {
            name: "25 colones",
            img: require("./../../assets/img/money/25-colones.png"),
            value: 25,
            isCoin: true,
        },
        {
            name: "50 colones",
            img: require("./../../assets/img/money/50-colones.png"),
            value: 50,
            isCoin: true,
        },
        {
            name: "100 colones",
            img: require("./../../assets/img/money/100-colones.png"),
            value: 100,
            isCoin: true,
        },
        {
            name: "500 colones",
            img: require("./../../assets/img/money/500-colones.png"),
            value: 500,
            isCoin: true,
        },
        {
            name: "1000 colones",
            img: require("./../../assets/img/money//1000-colones.jpg"),
            value: 1000,
            isCoin: false,
        },
        {
            name: "2000 colones",
            img: require("./../../assets/img/money/2000-colones.jpg"),
            value: 2000,
            isCoin: false,
        },
        {
            name: "5000 colones",
            img: require("./../../assets/img/money/5000-colones.jpg"),
            value: 5000,
            isCoin: false,
        },
        {
            name: "10000 colones",
            img: require("./../../assets/img/money//10000-colones.jpg"),
            value: 10000,
            isCoin: false,
        },
        {
            name: "20000 colones",
            img: require("./../../assets/img/money/20000-colones.jpg"),
            value: 20000,
            isCoin: false,
        },
    ]

    // handle on select money event
    const handleOnMoneyClick = (money) => {
        handleOnMoneyClickParent(money)
    }
  return (
    <div className='money-options-wrapper rounded-[.25rem] w-[100%] mx-auto mb-[5rem]'>
        {moneyTypes.map((money) => (
            <div key={money.name} className="m-[1rem] pointer" onClick={() => handleOnMoneyClick(money)}>
                <img src={money.img} alt={money.name} className={`${money.isCoin ? 'coin' : 'bill'}`}/>
            </div>
        ))}
    </div>
  )
}

export default MoneyOptions