import React, {Component} from 'react'
import UserService from '../services/UniversityService';

class UpdateUniversityComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            name: '',
            alpha_two_code: '',
            country: '',
            domain: '',
            web_page: ''
        };
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changealphaTwoCodeHandler = this.changealphaTwoCodeHandler.bind(this);
        this.changeCountryHandler = this.changeCountryHandler.bind(this);
        this.changeDomainHandler = this.changeDomainHandler.bind(this);
        this.changeWebpageHandler = this.changeWebpageHandler.bind(this);
        this.updateUniversity = this.updateUniversity.bind(this);
    }

    componentDidMount() {
        UserService.getUserById(this.state.id).then((res) => {
            let user = res.data;
            this.setState(
                {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    emailId: user.emailId
                });
        });
    }

    updateUniversity = (e) => {
        e.preventDefault();
        let university = {
            firstName: this.state.name,
            alpha_two_code: this.state.alpha_two_code,
            country: this.state.country,
            web_page: this.state.web_page,
            domain: this.state.domain
        };
        console.log('user => ' + JSON.stringify(university));
        console.log('id => ' + JSON.stringify(this.state.id));
        UserService.updateUniversity(university, this.state.id).then(res => {
            this.props.history.push('/university');
        });
    };

    changenameHandler = (event) => {
        this.setState({name: event.target.value});
    };

    changealphaTwoCodeHandler = (event) => {
        this.setState({alpha_two_code: event.target.value});
    };

    changeCountryHandler = (event) => {
        this.setState({country: event.target.value});
    };

    changeDomainHandler = (event) => {
        this.setState({domain: event.target.value});
    };

    changeWebpageHandler = (event) => {
        this.setState({web_page: event.target.value});
    };


    cancel() {
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Update User</h3>
                            <div className="card-body ">
                                <form>
                                    <div className="form-group">
                                        <label> University Name: </label>
                                        <input placeholder="University Name" name="name" className="form-control"
                                               value={this.state.name} onChange={this.changenameHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Alpha Two Code: </label>
                                        <input placeholder="Alpha Two Code" name="alpha_two_code"
                                               className="form-control"
                                               value={this.state.alpha_two_code}
                                               onChange={this.changealphaTwoCodeHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Country: </label>
                                        <input placeholder="Country" name="country" className="form-control"
                                               value={this.state.country} onChange={this.changeCountryHandler}/>
                                    </div>

                                    <div className="form-group">
                                        <label> Domain: </label>
                                        <input placeholder="Domain" name="domain" className="form-control"
                                               value={this.state.domain} onChange={this.changeDomainHandler}/>
                                    </div>

                                    <div className="form-group">
                                        <label> Website: </label>
                                        <input placeholder="Website" name="Website" className="form-control"
                                               value={this.state.web_page} onChange={this.changeWebpageHandler}/>
                                    </div>

                                    <button className="btn btn-success" onClick={this.updateUniversity}>Update</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)}
                                            style={{marginLeft: "10px"}}>Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default UpdateUniversityComponent
