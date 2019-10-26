/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/no-multi-comp */

const maxUsers = 10;

let users = [];
for (let i = 0; i < maxUsers; i++){
users.push(faker.helpers.createCard())
}

class ListContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            userList: users,
            favorites: 0,
        }
    }

    updateFavorites() {
        const allFavorites = document.querySelectorAll('.selected');
        if (allFavorites.length) {
            this.setState({
                favorites: allFavorites.length,
            })
        }
        else {
            this.setState({
                favorites: 0,
            })
        }
    }

    addUser = () => {
        let newUserList = this.state.userList;
        newUserList.unshift(faker.helpers.createCard());
        this.setState({
            userList: newUserList,
        })
    }

    toggleSelection = (ev) => {
        if (ev.target.classList.contains('user')) {
            ev.target.classList.toggle('selected');
        }
        else {ev.target.parentElement.classList.toggle('selected')}
        this.updateFavorites();
    }

    buildRows = () => {
        console.log(this.state.userList);
        let children = this.state.userList.map((user, idx) =>
            <User key={user.name} name={user.name} username={user.username} onClick={this.toggleSelection} />
        )
        return children;
    } 

    render() {
        return (
            <div id="list-container">
                <h1>Acme Faker Favorites</h1>
                <h2>You have {this.state.favorites} favorite users </h2>
                <button onClick={this.addUser}>Add new user</button>
            { this.buildRows() }
            </div>
        )
    }
}

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFavorite: false,
        }
    }

    render() {
        let classes = 'user';
        if (this.state.isFavorite) {
            classes += ' selected';
        }
        return (
            <div className={classes} key={this.props.name} onClick={this.props.onClick}>
                <p>{this.props.name}</p>
                <p>{this.props.username}</p>
            </div>
        )
    }
}

ReactDOM.render(<ListContainer />, document.getElementById('root'));
