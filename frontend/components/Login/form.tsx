const Form = () => {

    return (
        <div className="signgin_form-container">
            <h2 className="signin_h2"> Sigin in! </h2>
            <div className="signin-inputs">
                <input type="text" placeholder="Email"/>
                <input type="text" placeholder="Password"/>
                <a href="#"> <p> Forgot your password? </p> </a>
                <button className="login-button"> LOGIN. </button>
            </div>
            <div className="signing-form_footer">
                <div>
                    <p> Or connect with: Google</p>
                </div>
                <div>
                    <p> New to shop? </p>
                    <b> JOIN NOW! </b>
                </div>
            </div>
        </div>
    )
}

export default Form