import React, { useState } from 'react';
import CustomSelect from './CustomSelect';

const Swap = () => {
  const options = [
    { value: 'USDC', label: 'USDC', icon: '/images/coins/coin-big.webp' },
    { value: 'CRO', label: 'CRO', icon: '/images/coins/cronos-cro-logo.png' },
    { value: 'MOON', label: 'MOON', icon: '/images/coins/caw.png' },
    { value: 'WCRO', label: 'WCRO', icon: '/images/coins/cronos-cro-logo.png' },
    { value: 'USDT', label: 'USDT', icon: '/images/coins/usdt.png' },
    { value: 'MERY', label: 'MERY', icon: '/images/coins/mystery-logo.jpg' },
    { value: 'CAW', label: 'CAW', icon: '/images/coins/mystery-logo.jpg' }
  ];

  const [payOption, setPayOption] = useState(options[1]);
  const [receiveOption, setReceiveOption] = useState(options[2]);
  const [payAmount, setPayAmount] = useState('');
  const [receiveAmount, setReceiveAmount] = useState('');

  const handleSelectPay = (option) => {
    setPayOption(option);
  };

  const handleSelectReceive = (option) => {
    setReceiveOption(option);
  };

  const handleSwap = () => {
    setPayOption(receiveOption);
    setReceiveOption(payOption);
    setPayAmount(receiveAmount);
    setReceiveAmount(payAmount);
  };

  return (
    <section id='swap'>
      <div className="swap">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-5 col-md-7 position-relative">
              <div className="form-control-wrapper d-flex flex-row">
                <div className="input-wrapper">
                  <label htmlFor="pay">Pay</label>
                  <input
                    type="text"
                    name="pay"
                    id="pay"
                    placeholder='0'
                    className='form-control'
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                  />
                  <div className="rate">$1.15</div>
                </div>
                <div className="selector-wrapper">
                  <CustomSelect
                    options={options}
                    onSelect={handleSelectPay}
                    defaultOption={payOption}
                  />
                </div>
              </div>
              <button className='btn btn-arrow' onClick={handleSwap}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                </svg>
              </button>
              <div className="form-control-wrapper d-flex flex-row">
                <div className="input-wrapper">
                  <label htmlFor="receive">Receive</label>
                  <input
                    type="text"
                    name="receive"
                    id="receive"
                    placeholder='0'
                    className='form-control'
                    value={receiveAmount}
                    onChange={(e) => setReceiveAmount(e.target.value)}
                  />
                  <div className="rate">$1.15</div>
                </div>
                <div className="selector-wrapper">
                  <CustomSelect
                    options={options}
                    onSelect={handleSelectReceive}
                    defaultOption={receiveOption}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center pt-5">
            <div className="col-12 col-lg-5 col-md-7">
              <div className="row">
                <div className="col-6">
                  <a href="https://corgistudio.io/" target='_blank'>
                    <img src="/images/swap-banner.png" alt="Swap Banner" className='img-fluid' />
                  </a>
                </div>
                <div className="col-6">
                  <a href="https://wolfswap.app/" target='_blank'>
                    <img src="/images/swap-banner-2.png" alt="Swap Banner" className='img-fluid' />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Swap;
