import React, { Component } from 'react'
import UserService from '../services/UniversityService';

class CreateUniversityComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            alpha_two_code: '',
            country: '',
            domain: '',
            web_page : ''
        }
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changealphaTwoCodeHandler = this.changealphaTwoCodeHandler.bind(this);
        this.changeCountryHandler = this.changeCountryHandler.bind(this);
        this.changeDomainHandler = this.changeDomainHandler.bind(this);
        this.changeWebpageHandler= this.changeWebpageHandler.bind(this);
        this.saveOrUpdateUniversity = this.saveOrUpdateUniversity.bind(this);
    }

    componentDidMount(){
        if(this.state.id === '_add'){
            return
        }else{
            UserService.getUserById(this.state.id).then( (res) =>{
                let user = res.data;
                this.setState({
                    name: user.name,
                    country: user.country,
                    emailId : user.emailId
                });
            });
        }        
    }
    saveOrUpdateUniversity = (e) => {
        e.preventDefault();
        let university = {name: this.state.name,
            alpha_two_code: this.state.alpha_two_code,
            domain: this.state.domain,
            web_page: this.state.web_page,
            country: this.state.country
        };
        console.log('university => ' + JSON.stringify(university));

        if(this.state.id === '_add'){
            UserService.createUser(university).then(res =>{
                this.props.history.push('/');
            });
        }else{
            UserService.updateUniversity(university, this.state.id).then( res => {
                this.props.history.push('/');
            });
        }
    }
    
    changenameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changealphaTwoCodeHandler= (event) => {
        this.setState({alpha_two_code: event.target.value});
    }

    changeCountryHandler= (event) => {
        this.setState({country: event.target.value});
    }

    changeDomainHandler= (event) => {
        this.setState({domain: event.target.value});
    }

    changeWebpageHandler= (event) => {
        this.setState({web_page: event.target.value});
    }

    cancel(){
        this.props.history.push('/users');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add University</h3>
        }else{
            return <h3 className="text-center">Update University</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body ">
                                    <form>
                                        <div className = "form-group">
                                            <label> University Name: </label>
                                            <input placeholder="University Name" name="name" className="form-control"
                                                value={this.state.name} onChange={this.changenameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Alpha Two Code: </label>
                                            <input placeholder="Alpha Two Code" name="alpha_two_code" className="form-control"
                                                value={this.state.alpha_two_code} onChange={this.changealphaTwoCodeHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Country: </label>
                                            <input placeholder="Country" name="country" className="form-control"
                                                value={this.state.country} onChange={this.changeCountryHandler}/>
                                        </div>

                                        <div className = "form-group">
                                            <label> Domain: </label>
                                            <input placeholder="Domain" name="domain" className="form-control"
                                                   value={this.state.domain} onChange={this.changeDomainHandler}/>
                                        </div>

                                        <div className = "form-group">
                                            <label> Website: </label>
                                            <input placeholder="Website" name="Website" className="form-control"
                                                   value={this.state.web_page} onChange={this.changeWebpageHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateUniversity}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateUniversityComponent
