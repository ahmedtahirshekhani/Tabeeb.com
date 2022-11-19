import logo from './logo.svg';
import './App.css';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import homebanner from './assets/images/homebanner.jpg';


function App() {
  return (
    <>
      <Header/>
    <div className="App">
      <div className='app-text'>

          <img src={homebanner} className="App-logo" alt="banner"  />

        <h1 className='text-4xl font-bold'>Are You Looking For A Doctor?</h1>
        <p>
        Tabeeb is the Digital Healthcare Solution for the people of Pakistan. It is designed to address the Medical and Health issues posed to patients and doctors.
        </p>
        </div>
        
    </div>
      <Footer/>

      </>
  );
}

export default App;
