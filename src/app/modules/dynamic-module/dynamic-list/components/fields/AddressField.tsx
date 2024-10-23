import React, {useEffect, useRef, useState} from "react";
import clsx from "clsx";
import {Loader} from "@googlemaps/js-api-loader";
import {KTSVG} from "../../../../../../_metronic/helpers";
import {AppSpinner} from "../../../../../../partials/content/AppSpinner";

type Props = {
    field:any,
    onChange:any,
    value:any,
    touched:any,
    error:any,
}

const AddressField = ({field, onChange, value, touched, error }:Props) => {

    const inputRef = React.useRef<HTMLInputElement|null>(null);

    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [showList, setShowList] = useState(false);

    const loader = new Loader({
        apiKey: `${import.meta.env.VITE_APP_GOOGLE_MAP_API}`,
        version: "weekly",
    });

    const onInputChange = async (e: any) => {
        setSearchLoading(true);
        setShowList(true);
        e.target.focus();
        const { AutocompleteService } = await loader.importLibrary(
            "places"
        );

        const pred = new AutocompleteService();

        pred.getPlacePredictions({
                input: e.target.value,
                types: field.types,
                componentRestrictions: { country: "NG" },
            },
            (dd: any) => {
                setSearchLoading(false);
                setSearchResults(dd);
            }
        )
    }

    const onSelect = (result:any) => {
        const map = new google.maps.Map(
            document.createElement("div")
        );

        const service = new google.maps.places.PlacesService(map);

        // Function to handle the selection of an autocomplete suggestion
        service.getDetails({placeId: result.place_id},
            (place: any, status: any) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    if (inputRef.current)
                        (inputRef.current as HTMLInputElement).value = place.formatted_address;
                    const latitude = place.geometry.location.lat();
                    const longitude = place.geometry.location.lng();

                    if (field.latitude && document.getElementsByName(field.latitude)) {
                        document.getElementsByName(field.latitude).forEach(function (item) {
                            if (item.nodeName=='INPUT'){
                                (item as HTMLInputElement).value = latitude;
                            }
                        })
                    }

                    if (field.longitude && document.getElementsByName(field.longitude)) {
                        document.getElementsByName(field.longitude).forEach(function (item) {
                            if (item.nodeName=='INPUT'){
                                (item as HTMLInputElement).value = longitude;
                            }
                        })
                    }

                    onChange(inputRef.current)
                    setShowList(false);
                }
            }
        );
    }

    return <div {...field.wrapperAttributes}>
        {field.label && <label className={clsx('form-label fs-6 fw-bold', {'required': field.is_required})}>{field.label}:</label>}
        <input type="text"
               {...field.attributes}
               className={clsx(
                   'form-control form-control-solid mb-3 mb-lg-0',
                   {'is-invalid': touched && error},
                   {'is-valid': touched && !error}
               )}
               id={field.name}
               name={field.name}
               ref={inputRef}
               defaultValue={field.value}
               onChange={onInputChange}
               autoComplete='off' />
        {showList && (searchLoading ?
            (<div className="w-[300px] flex items-center justify-center aspect-square">
                <span className="text-[14px] text-gray-500">
                  <AppSpinner as="span" size="sm" role="status" aria-hidden="true"/> Searching location...
                </span>
            </div>)
            :
            (<div className="row">
                {searchResults ? (searchResults.map((result: any, index) => (
                        <div key={'_'+index} onClick={() => onSelect(result)}
                             className="col-md-6">
                            <div className='d-flex fv-row'>
                                <div className="form-check form-check-custom form-check-solid">
                                    <KTSVG path="assets/media/icons/duotune/general/gen018.svg" className="svg-icon-muted svg-icon-2hx" />
                                    <div className='form-check-label'>
                                        <div className="fw-bold text-gray-800">{result.description}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='separator separator-dashed my-2'></div>
                        </div>
                    ))
                ) : (
                    <div className="col-md-12">
                        <div className='d-flex fv-row  bg-warning'>
                            <div className="form-check form-check-custom form-check-solid">
                                <div className='form-check-label'>
                                    <div className="fw-bold text-gray-800 text-center"><KTSVG path="assets/media/icons/duotune/general/gen044.svg" className="svg-icon-muted svg-icon-2hx" />
                                        No Result</div>
                                </div>
                            </div>
                        </div>
                        <div className='separator separator-dashed my-2'></div>
                    </div>
                )}
            </div>))
        }

        {touched && error && (
            <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                    <span role='alert'>{error}</span>
                </div>
            </div>
        )}

        {/* begin::Hint */}
        {field.hint && <div className='form-text' dangerouslySetInnerHTML={{ __html: field.hint }} />}
        {/* end::Hint */}
    </div>
};

export {AddressField};