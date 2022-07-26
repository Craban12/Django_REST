import React from "react";
import {Link} from "react-router-dom";


const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>
                {project.name_project}
            </td>
            <td>
                {project.Contributors.uid}
            </td>
            <td>
                {project.repository}
            </td>
            <td><button onClick={()=>deleteProject(project.uid)} type='button'>Delete</button></td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {
    return (
        <div>
        <table>
            <th>
                Name project
            </th>
            <th>
                Contributors
            </th>
            <th>
                Repository
            </th>
            {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject} />)}
        </table>
        <Link to='/project/create'>Create</Link>
        </div>
    )
}

export default ProjectList