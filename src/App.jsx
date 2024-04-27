import { useState } from 'react'
import {InputBox} from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'


function App() {

  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }
  
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-slate-500 bg-cover bg-no-repeat"
        
    >
        <div className="w-[50%] flex items-center justify-center gap-0  shadow-2xl drop-shadow-2xl  ">
            <div className="w-1/2 h-80 max-w-md mx-auto border flex justify-center items-center border-gray-60 m-0  p-5 backdrop-blur-sm bg-white/20">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert()
                       
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            className='text-black'
                            label="From"
                            amount={(amount.toFixed(2))}
                            currencyOption={options}
                            onCurrencyChange={(currency) => setFrom(currency)}
                            selectCurrency={from}
                            onAmountChange={(amount) => setAmount(amount)}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-5">
                        <InputBox
                            className='text-black'
                            label="To"
                            amount={(convertedAmount).toFixed(2)}
                            currencyOption={options}
                            onCurrencyChange={(currency) => setTo(currency)}
                            
                            selectCurrency={to}
                            amountDisable
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600/70 text-white px-4 py-3 rounded-lg">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
            <div
            className="w-1/2 h-80 bg-cover bg-no-repeat max-w-md mx-auto"
            style={{
                backgroundImage: `url(https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
            }}
            >

            </div>
        </div>
    </div>
);
}

export default App