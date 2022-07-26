import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {name_project: '', repository: ''}
    }

    handleChange(event)
    {
        this.setState(
                {
                    [event.target.name_project]: event.target.value
                }
            );
    }

    handleSubmit(event) {
      this.props.createProject(this.state.name_project, this.state.repository)
      event.preventDefault()
    }

    render() {
      return (
        <form onSubmit={(event)=> this.handleSubmit(event)}>
            <div className="form-group">
            <label for="name_project">name_project</label>
                <input type="text" className="form-control" name="name_project" value={this.state.name_project} onChange={(event)=>this.handleChange(event)} />
            </div>

            <div className="form-group">
                <label for="repository">repository</label>

                <select name="repository" className='form-control' onChange={(event)=>this.handleChange(event)}>
                    {this.props.authors.map((item)=><option value={item.id}>{item.name}</option>)}
                </select>

            </div>
          <input type="submit" className="btn btn-primary" value="Save" />
        </form>
      );
    }
  }

export default ProjectForm