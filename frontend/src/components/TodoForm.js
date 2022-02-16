import React from "react";


class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {project: props.projects[0]?.name, creator: props.users[0]?.username, text: ''}
    }

    handleChange(event)
    {
        this.setState(
            {

                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createTodo(this.state.project, this.state.creator, this.state.text)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=>this.handleSubmit(event)}>
                <div className='form-group'>
                    <label htmlFor='project'>project</label>
                        <select name='project' className='form-control'
                            onChange={(event)=>this.handleChange(event)}>
                        {this.props.projects.map((item)=>
                        <option value={item.name}>{item.name}</option> )}
                    </select>
                </div>
                <div className='form-group'>
                    <label htmlFor='creator'>creator</label>
                    <select name='creator' className='form-control'
                            onChange={(event) => this.handleChange(event)}>
                        {this.props.users.map((item) =>
                            <option value={item.username}>{item.username}</option>)}
                    </select>
                </div>
                <div className='form-group'>
                    <label htmlFor='text'>text</label>
                        <input type='text' className='form-control' name='text'
                            value={this.state.name} onChange={(event)=> this.handleChange(event)} />
                </div>
                <input type='submit' className='btn btn-primary' value='Save' />
            </form>
        );
    }
}

export default TodoForm
