import HeaderText from "../components/HeaderText/index.jsx";


function SimplePage({description, title}) {
    return (        <div className="simple-page">
            <HeaderText text={title}/>
            <p>{description}</p>
        </div>
    );
}


export default SimplePage;