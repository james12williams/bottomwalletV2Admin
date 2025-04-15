/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useState} from 'react'
import {getItems} from "../../modules/dynamic-module/dynamic-list/core/QueryResponseProvider";
import {PageTitle} from "../../../_metronic/layout/core";
import {DashboardLoader} from "../../../partials/loaders";
import {ActionButton} from "../../../partials/buttons/ActionButton.tsx";
import {Link} from "react-router-dom";
import {forceDownload} from "../../../_metronic/helpers";

const BackupPage: FC = () => {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState({}) as any;
    const [extra, setExtra] = useState({}) as any;

    const getBackupData = () =>{
        setLoading(true);
        getItems('backups').then((resp:any)=>{
            setData(resp.backups);
            setExtra(resp.extra);
            setLoading(false);
        }, (resp:any)=>{
            setLoading(false);
        })
    };

    useEffect(() => {
        getBackupData();
    }, []);

    const onDownload = (file:any) => {
        forceDownload(file);
    }

    return <>
        {isLoading && <DashboardLoader  count={8} /> }
        <div className="row">
            <div className="col-12">

                <div className="card rounded mb-4 d-none">
                    <div className="card-body">
                        <h3 className="card-title">
                            <i className="fa fa-question-circle"></i> Help
                        </h3>
                        <p className="card-text">
                            Before using this feature, you have to:
                            <ul>
                                <li>Make sure <code>mysqldump</code> is installed on your system if the website's database need to be backup.</li>
                                <li>Then, you have to set the <code>mysqldump</code>'s path in the variable <code>DB_DUMP_BINARY_PATH</code> in the <strong>.env</strong> file. (The path need to be set without mentioning <code>mysqldump</code> at the end)</li>
                            </ul>
                            e.g. With MAMP (on Mac OS) we can done it like that: <code>DB_DUMP_BINARY_PATH=/Applications/MAMP/Library/bin/</code>.
                            <br />NOTE: The local storage's backups are available in the <code>backupLocalStorage</code> directory.
                        </p>
                    </div>
                </div>

                <div className="card rounded mb-4">
                    <div className="card-body text-center">
                        <ActionButton method='put'  endpoint='backups/create' title='Backup all the website' label='<i class="fa fa-download"></i> Backup all the website' className='btn btn-success me-3 mb-3' />
                        <ActionButton method='put'  endpoint='backups/create?type=database' title='Backup only the database' label='<i class="fa fa-database"></i> Backup only the database' className='btn btn-primary me-3 mb-3' />
                        <ActionButton method='put'  endpoint='backups/create?type=languages' title='Backup only languages files' label='<i class="fa fa-globe"></i> Backup only languages files' className="btn btn-info me-3 mb-3" />
                        <ActionButton method='put'  endpoint='backups/create?type=files' title='Backup only generated files' label='<i class="fa fa-copy"></i> Backup only generated files' className="btn btn-warning me-3 mb-3" />
                        <ActionButton method='put'  endpoint='backups/create?type=app' title='Backup only app files' label='<i class="fa fa-industry"></i> Backup only app files' className="btn btn-danger me-3 mb-3" />
                        {extra.backup_setting?<Link to={'/app/settings/' + extra.backup_setting.id + '/edit'}
                            className="btn btn-secondary shadow me-3 mb-3">
                            <i className="fa fa-cog"></i> More Options
                        </Link>:''}
                    </div>
                </div>

                <div className="card rounded mb-4">
                    <div className="card-header">
                        <h3 className="card-title">Existing backups:</h3>
                    </div>
                    <div className="card-body">
                        <table className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer">
                            <thead>
                            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                                <th>#</th>
                                <th>Location</th>
                                <th>Date</th>
                                <th className="text-right">File size</th>
                                <th className="text-right">Actions</th>
                            </tr>
                            </thead>
                            <tbody className='text-gray-600 fw-bold' role="rowgroup">
                            {data?.length>0 &&
                                data.map((item:any)=> {
                                    return <tr key={item.index}>
                                    <th scope="row">{item.index}</th>
                                    <td>{ item.disk }</td>
                                    <td>{ item.last_modified }</td>
                                    <td className="text-right">{ item.file_size }</td>
                                    <td>
                                        {
                                            item.download && <ActionButton method='get' endpoint={item.download_link} title='Download files'
                                                       label='<i class="fa fa-cloud-download"></i> Download'
                                                       className="btn btn-secondary me-3 mb-3" onSuccess={onDownload}/>
                                        }
                                        <ActionButton method='delete' endpoint={item.delete_link} title='Delete files' label='<i class="fa fa-trash-o"></i> Delete' className="btn btn-danger me-3 mb-3" />
                                    </td>
                                </tr>
                            })}

                            {!isLoading && data?.length < 1 && <tr><td colSpan={5} className="text-center"><span className='text-muted fw-bold text-muted d-block fs-7'>No Data!!!</span></td></tr>}
                            </tbody>
                        </table>

                    </div>
                </div>

            </div>
        </div>
    </>
};

const BackupWrapper: FC = () => {
    return (
        <>
            <PageTitle breadcrumbs={[]}>Backup</PageTitle>
            <BackupPage />
        </>
    )
};

export {BackupWrapper}
