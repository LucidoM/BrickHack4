import {h} from "hyperapp"

const Home = ({videos}) => {
    const items = videos.map((vid) => {
        return <li>{vid.title}</li>
    })
    return (
        <ol>
            {items}
        </ol> 
    )
}

export default Home 