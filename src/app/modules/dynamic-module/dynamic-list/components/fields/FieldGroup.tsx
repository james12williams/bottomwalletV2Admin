import React, {useEffect, useState} from "react";
import {CustomFields} from "./CustomFields";
import {FieldCard} from "./FieldCard";

type Props = {
    group:any,
    isModal?:any,
}

const FieldGroup = ({group, isModal=false}:Props) => {
    const [groupChildren, setGroupChildren] = useState([]);

    const processGroupChildren = () =>{
        let formFieldGroup = [] as any;
        if (group.children){
            formFieldGroup = Object.keys(group.children).map((key:any) => (group.children[key]));
        }
        setGroupChildren(formFieldGroup);
    };

    useEffect(()=>{
        processGroupChildren()
    }, [group.children]);

    return <div className={!isModal? (group.className?group.className:"d-flex flex-column gap-7 gap-lg-10 w-100 mb-7 me-lg-10"): 'd-flex flex-column gap-7 gap-lg-10'}>
        {groupChildren.map((child: any, i:any) => {
            switch (child['type']){
                case 'group':
                    return <FieldGroup group={child} isModal={isModal} key={child.name + '_' + i}/>
                case 'card':
                    return <FieldCard card={child}  key={child.name + '_' + i}/>
                default:
                    return <CustomFields field={child} key={child.name + '_' + i} />;
            }
        })}
    </div>
};

export {FieldGroup};
