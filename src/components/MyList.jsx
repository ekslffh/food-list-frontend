import search from "./Search";

function MyList(props) {

    return (
            <>
                <div className="left">
                    <img src={props.imageLink} />
                </div>
                <div className="right">
                    <div className="text">
                        <div>장소 : title: {props.title}</div>
                        <div>Category: {props.category}</div>
                        <div>주소 : {props.address}</div>
                        <div>도로명 : {props.roadAddress}</div>
                        <div>방문여부 : {props.visit === true ? <span>방문</span> : <span>미방문</span>}</div>
                        <div>마지막 방문일자 : {props.lastVisitDate}</div>
                        <div>방문횟수 : {props.visitCount}</div>
                        {props.homePageLink && <a href={props.homePageLink}>홈페이지</a>}
                    </div>
                </div>
            </>
    )
}

export default MyList;