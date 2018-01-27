import {h} from "hyperapp"
import { Link } from "@hyperapp/router"


const Home = (state, actions) => {
    console.log(state)
    const items = state.videos.map((vid) => {
        const target = `/video` //${vid.target}`
        return (
            <li> 
                <Link to ={target}>{vid.title}</Link>
            </li>
        )
    })
    return (
        <ol>
            {items}
        </ol> 
    )
}

export default Home 