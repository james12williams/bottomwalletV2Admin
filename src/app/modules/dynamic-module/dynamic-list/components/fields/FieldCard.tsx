import React, {useEffect, useState} from "react";
import {FieldGroup} from "./FieldGroup";
import {CustomFields} from "./CustomFields";

type Props = {
    card:any,
}

const FieldCard = ({card}:Props) => {
    const [cardFields, setCardFields] = useState([]);
    const [cardToolbar, setCardToolBar] = useState([]);

    const processGroupChildren = () =>{
        let formCardFields = [] as any;
        if (card.fields){
            formCardFields = Object.keys(card.fields).map((key:any) => (card.fields[key]));
        }
        setCardFields(formCardFields);
        let formCardToolbar = [] as any;
        if (card.toolbar){
            formCardToolbar = Object.keys(card.toolbar).map((key:any) => (card.toolbar[key]));
        }
        setCardToolBar(formCardToolbar);
    };

    useEffect(()=>{
        processGroupChildren()
    }, [card.fields]);

    return <div className={'card '+(card.className?card.className:"card-flush py-4")}>
        {/*begin::Card header*/}
        {card.title && <div className="card-header">
            {/*begin::Card title*/}
            <div className="card-title">
                <h2>{card.title}</h2>
            </div>
            {/*end::Card title*/}
            {cardToolbar.length? <div className="card-toolbar">
                {cardToolbar.map((tool: any, i:any) => {
                    switch (tool['type']) {
                        case 'status_indicator':
                            return <div key={tool.name + '_' + i} data-indicator-options={JSON.stringify(tool.options)} className="rounded-circle bg-success w-15px h-15px" id={tool.name}></div>
                        default:
                            return null;
                    }
                })}
            </div>: ""}
        </div>}
        {/*end::Card header*/}

        {/*begin::Card body*/}
        <div className={"card-body "+(card.bodyClassName?card.bodyClassName:'pt-0')}>
            <div className="row">
            {cardFields.map((child: any, i:any) => {
                switch (child['type']){
                    case 'group':
                        return <FieldGroup group={child}  key={child.name + '_' + i}/>
                    case 'card':
                        return <FieldCard card={child}  key={child.name + '_' + i}/>
                    default:
                        return <CustomFields field={child} key={child.name + '_' + i} />;
                }
            })}
            </div>
        </div>
        {/*end::Card body*/}
    </div>
};

export {FieldCard};
