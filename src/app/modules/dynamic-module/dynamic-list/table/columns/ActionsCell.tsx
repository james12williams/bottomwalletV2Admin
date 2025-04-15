/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect} from 'react'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {PreviewButton} from "../../components/buttons/PreviewButton";
import {DeleteButton} from "../../components/buttons/DeleteButton";
import {CustomLinkButton} from "../../components/buttons/CustomLinkButton";
import {CustomButton} from "../../components/buttons/CustomButton";
import {EditButton} from "../../components/buttons/EditButton";
import {QuickEditButton} from "../../components/buttons/QuickEditButton";
import {ModelActionButton} from "../../components/buttons/ModelActionButton";
import {ActionButton} from "../../../../../../partials/buttons/ActionButton";

type Props = {
  buttons: any[],
  queryName: any,
  id: string
}

const ActionsCell: FC<Props> = ({buttons, queryName, id}) => {
  useEffect(() => {
    MenuComponent.reinitialization()
  }, []);
  return (
    <div style={{whiteSpace:'nowrap'}}>
      {buttons.map((button: any, i:any) => {
        let value = "";
        switch (button.type) {
          case 'view':
            switch (button.name) {
              case 'preview':
              case 'show':
                return <PreviewButton button={button} key={button.name} />;
              case 'delete':
                return <DeleteButton button={button} key={button.name} queryName={queryName}/>;
              case 'update':
                return <EditButton button={button} key={button.name}/>;
              case 'quick_update':
                return <QuickEditButton button={button} key={button.name}/>;
              case 'parent':
              case 'revisions':

                break;
            }
            break;
          case 'model_function':
            switch (button.name) {
              case 'delete':
                if (button.values)
                  return <DeleteButton button={button} key={button.name} queryName={queryName}/>;
                else
                break;
              default:
                if (button.values) {
                  switch (button.values.type) {
                    case 'model_action':
                      return <ModelActionButton endpoint={button.values.endpoint}
                                           label={button.values.label}
                                           iconPath={button.values.iconPath}
                                           className={button.values.className}
                                           title={button.values.title}
                                           key={button.name} queryName={queryName}/>;
                    case 'action':
                      return <ActionButton endpoint={button.values.endpoint}
                                           label={button.values.label}
                                           iconPath={button.values.iconPath}
                                           className={button.values.className}
                                           title={button.values.title}
                                           key={button.name} queryName={queryName}/>;
                    case 'html_link_text':
                    case 'link':
                      return <CustomLinkButton button={button} key={button.name}/>;
                    default:
                      return <CustomButton button={button} key={button.name} queryName={queryName}/>;
                  }
                }
                break;
            }
            break;
        }
        return value;
      })}
    </div>
  )
};

export {ActionsCell}
