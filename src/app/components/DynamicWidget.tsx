import React, {FC} from 'react';
import {MorrisChart} from "./Chart";
import {UserList} from "../pages/dashboard/widgets";

type Props = {
    card: any
}

const DynamicWidget: FC<Props> = ({card}) => {
    switch(card.type){
        case 'morris_chart':
            return <MorrisChart data={card} className={card.chartClassName??'card-xxl-stretch'}
                             chartColor={card.chartColor??'primary'} chartHeight={card.chartHeight??'450px'} />;
        case 'user_list':
            return <UserList data={card.data} className='card-xxl-stretch'/>;
        case 'group':
            return (card.children && card.children.length>0) ? card.children.map((child:any, index:any)=>{
                    return <div key={child.name+'_'+index} className={child.className??'col-xl-12'}>
                        <DynamicWidget card={child} />
                    </div>
                }): "";
        default:
            return null;
    }
}

export {DynamicWidget}
