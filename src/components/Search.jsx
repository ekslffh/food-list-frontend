function Search(props) {

    return (
        <>
            <div className="left">
                <img src={props.imageLink} />
            </div>
            <div className="right">
                 <span className="text">
                    <div>장소 : {props.title}</div>
                    <div>Category : {props.category}</div>
                    <div>주소 : {props.address}</div>
                    <div>도로명 : {props.roadAddress}</div>
                    <a href={props.homePageLink}>홈페이지</a>
                </span>
            </div>
        </>
    )
}

export default Search;