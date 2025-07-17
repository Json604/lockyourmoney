import Aurora from './components/Aurora';
import './style/Aurora.css'
import phoneImg from './assets/phoneMockup.png'

function App() {

  return (
    <>
    <Aurora
      colorStops={["#707070", "#FCFF66", "#707070"]}
      blend={0.4}
      amplitude={1.0}
      speed={1.0}
    />
    <div className='hero'>
      <div className='phone-container'>
        <img src={phoneImg} alt='mockPhone'/>
      </div>
      <div className='textR'>
        <h1 className="tagline">Secure Your Savings.</h1>
        <h1 className="tagline bold">Control Your <span style={{color: '#FFD700'}}>Spending.</span></h1>
        <p className="subtitle">Take control of your financial future with our innovative savings lock system.</p>
        <div className='waitlist'>
          <form onSubmit={(e) => {
            e.preventDefault();
            // Add your logic here (e.g. send to backend)
            console.log("Valid email submitted:", e.target.email.value);
          }}>
            <input
              name="email"
              type="email"
              placeholder="enter your email address"
              required
            />
            <button type="submit">Join Waitlist</button>
          </form>
        </div>

      </div>
    </div>
    </>
  )
}

export default App
