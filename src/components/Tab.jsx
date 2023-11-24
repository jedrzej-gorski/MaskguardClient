


const Tab = (props) => {
    const {caption, Icon, ...other} = props;
    return (
        <div className="single-tab-container">
            <Icon {...other}/>
            <span {...other}>{caption}</span>
        </div>
    )
}

export default Tab;