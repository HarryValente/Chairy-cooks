
export default({}) => {
  const 
}
class ContactForm extends Component {

  constructor(props) {
    super(props)
    this.myForm = React.createRef()
  }

  state = {
    name: '',
    email: '',
    number: '',
    about: ''
  }

  changHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  submitHangler = (e) => {
      e.preventDefault();
      this.myForm.current.reset()
      this.setState({
        name: '',
        email: '',
        number: '',
        about: ''
      })

      let bodyData = {
        name: `${this.state.name}`,
        email: `${this.state.email}`,
        number: `${this.state.number}`,
        about: `${this.state.about}`
      }

      console.log(typeof bodyData);
      
      fetch('https://us-central1-vapta-website-v2.cloudfunctions.net/getInsuranceEmail', {
        method: 'POST',
        
        headers: {
          'Content-Type': 'text/plain',
          'Accept': 'application/json'
        },
        
        body: JSON.stringify(bodyData)
        
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
      
      // const toastContainer = document.getElementById('toasts')

      // createNotification()
      // function createNotification(){
      //   const notif = document.createElement('div')
      //   notif.classList.add('toastNotif')
    
      //   notif.innerText = 'Message sent'
    
      //   toastContainer.appendChild(notif)
    
      //   setTimeout(() => {
      //       notif.remove()
      //   }, 3000)

      //   console.log(notif);
      // }
  
  }


  render() {
    return (
      <div className="contact-box text-center">
        <form ref={this.myForm} onSubmit={this.submitHangler} className="contact-form" id="contactForm" noValidate="novalidate">
          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Company name"
                required="required"
                onChange={this.changHandler}
                value={this.state.name}
                />
              </div>

              <div className="form-group">
                <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
                required="required"
                onChange={this.changHandler}
                value={this.state.email}
                />
              </div>
              <div className="form-group">
                <input
                type="number"
                className="form-control"
                name="number"
                placeholder="Phone Number"
                required="required"
                onChange={this.changHandler}
                value={this.state.number}
                />
              </div>

            </div>
            <div className="col-12">
                <div className="form-group">
                    <textarea
                    className="form-control"
                    name="about"
                    placeholder="Size of fleet / Fleet insurance, breakdown cover or both"
                    required="required"
                    onChange={this.changHandler}
                    value={this.state.about}
                    />
                </div>
            </div>


            <div className="col-12">
                <button
                    type="submit"
                    className="btn btn-lg btn-block mt-3"><span className="text-white pr-3"><i className="fas fa-paper-plane" /></span>
                    Get a quote
                </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}


export default