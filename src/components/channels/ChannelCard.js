import React from 'react'
import { Card} from 'semantic-ui-react'
import {NavLink} from "reactstrap";

const ChannelCard = ({channel}) => (
    <NavLink href={`/channel/${channel.id}`}> <Card
        image={`data:image/jpeg;base64,${channel.logoUrl}`}
        header={channel.name}
        description={channel.description}
    />
    </NavLink>
);

export default ChannelCard

