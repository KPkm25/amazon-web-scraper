import logo from "../images/logo.jpg"

const Header=()=>{

    const today=new Date().toString().slice(0,10);
    return (
        <header>
            <div>
                <h1>DealFinder</h1>
                <p>{today}</p>
            </div>
            <div className="logo-container">
                <img src={logo} alt="logo" className="logo"/>
            </div>
        </header>

    )
}
export default Header;