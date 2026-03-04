import { useNavigate } from 'react-router'
import '../../styles/component/projectcard.css'

const ProjectCard = ({imgUrl, projtitle, projTags}) => {
    const navigate = useNavigate()

    const handleNavigate = () =>{
        const id = projtitle.split(" ").slice().join("-")
        navigate(`/projects/${id}`)
    }

    return (
        <div className='projectcard' title={projtitle}
        onClick={handleNavigate}
        >
           <img
           src={imgUrl}
           title={projtitle}
           className='projectcard-img'
           />
           <div className='projectcard-desc'>
           <h3>{projtitle}</h3>
           <div className='projectcard-tags'>
            {projTags.map((elem) => (
                <div key={elem}>
                        {elem}
                </div>
            ))}
           </div>
           </div>
        </div>
    )

}

export default ProjectCard