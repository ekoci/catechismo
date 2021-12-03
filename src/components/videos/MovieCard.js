import React from 'react'
import movieImg from '../../assets/movie.jpg'
import channeImg from '../../assets/netflix.jpg';
import { Card, CardBody, Button, CardTitle, CardText, CardImg , CardImgOverlay } from 'reactstrap';
import {NavLink} from "reactstrap";

const extra = ({video}) => (
    <CardImgOverlay>
        <CardTitle>{`${video.name}`}</CardTitle>
        <CardText>{video.description}</CardText>
        <CardText>
            <small className="text-muted">RunTime: {video.runTime} min </small>
        </CardText>
    </CardImgOverlay>
);

const onHover = () =>{
    togle=true;
    console.log("ufut");

};
let togle = false;

const MovieCard = ({video}) => (

    <div onMouseOver={() => onHover}>
    <NavLink href={`/video/show/${video.id}`}>
        <Card inverse>
                <CardImg bottom width="100%" src={`data:image/jpeg;base64,${video.photoUrl}`} alt="Card image cap" />
            {togle &&
            <CardImgOverlay>
                <CardTitle>{`${video.name}`}</CardTitle>
                <CardText>{video.description}</CardText>
                <CardText>
                    <small className="text-muted">RunTime: {video.runTime} min </small>
                </CardText>
            </CardImgOverlay> }
        </Card>
    </NavLink>
    </div>
);
export default MovieCard