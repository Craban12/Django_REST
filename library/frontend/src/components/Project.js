import React from "react";


const ProjectItem = ({project}) => {
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
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
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
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}

export default ProjectList