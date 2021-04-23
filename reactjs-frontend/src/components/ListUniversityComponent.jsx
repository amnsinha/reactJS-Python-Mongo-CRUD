import React, {Component} from 'react'
import UniversityService from '../services/UniversityService'
import LinkPreview from '@ashwamegh/react-link-preview'

class ListUniversityComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: null,
            users: []
        };
        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser(id) {
        UniversityService.deleteUniversity(id).then(res => {
            this.setState({users: this.state.users.filter(user => user.id !== id)});
        });
    }

    viewUser(id) {
        this.props.history.push(`/view-university/${id}`);
    }

    editUser(id) {
        this.props.history.push(`/add-university/${id}`);
    }

    componentDidMount() {
        UniversityService.getUsers().then((res) => {
            this.setState({users: res.data});
        });
    }

    addUser() {
        this.props.history.push('/add-university/_add');
    }

    searchSpace = (event) => {
        let keyword = event.target.value;
        this.setState({search: keyword})
    };

    searchSpace = (event) => {
        let keyword = event.target.value;
        this.setState({search: keyword});

        UniversityService.searchUniversity(keyword).then((res) => {
            this.setState({users: res.data});
        });
    };


    render() {
        const styleInfo = {
            paddingRight: '10px'
        };
        const elementStyle = {
            border: '1px  solid',
            borderRadius: '8px',
            position: 'relative',
            left: '10vh',
            height: '6vh',
            width: '159vh',
            marginTop: '5vh',
            marginBottom: '10vh'
        };

        function CustomImage({loading, preview}) {
            return loading
                ? (<h2>Loading Image...</h2>)
                : (
                    <img height="100px" width="100%"
                         src={preview.img ? preview.img : "https://thumbs.dreamstime.com/b/generic-high-school-building-facade-entrance-made-red-brick-stone-green-lawn-bushes-front-33377575.jpg"}
                         alt={preview.title}/>

                )
        }

        function CustomLink({loading, preview}) {
            return loading
                ? (<h2>Loading Info...</h2>)
                : (
                    <div>
                        <p>Domain: {preview.domain}</p>
                        <p>Title: {preview.title}</p>
                        <p>Description: {preview.description}</p>
                    </div>
                )
        }


        return (


            <div>

                <div className="text-center">
                    <div className="Search">
                         <span className="SearchSpan">
                        </span>
                        <input
                            style={elementStyle}
                            className="SearchInput"
                            type="text"
                            onChange={(e) => this.searchSpace(e)}
                            placeholder="Search Universities"
                        />
                    </div>
                </div>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addUser}> Add University</button>
                </div>
                <br></br>
                <div className="row ">

                    {
                        this.state.users.map(
                            user =>

                                <div className="card m-3" style={{width: "18rem"}}>

                                    <LinkPreview className="card-img-top" url={user.web_page} render={CustomImage}/>
                                    <div className="card-body">
                                        <h5 className="card-title">{user.name}</h5>

                                    </div>
                                    <td>
                                        <LinkPreview className="card-img-top" url={user.web_page} render={CustomLink}/>
                                        <button style={{width: "50%"}} onClick={() => this.editUser(user.id)}
                                                className="btn btn-info">Update
                                        </button>
                                        <button style={{width: "50%"}} onClick={() => this.deleteUser(user.id)}
                                                className="btn btn-danger">Delete
                                        </button>
                                    </td>

                                </div>
                        )
                    }
                </div>

            </div>
        )
    }
}

export default ListUniversityComponent
